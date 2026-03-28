import { nextTick } from 'vue';
import { isSameDay } from 'date-fns'
import type { CalendarEvent, PositionedCalendarEvent } from '../components/calendar/calendar.types'
import { WORKING_HOURS } from '@/components/calendar/calendar.constants';

/**
 * Groups events into clusters that transitively overlap in time.
 * For each cluster, assigns events to columns greedily.
 * Calculates position (left, width, top, height) based on column assignment.
 */
export const layoutDayEvents = (
  events: CalendarEvent[],
  cellHeight: number
): PositionedCalendarEvent[] => {
  if (events.length === 0) return []

  // 1. Sort events by start time, then by duration (longer first)
  const sortedEvents = [...events].sort((a, b) => {
    if (a.start.getTime() !== b.start.getTime()) {
      return a.start.getTime() - b.start.getTime()
    }
    return b.end.getTime() - a.end.getTime()
  })

  const clusters: CalendarEvent[][] = []
  let currentCluster: CalendarEvent[] = []
  let clusterEnd: number = 0

  // 2. Cluster overlapping events
  for (const event of sortedEvents) {
    if (currentCluster.length > 0 && event.start.getTime() >= clusterEnd) {
      clusters.push(currentCluster)
      currentCluster = []
      clusterEnd = 0
    }

    currentCluster.push(event)
    clusterEnd = Math.max(clusterEnd, event.end.getTime())
  }
  if (currentCluster.length > 0) {
    clusters.push(currentCluster)
  }

  const positionedEvents: PositionedCalendarEvent[] = []

  // 3. Process each cluster to assign columns
  for (const cluster of clusters) {
    const columns: CalendarEvent[][] = []

    for (const event of cluster) {
      let placed = false
      for (const col of columns) {
        const lastEvent = col[col.length - 1]
        if (lastEvent && event.start.getTime() >= lastEvent.end.getTime()) {
          col.push(event)
          placed = true
          break
        }
      }

      if (!placed) {
        columns.push([event])
      }
    }

    const totalColumns = columns.length
    const columnWidth = 100 / totalColumns

    // 4. Calculate final positions
    columns.forEach((col, colIndex) => {
      col.forEach((event) => {
        const startHour = event.start.getHours()
        const startMinutes = event.start.getMinutes()

        let endHour = event.end.getHours()
        let endMinutes = event.end.getMinutes()

        if (!isSameDay(event.start, event.end)) {
          endHour = 23
          endMinutes = 59
        }

        const topPosition = startHour * cellHeight + (startMinutes / 60) * cellHeight
        const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes)
        const height = (duration / 60) * cellHeight

        // Add a bit of gap on the right if it's not the last column
        // or just a constant small padding to avoid overlapping borders.
        const width = colIndex === totalColumns - 1 ? columnWidth : columnWidth - 1

        positionedEvents.push({
          ...event,
          position: {
            left: `${colIndex * columnWidth}%`,
            width: `${width}%`,
            top: `${topPosition}px`,
            height: `${height}px`,
          },
        })
      })
    })
  }

  return positionedEvents
}

export const isWorkingHour = (hour: number): boolean => {
  return hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end;
};

export const scrollToWorkingHours = async (
  container: HTMLElement | null,
  showWorkingHours: boolean,
  cellHeight: number,
  behavior: ScrollBehavior = 'auto'
) => {
  await nextTick();
  if (container && showWorkingHours) {
    container.scrollTo({
      top: WORKING_HOURS.start * cellHeight,
      behavior,
    });
  }
};
