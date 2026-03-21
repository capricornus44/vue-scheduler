<script setup lang="ts">
import { computed } from 'vue'
import { isSameDay } from 'date-fns'
import type { DateValue } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { CalendarDate } from '@internationalized/date'
import { Calendar, CalendarCellTrigger } from '@/components/ui/calendar'
import SidebarEventCard from './SidebarEventCard.vue'
import type { CalendarEvent } from '../../calendar.types'
import { useCalendarSettings } from '@/stores/calendarSettings'

const date = defineModel<Date>('date', { required: true })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()

const settings = useCalendarSettings()

// Convert Date to DateValue for the shadcn Calendar
const calendarValue = computed({
  get: () => new CalendarDate(date.value.getFullYear(), date.value.getMonth() + 1, date.value.getDate()),
  set: (val) => {
    if (val) {
      date.value = toDate(val)
    }
  },
})

const dayEvents = computed(() => {
  return events.filter(event => isSameDay(event.start, date.value))
})

const hasEvents = (day: DateValue) => {
  const nativeDate = toDate(day)
  return events.some(event => isSameDay(event.start, nativeDate))
}
</script>

<template>
  <aside class="hidden lg:flex w-80 border-l bg-background flex-col h-full overflow-y-auto p-4 gap-6 shrink-0">
    <Calendar
      v-model="calendarValue"
      :week-starts-on="settings.startWeekOnSunday ? 0 : 1"
      :show-work-week="settings.hideWeekends"
      class="border rounded-xl shadow-sm"
    >
      <template #day="{ date: day, month }">
        <div class="relative flex flex-col items-center justify-center">
          <CalendarCellTrigger :day="day" :month="month" />
          <div
            v-if="hasEvents(day)"
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-amber-600 rounded-full shadow-[0_0_4px_rgba(245,158,11,0.5)]"
          />
        </div>
      </template>
    </Calendar>

    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between px-2">
        <h2 class="text-sm font-bold">Events</h2>
        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
          {{ dayEvents.length }}
        </span>
      </div>

      <div v-if="dayEvents.length > 0" class="flex flex-col gap-2 px-1">
        <SidebarEventCard
          v-for="event in dayEvents"
          :key="event.id"
          :event="event"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center p-8 text-center gap-2 text-muted-foreground/60">
        <p class="text-xs font-medium italic">No events for today</p>
      </div>
    </div>
  </aside>
</template>
