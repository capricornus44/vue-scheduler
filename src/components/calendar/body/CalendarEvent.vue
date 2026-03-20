<script setup lang="ts">
import { computed, ref } from 'vue'
import { format, isSameDay } from 'date-fns'

import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EventDialog from '../dialog/EventDialog.vue'
import CalendarEventTooltip from './CalendarEventTooltip.vue'
import type { CalendarEvent, CalendarEventPosition } from '../calendar.types'
import { CALENDAR_CELL_HEIGHT } from '../calendar.constants'

const { event, month = false, className, events } = defineProps<{
  event: CalendarEvent
  month?: boolean
  className?: string
  events: CalendarEvent[]
}>()

const getOverlappingEvents = (
  currentEvent: CalendarEvent,
  events: CalendarEvent[]
): CalendarEvent[] => {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false
    return (
      currentEvent.start < event.end &&
      currentEvent.end > event.start &&
      isSameDay(currentEvent.start, event.start)
    )
  })
}

const calculateEventPosition = (
  event: CalendarEvent,
  allEvents: CalendarEvent[]
): CalendarEventPosition => {
  const overlappingEvents = getOverlappingEvents(event, allEvents)
  const group = [event, ...overlappingEvents].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  )
  const position = group.indexOf(event)
  const width = `${100 / (overlappingEvents.length + 1)}%`
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`

  const startHour = event.start.getHours()
  const startMinutes = event.start.getMinutes()

  let endHour = event.end.getHours()
  let endMinutes = event.end.getMinutes()

  if (!isSameDay(event.start, event.end)) {
    endHour = 23
    endMinutes = 59
  }

  const topPosition = startHour * CALENDAR_CELL_HEIGHT + (startMinutes / 60) * CALENDAR_CELL_HEIGHT
  const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes)
  const height = (duration / 60) * CALENDAR_CELL_HEIGHT

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: `${height}px`,
  }
}

const style = computed(() => {
  if (month) return {}
  return calculateEventPosition(event, events)
})

const isEditOpen = ref(false)
</script>

<template>
  <Dialog v-model:open="isEditOpen">
    <CalendarEventTooltip :event="event" side="top">
      <DialogTrigger as-child>
        <div
          :class="cn(
            `px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border border-${event.color}-500 `,
            !month && 'absolute',
            className
          )"
          :style="style"
        >
          <div
            :class="cn(
              `flex flex-col w-full text-${event.color}-500`,
              month && 'flex-row items-center justify-between'
            )"
          >
            <p :class="cn('font-bold truncate', month && 'text-xs')">
              {{ event.title }}
            </p>
            <p :class="cn('text-sm truncate', month && 'text-xs')">
              <span>{{ format(event.start, 'h:mm a') }}</span>
              <span :class="cn('mx-1', month && 'hidden')">-</span>
              <span :class="cn(month && 'hidden')">
                {{ format(event.end, 'h:mm a') }}
              </span>
            </p>
          </div>
        </div>
      </DialogTrigger>
    </CalendarEventTooltip>
    <EventDialog v-model:open="isEditOpen" :event="event" />
  </Dialog>
</template>
