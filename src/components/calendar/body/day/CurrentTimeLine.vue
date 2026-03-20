<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { isSameDay } from 'date-fns'
import { CALENDAR_HEADER_HEIGHT, CALENDAR_CELL_HEIGHT } from '../../calendar.constants'

const props = defineProps<{
  date?: Date | Date[] // Show if current day is in this set
}>()

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined

const updateTime = () => {
  now.value = new Date()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60000) // Update every minute
})

onUnmounted(() => {
  clearInterval(timer)
})

const shouldShow = computed(() => {
  if (!props.date) return true
  if (Array.isArray(props.date)) {
    return props.date.some(d => isSameDay(d, now.value))
  }
  return isSameDay(props.date, now.value)
})

const topPosition = computed(() => {
  const hours = now.value.getHours()
  const minutes = now.value.getMinutes()
  return CALENDAR_HEADER_HEIGHT + hours * CALENDAR_CELL_HEIGHT + (minutes * CALENDAR_CELL_HEIGHT) / 60
})
</script>

<template>
  <div
    v-if="shouldShow"
    class="absolute left-12 right-0 z-20 pointer-events-none flex items-center"
    :style="{ top: `${topPosition}px` }"
  >
    <!-- The line itself -->
    <div class="h-[2px] w-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]" />

    <!-- Small circle indicator on the left -->
    <div class="absolute left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
  </div>
</template>

