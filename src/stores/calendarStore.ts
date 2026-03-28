import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CalendarView } from '@/components/calendar/calendar.types'

export const useCalendarStore = defineStore('calendar', () => {
  const view = ref<CalendarView>('month')
  const date = ref<Date>(new Date())

  return { view, date }
})
