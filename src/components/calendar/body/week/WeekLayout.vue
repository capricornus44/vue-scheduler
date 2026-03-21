<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { startOfWeek, addDays } from 'date-fns'

import Timeline from '../day/Timeline.vue'
import DayContent from '../day/DayContent.vue'
import CurrentTimeLine from '../day/CurrentTimeLine.vue'
import { useCalendarSettings } from '@/stores/calendarSettings'
import { useCalendarStore } from '@/stores/calendarStore'
import { CALENDAR_CELL_HEIGHT, CALENDAR_COMPACT_CELL_HEIGHT } from '../../calendar.constants'
import { scrollToWorkingHours } from '@/lib/calendar'

const store = useCalendarStore()
const settings = useCalendarSettings()
const scrollContainer = ref<HTMLElement | null>(null)
const cellHeight = computed(() => settings.compactView ? CALENDAR_COMPACT_CELL_HEIGHT : CALENDAR_CELL_HEIGHT)

onMounted(() => {
  // Use a small delay to ensure the container is fully rendered and its scrollHeight is stable
  setTimeout(() => scrollToWorkingHours(scrollContainer.value, settings.showWorkingHours, cellHeight.value, 'auto'), 100)
})

watch([() => settings.showWorkingHours, cellHeight], ([show]) => {
  if (show) scrollToWorkingHours(scrollContainer.value, settings.showWorkingHours, cellHeight.value, 'smooth')
}, { flush: 'post' })

const weekStart = computed(() => startOfWeek(store.date, { weekStartsOn: settings.startWeekOnSunday ? 0 : 1 }))
const weekDays = computed(() => {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart.value, i))
  return settings.hideWeekends ? days.slice(0, 5) : days
})
</script>

<template>
  <div class="flex divide-x grow overflow-hidden">
    <div class="flex flex-col grow divide-y overflow-hidden">
      <div ref="scrollContainer" class="flex flex-col grow overflow-y-auto">
        <div class="relative flex flex-1 divide-x flex-col md:flex-row">
          <Timeline className="hidden md:block" />
          <div
            v-for="day in weekDays"
            :key="day.toISOString()"
            class="flex flex-1 divide-x md:divide-x-0"
          >
            <Timeline className="block md:hidden" />
            <DayContent :date="day" :events="store.events" />
          </div>
          <CurrentTimeLine :date="weekDays" />
        </div>
      </div>
    </div>
  </div>
</template>
