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
import CalendarEventTooltip from '../CalendarEventTooltip.vue'

import type { CalendarEvent } from '../../calendar.types'

const { date, events } = defineProps<{
  date: Date
  events: CalendarEvent[]
}>()

const days = computed(() => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
})

const getDayEvents = (day: Date) => {
  return events.filter(event => isSameDay(event.start, day))
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
          'min-h-[120px] p-2 border-r border-b flex flex-col gap-1 transition-colors',
          !isSameMonth(day, date) && 'bg-muted/80 text-muted-foreground/80 opacity-80'
        )"
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
          <CalendarEventTooltip
            v-for="event in getDayEvents(day)"
            :key="event.id"
            :event="event"
            side="top"
          >
            <div
              :class="cn(
                `px-1.5 py-0.5 text-[10px] rounded-sm truncate border-l-2 cursor-pointer`,
                `bg-${event.color}-500/10 text-${event.color}-500 border-${event.color}-500`
              )"
              @click="() => { console.log(event) }"
            >
              {{ event.title }}
            </div>
          </CalendarEventTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
