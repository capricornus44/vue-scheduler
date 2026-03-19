<script setup lang="ts">
import { format, isSameDay } from 'date-fns'

const { date, onlyDay = false } = defineProps<{
  date: Date
  onlyDay?: boolean
}>()

const isToday = isSameDay(date, new Date())
</script>

<template>
  <div class="flex items-center justify-center gap-1 py-2 w-full h-8 bg-background sticky top-0 z-10 border-b">
    <span
      :class="{
        'text-xs font-medium': true,
        'text-primary': isToday,
        'text-muted-foreground': !isToday,
      }"
    >
      {{ format(date, 'EEE') }}
      </span>

      <span
        v-if="!onlyDay"
        :class="{
          'text-xs font-medium': true,
          'text-primary font-bold': isToday,
          'text-foreground': !isToday,
        }"
      >
        {{ format(date, 'dd') }}
      </span>
  </div>
</template>
