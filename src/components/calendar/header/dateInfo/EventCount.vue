<script setup lang="ts">
import { computed } from 'vue'
import { isSameMonth } from 'date-fns'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()

const eventsInMonth = computed(() => {
  return store.events.filter((event) => isSameMonth(event.start, store.date))
})
</script>

<template>
  <div class="whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-xs w-fit">
    {{ eventsInMonth.length }} events
  </div>
</template>
