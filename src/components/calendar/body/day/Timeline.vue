<script setup lang="ts">
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { TimelineHours, CALENDAR_CELL_HEIGHT, CALENDAR_HEADER_HEIGHT } from '../../calendar.constants'

const { className } = defineProps<{
  className?: string
}>()
</script>

<template>
  <div :class="cn(
        'sticky left-0 w-12 z-10 flex flex-col',
        className
      )">
    <div class="sticky top-0 left-0 z-20 border-b" :style="{ height: `${CALENDAR_HEADER_HEIGHT}px` }" />
    <div class="sticky left-0 w-12 z-10 flex flex-col">
      <div
        v-for="hour in TimelineHours"
        :key="hour"
        class="relative first:mt-0"
        :style="{ height: `${CALENDAR_CELL_HEIGHT}px` }"
      >
        <span v-if="hour !== 0" class="absolute text-xs text-gray-400 -top-2.5 left-2">
          {{ format(new Date(new Date().setHours(hour, 0, 0, 0)), 'h a') }}
        </span>
      </div>
    </div>
  </div>
</template>
