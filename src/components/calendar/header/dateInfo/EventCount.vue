<script setup lang="ts">
import { computed } from 'vue';
import { isSameMonth } from 'date-fns'

import type { CalendarEvent } from '../../calendar.types';


const { events, date } = defineProps<{
  events: CalendarEvent[];
  date: Date;
}>();

const eventsInMonth = computed(() => {
  return events.filter((event) => isSameMonth(event.start, date));
});
</script>

<template>
  <div class="whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-xs w-fit">
    {{ eventsInMonth.length }} events
  </div>
</template>
