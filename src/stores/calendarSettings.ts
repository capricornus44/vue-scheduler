import { defineStore } from 'pinia'

export const useCalendarSettings = defineStore('calendarSettings', {
  state: () => ({
    hideWeekends: false,
    startWeekOnSunday: false,
    compactView: false,
    showWorkingHours: false,
  }),
})
