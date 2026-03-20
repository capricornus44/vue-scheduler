<script setup lang="ts">
import Timeline from './Timeline.vue'
import DayContent from './DayContent.vue'
import CalendarSidebar from '../CalendarSidebar.vue'
import type { CalendarEvent } from '../../calendar.types'

const date = defineModel<Date>('date', { required: true })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()
</script>

<template>
  <div class="flex grow overflow-hidden">
    <div class="flex flex-col grow divide-y overflow-hidden border-r">
      <div class="flex flex-col grow overflow-y-auto">
        <div class="relative flex flex-1 divide-x">
          <Timeline />
          <DayContent :date="date" :events="events" />
        </div>
      </div>
    </div>
    <CalendarSidebar v-model:date="date" :events="events" />
  </div>
</template>
