import type { CalendarSettings } from "@/components/calendar/calendar.types"
import { DEFAULT_CALENDAR_SETTINGS } from "@/components/calendar/calendar.constants"
import { delay } from "@/lib/utils"

const STORAGE_KEY = 'calendar_settings'

export const getStoredCalendarSettings = (): CalendarSettings => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  return DEFAULT_CALENDAR_SETTINGS
}

export const fetchCalendarSettings = async (): Promise<CalendarSettings> => {
  await delay(500)
  return getStoredCalendarSettings()
}

export const updateCalendarSettings = async (settings: CalendarSettings): Promise<CalendarSettings> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  await delay(500)
  return settings
}
