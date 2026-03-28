import type { CalendarViews } from './calendar.constants'

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color: string
  allDay: boolean
}

export type CalendarView = (typeof CalendarViews)[number]

export interface CalendarSettings {
  hideWeekends: boolean
  startWeekOnSunday: boolean
  compactView: boolean
  showWorkingHours: boolean
}

export interface CalendarEventPosition {
  left: string
  width: string
  top: string
  height: string
}

