<script setup lang="ts">
import { computed } from 'vue';
import { isSameDay } from 'date-fns'

import CalendarBodyHeader from '../CalendarBodyHeader.vue';
import Event from '../CalendarEvent.vue';
import type { CalendarEvent } from '../../calendar.types';
import { TimelineHours, CALENDAR_CELL_HEIGHT } from '../../calendar.constants';

const { date, events } = defineProps<{
  date: Date
  events: CalendarEvent[]
}>()

const dayEvents = computed(() => {
  return events.filter((event) => isSameDay(event.start, date))
})
</script>

<template>
  <div class="flex flex-col grow">
    <CalendarBodyHeader :date="date" />

    <div class="flex-1 relative">
      <div 
        v-for="hour in TimelineHours" 
        :key="hour" 
        class="border-b border-border/50 group" 
        :style="{ height: `${CALENDAR_CELL_HEIGHT}px` }"
      />

      <Event v-for="event in dayEvents" :key="event.id" :event="event" :events="events" />
    </div>
  </div>
</template>
