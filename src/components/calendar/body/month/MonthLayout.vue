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
} from 'date-fns'

import { cn } from '@/lib/utils'
import MonthEventChip from './MonthEventChip.vue'

import type { CalendarEvent, CalendarView } from '../../calendar.types'

const date = defineModel<Date>('date', { required: true })
const view = defineModel<CalendarView>('view', { required: false })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()

const days = computed(() => {
  const start = startOfWeek(startOfMonth(date.value), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date.value), { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
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
    <div class="grid grid-cols-7 border-b bg-muted/50">
      <div
        v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
        :key="day"
        class="py-2 text-center text-xs font-medium text-muted-foreground"
      >
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 grow overflow-y-auto">
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
          <MonthEventChip
            v-for="event in getDayEvents(day)"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>
