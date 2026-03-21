<script setup lang="ts">
import { computed } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  getDay,
  addDays,
} from 'date-fns'

import { cn } from '@/lib/utils'
import MonthEventCard from './MonthEventCard.vue'
import { useCalendarSettings } from '@/stores/calendarSettings'

import type { CalendarEvent, CalendarView } from '../../calendar.types'

const date = defineModel<Date>('date', { required: true })
const view = defineModel<CalendarView>('view', { required: false })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()

const settings = useCalendarSettings()

const days = computed(() => {
  const start = startOfWeek(startOfMonth(date.value), { weekStartsOn: settings.startWeekOnSunday ? 0 : 1 })
  const end = endOfWeek(endOfMonth(date.value), { weekStartsOn: settings.startWeekOnSunday ? 0 : 1 })
  const allDays = eachDayOfInterval({ start, end })

  if (settings.hideWeekends) {
    return allDays.filter(day => {
      const d = getDay(day)
      return d !== 0 && d !== 6
    })
  }
  return allDays
})

const weekDayHeaders = computed(() => {
  const start = startOfWeek(new Date(), { weekStartsOn: settings.startWeekOnSunday ? 0 : 1 })
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))
  return (settings.hideWeekends ? days.slice(0, 5) : days).map(d => format(d, 'EEE'))
})

const getDayEvents = (day: Date) => {
  return events.filter(event => isSameDay(event.start, day))
}

const handleDayClick = (day: Date) => {
  date.value = day
  view.value = 'day'
}
</script>

<template>
  <div class="flex flex-col grow overflow-hidden border-t">
    <div :class="['grid border-b bg-background sticky top-0 z-10 h-8 items-center', settings.hideWeekends ? 'grid-cols-5' : 'grid-cols-7']">
      <div
        v-for="dayName in weekDayHeaders"
        :key="dayName"
        class="text-center text-xs font-medium text-muted-foreground"
      >
        {{ dayName }}
      </div>
    </div>

    <div :class="['grid grow overflow-y-auto px-0.5', settings.hideWeekends ? 'grid-cols-5' : 'grid-cols-7']">
      <div
        v-for="day in days"
        :key="day.toISOString()"
        :class="cn(
          'min-h-[120px] p-2 border-r border-b flex flex-col gap-1 transition-colors cursor-pointer',
          !isSameMonth(day, date) && 'bg-muted/80 text-muted-foreground/80 opacity-80'
        )"
        @click="handleDayClick(day)"
      >
        <div class="flex justify-between items-start">
          <span
            :class="cn(
              'text-xs font-medium size-6 flex items-center justify-center rounded-full',
              isSameDay(day, new Date()) && 'bg-sky-500 text-white'
            )"
          >
            {{ format(day, 'd') }}
          </span>
        </div>

        <div class="flex flex-col gap-0.5 overflow-y-auto">
          <MonthEventCard
            v-for="event in getDayEvents(day)"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>
