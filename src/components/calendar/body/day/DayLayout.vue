<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import Timeline from './Timeline.vue'
import DayContent from './DayContent.vue'
import CalendarSidebar from './CalendarSidebar.vue'
import CurrentTimeLine from './CurrentTimeLine.vue'
import type { CalendarEvent } from '../../calendar.types'
import { CALENDAR_CELL_HEIGHT, CALENDAR_COMPACT_CELL_HEIGHT } from '../../calendar.constants'
import { useCalendarSettings } from '@/stores/calendarSettings'
import { scrollToWorkingHours } from '@/lib/calendar'

const date = defineModel<Date>('date', { required: true })
const { events } = defineProps<{
  events: CalendarEvent[]
}>()

const settings = useCalendarSettings()
const scrollContainer = ref<HTMLElement | null>(null)
const cellHeight = computed(() => settings.compactView ? CALENDAR_COMPACT_CELL_HEIGHT : CALENDAR_CELL_HEIGHT)

onMounted(() => {
  setTimeout(() => scrollToWorkingHours(scrollContainer.value, settings.showWorkingHours, cellHeight.value, 'auto'), 100)
})

watch([() => settings.showWorkingHours, cellHeight], ([show]) => {
  if (show) scrollToWorkingHours(scrollContainer.value, settings.showWorkingHours, cellHeight.value, 'smooth')
}, { flush: 'post' })
</script>

<template>
  <div class="flex grow overflow-hidden">
    <div class="flex flex-col grow divide-y overflow-hidden border-r">
      <div ref="scrollContainer" class="flex flex-col grow overflow-y-auto">
        <div class="relative flex flex-1 divide-x">
          <Timeline />
          <DayContent :date="date" :events="events" />
          <CurrentTimeLine :date="date" />
        </div>
      </div>
    </div>
    <CalendarSidebar v-model:date="date" :events="events" />
  </div>
</template>
