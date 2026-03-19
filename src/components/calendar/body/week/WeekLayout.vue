<script setup lang="ts">
import { startOfWeek, addDays } from 'date-fns'

import Timeline from '../day/Timeline.vue'
import DayContent from '../day/DayContent.vue'
import type { CalendarEvent } from '../../calendar.types'

const { date, events } = defineProps<{
  date: Date
  events: CalendarEvent[]
}>()

const weekStart = startOfWeek(date, { weekStartsOn: 1 })
const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
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
        </div>
      </div>
    </div>
  </div>
</template>

