<script setup lang="ts">
import { format } from 'date-fns'

import EventCount from './EventCount.vue'
import DateNavigation from './DateNavigation.vue'
import CurrentDateIcon from './CurrentDateIcon.vue'
import type { CalendarEvent, CalendarView } from '../../calendar.types'

const date = defineModel<Date>('date', { required: true })

const { view, events } = defineProps<{
  view: CalendarView
  events: CalendarEvent[]
}>()
</script>

<template>
  <div class="flex gap-3">
    <CurrentDateIcon />
    <div class="flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold">{{ format(date, 'MMMM yyyy') }}</p>
        <EventCount :events="events" :date="date" />
      </div>
      <DateNavigation v-model:date="date" :view="view" />
    </div>
  </div>
</template>
