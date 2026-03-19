<script setup lang="ts">
import Timeline from './Timeline.vue'
import DayContent from './DayContent.vue'
import type { CalendarEvent } from '../../calendar.types'

const { date, events } = defineProps<{
  date: Date
  events: CalendarEvent[]
}>()
</script>

<template>
  <div class="flex divide-x grow overflow-hidden">
    <div class="flex flex-col grow divide-y overflow-hidden">
      <div class="flex flex-col grow overflow-y-auto">
        <div class="relative flex flex-1 divide-x">
          <Timeline />
          <DayContent :date="date" :events="events" />
        </div>
      </div>
    </div>
  </div>
</template>
