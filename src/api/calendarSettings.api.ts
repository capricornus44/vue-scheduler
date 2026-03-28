import { delay } from "@/lib/utils"

export interface CalendarSettings {
  hideWeekends: boolean
  startWeekOnSunday: boolean
  compactView: boolean
  showWorkingHours: boolean
}

const STORAGE_KEY = 'mock_calendar_settings'

const defaultSettings: CalendarSettings = {
  hideWeekends: false,
  startWeekOnSunday: false,
  compactView: false,
  showWorkingHours: false,
}

export const fetchCalendarSettings = async (): Promise<CalendarSettings> => {
  await delay(300)
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  return defaultSettings
}

export const updateCalendarSettings = async (settings: CalendarSettings): Promise<CalendarSettings> => {
  await delay(300)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  return settings
}
