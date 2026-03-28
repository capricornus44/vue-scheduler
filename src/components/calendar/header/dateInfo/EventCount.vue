<script setup lang="ts">
import { computed } from 'vue'
import { isSameMonth } from 'date-fns'
import { useCalendarStore } from '@/stores/calendarStore'
import { useCalendarEvents } from '@/composables/useCalendarEvents'

const store = useCalendarStore()
const { events } = useCalendarEvents()

const eventsInMonth = computed(() => {
  return events.value.filter((event) => isSameMonth(event.start, store.date))
})
</script>

<template>
  <div class="whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-xs w-fit">
    {{ eventsInMonth.length }} events
  </div>
</template>
