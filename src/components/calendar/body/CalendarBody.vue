<script setup lang="ts">
import DayLayout from './day/DayLayout.vue'
import WeekLayout from './week/WeekLayout.vue'
import MonthLayout from './month/MonthLayout.vue'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()
</script>

<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <DayLayout v-if="store.view === 'day'" />
    <WeekLayout v-if="store.view === 'week'" />
    <MonthLayout v-if="store.view === 'month'" />
  </div>
</template>

