import { defineStore } from 'pinia'

export const useCalendarSettings = defineStore('calendarSettings', {
  state: () => ({
    showWorkWeek: false,
  }),
})
