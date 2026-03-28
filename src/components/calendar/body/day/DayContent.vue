<script setup lang="ts">
import { computed } from 'vue';
import { isSameDay } from 'date-fns'

import CalendarBodyHeader from '../CalendarBodyHeader.vue';
import Event from '../CalendarEvent.vue';
import type { CalendarEvent, PositionedCalendarEvent } from '../../calendar.types';
import { TimelineHours, CALENDAR_CELL_HEIGHT, CALENDAR_COMPACT_CELL_HEIGHT } from '../../calendar.constants';
import { useCalendarSettings } from '@/composables/useCalendarSettings'
import { isWorkingHour, layoutDayEvents } from '@/lib/calendar.utils';

const { date, events } = defineProps<{
  date: Date
  events: CalendarEvent[]
}>()

const settings = useCalendarSettings()
const cellHeight = computed(() => settings.compactView ? CALENDAR_COMPACT_CELL_HEIGHT : CALENDAR_CELL_HEIGHT)

const dayEvents = computed<PositionedCalendarEvent[]>(() => {
  const filteredEvents = events.filter((event) => isSameDay(event.start, date))
  return layoutDayEvents(filteredEvents, cellHeight.value)
})
</script>

<template>
  <div class="flex flex-col grow">
    <CalendarBodyHeader :date="date" />

    <div class="flex-1 relative">
      <div
        v-for="hour in TimelineHours"
        :key="hour"
        :class="[
          'border-b border-border/50 group transition-colors',
          settings.showWorkingHours && !isWorkingHour(hour) && 'bg-muted/30 opacity-80'
        ]"
        :style="{ height: `${cellHeight}px` }"
      />

      <Event v-for="event in dayEvents" :key="event.id" :event="event" />
    </div>
  </div>
</template>
