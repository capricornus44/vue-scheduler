<script setup lang="ts">
import DateInfo from './dateInfo/index.vue';
import Actions from './actions/index.vue';
import type { CalendarEvent, CalendarView } from '../calendar.types';

const date = defineModel<Date>('date', { required: true });
const view = defineModel<CalendarView>('view', { required: true });

const { events } = defineProps<{
  events: CalendarEvent[];
}>();
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b">
    <DateInfo v-model:date="date" :view="view" :events="events" />
    <Actions v-model:view="view" />
  </div>
</template>
