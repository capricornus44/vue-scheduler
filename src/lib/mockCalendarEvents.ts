import { addDays, startOfMonth } from 'date-fns'
import type { CalendarEvent } from '@/components/calendar/calendar.types'
import { CalendarColorOptions } from '@/components/calendar/calendar.constants'

const eventColors = CalendarColorOptions.map((color) => color.value)
const eventTitles = [
  'Team Standup',
  'Project Review',
  'Client Meeting',
  'Design Workshop',
  'Code Review',
  'Sprint Planning',
  'Product Demo',
  'Architecture Discussion',
  'User Testing',
  'Stakeholder Update',
]

const getRandomTime = (date: Date): Date => {
  const hours = Math.floor(Math.random() * 10) + 8 // 8 AM to 6 PM
  const minutes = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, 45
  return new Date(date.setHours(hours, minutes, 0, 0))
}

const generateEventDuration = (): number => {
  const durations = [30, 60, 90, 120] // in minutes
  return durations[Math.floor(Math.random() * durations.length)]!
}

export const generateMockEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = []
  const startDate = startOfMonth(new Date())

  // Generate  events over 1 month
  for (let i = 0; i < 45; i++) {
    // Random date between start and end
    const daysToAdd = Math.floor(Math.random() * 30) // 30 days = 1 month
    const eventDate = addDays(startDate, daysToAdd)

    const startTime = getRandomTime(eventDate)
    const durationMinutes = generateEventDuration()
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000)

    events.push({
      id: `event-${i + 1}`,
      title: eventTitles[Math.floor(Math.random() * eventTitles.length)]!,
      color: eventColors[Math.floor(Math.random() * eventColors.length)]!,
      start: startTime,
      end: endTime,
      allDay: false,
    })
  }

  // Sort events by start date
  return events.sort((a, b) => a.start.getTime() - b.start.getTime())
}
