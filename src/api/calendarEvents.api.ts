import type { CalendarEvent } from '@/components/calendar/calendar.types'
import { generateMockEvents } from '@/lib/mockCalendarEvents'
import { delay } from '@/lib/utils'

// In a real app this would be in a DB, here we keep it in memory
// so that mutations actually work across renders.
let mockEvents = generateMockEvents()

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  await delay(500)
  return mockEvents
}

export const createCalendarEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
  await delay(500)
  mockEvents = [...mockEvents, event]
  return event
}

export const updateCalendarEvent = async (updated: CalendarEvent): Promise<CalendarEvent> => {
  await delay(500)
  mockEvents = mockEvents.map(e => e.id === updated.id ? updated : e)
  return updated
}

export const deleteCalendarEvent = async (id: string): Promise<string> => {
  await delay(500)
  mockEvents = mockEvents.filter(e => e.id !== id)
  return id
}
