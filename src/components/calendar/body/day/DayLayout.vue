<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import Timeline from './Timeline.vue'
import DayContent from './DayContent.vue'
import CalendarSidebar from './CalendarSidebar.vue'
import CurrentTimeLine from './CurrentTimeLine.vue'
import { CALENDAR_CELL_HEIGHT, CALENDAR_COMPACT_CELL_HEIGHT } from '../../calendar.constants'
import { useCalendarSettings } from '@/composables/useCalendarSettings'
import { useCalendarStore } from '@/stores/calendarStore'
import { useCalendarEvents } from '@/composables/useCalendarEvents'
import { scrollToWorkingHours } from '@/lib/calendar'

const store = useCalendarStore()
const settings = useCalendarSettings()
const { events } = useCalendarEvents()
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
          <DayContent :date="store.date" :events="events" />
          <CurrentTimeLine :date="store.date" />
        </div>
      </div>
    </div>
    <CalendarSidebar />
  </div>
</template>
