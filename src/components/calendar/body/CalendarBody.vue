<script setup lang="ts">
import DayLayout from './day/DayLayout.vue'
import WeekLayout from './week/WeekLayout.vue'
import MonthLayout from './month/MonthLayout.vue'
import type { CalendarEvent, CalendarView } from '../calendar.types'

const view = defineModel<CalendarView>('view', { required: true })
const date = defineModel<Date>('date', { required: true })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()
</script>

<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <DayLayout v-if="view === 'day'" v-model:date="date" :events="events" />
    <WeekLayout v-if="view === 'week'" v-model:date="date" :events="events" />
    <MonthLayout v-if="view === 'month'" v-model:view="view" v-model:date="date" :events="events" />
  </div>
</template>

