import type { CalendarViews } from "./calendar.constants";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  allDay: boolean;
}

export type CalendarView = typeof CalendarViews[number];
