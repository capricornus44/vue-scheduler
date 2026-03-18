<script setup lang="ts">
import { ref } from 'vue';
import type { CalendarEvent, CalendarView } from './calendar.types';
import CalendarHeader from './header/CalendarHeader.vue';
import { generateMockEvents } from '@/lib/mockCalendarEvents';

const view = ref<CalendarView>("week");
const date = ref<Date>(new Date());
const events = ref<CalendarEvent[]>(generateMockEvents());
</script>

<template>
  <CalendarHeader v-model:date="date" :view="view" :events="events" />
</template>

<style scoped></style>
