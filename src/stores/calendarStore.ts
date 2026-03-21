import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CalendarEvent, CalendarView } from '@/components/calendar/calendar.types'
import { generateMockEvents } from '@/lib/mockCalendarEvents'

export const useCalendarStore = defineStore('calendar', () => {
  const view = ref<CalendarView>('month')
  const date = ref<Date>(new Date())
  const events = ref<CalendarEvent[]>(generateMockEvents())

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const addEvent = async (event: CalendarEvent) => {
    await delay(500)
    events.value.push(event)
  }

  const updateEvent = async (updated: CalendarEvent) => {
    await delay(500)
    const idx = events.value.findIndex((e) => e.id === updated.id)
    if (idx !== -1) events.value[idx] = updated
  }

  const deleteEvent = async (id: string) => {
    await delay(500)
    events.value = events.value.filter((e) => e.id !== id)
  }

  return { view, date, events, addEvent, updateEvent, deleteEvent }
})
