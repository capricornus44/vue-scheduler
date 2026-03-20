<script setup lang="ts">
import { computed } from 'vue'
import { startOfWeek, addDays } from 'date-fns'

import Timeline from '../day/Timeline.vue'
import DayContent from '../day/DayContent.vue'
import CurrentTimeLine from '../day/CurrentTimeLine.vue'
import type { CalendarEvent } from '../../calendar.types'
import { useCalendarSettings } from '@/stores/calendarSettings'

const date = defineModel<Date>('date', { required: true })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()

const settings = useCalendarSettings()

const weekStart = computed(() => startOfWeek(date.value, { weekStartsOn: settings.startWeekOnSunday ? 0 : 1 }))
const weekDays = computed(() => {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart.value, i))
  return settings.showWorkWeek ? days.slice(0, 5) : days
})
</script>

<template>
  <div class="flex divide-x grow overflow-hidden">
    <div class="flex flex-col grow divide-y overflow-hidden">
      <div class="flex flex-col grow overflow-y-auto">
        <div class="relative flex flex-1 divide-x flex-col md:flex-row">
          <Timeline className="hidden md:block" />
          <div
            v-for="day in weekDays"
            :key="day.toISOString()"
            class="flex flex-1 divide-x md:divide-x-0"
          >
            <Timeline className="block md:hidden" />
            <DayContent :date="day" :events="events" />
          </div>
          <CurrentTimeLine :date="weekDays" />
        </div>
      </div>
    </div>
  </div>
</template>

