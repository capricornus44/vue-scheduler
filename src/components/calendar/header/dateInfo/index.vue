<script setup lang="ts">
import { format } from 'date-fns'

import EventCount from './EventCount.vue'
import DateNavigation from './DateNavigation.vue'
import CurrentDateIcon from './CurrentDateIcon.vue'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()
</script>

<template>
  <div class="flex gap-3">
    <CurrentDateIcon @click="store.date = new Date()" />
    <div class="flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold">{{ format(store.date, 'MMMM yyyy') }}</p>
        <EventCount />
      </div>
      <DateNavigation />
    </div>
  </div>
</template>
