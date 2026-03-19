<script setup lang="ts">
import DayLayout from './day/DayLayout.vue'
import WeekLayout from './week/WeekLayout.vue'
import MonthLayout from './month/MonthLayout.vue'
import type { CalendarEvent, CalendarView } from '../calendar.types'

const { view, date, events } = defineProps<{
  view: CalendarView
  date: Date
  events: CalendarEvent[]
}>()
</script>

<template>
  <DayLayout v-if="view === 'day'" :date="date" :events="events" />
  <WeekLayout v-if="view === 'week'" :date="date" :events="events" />
  <MonthLayout v-if="view === 'month'" :date="date" :events="events" />
</template>

