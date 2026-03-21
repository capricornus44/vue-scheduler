<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { CalendarView } from '../../calendar.types'
import { CalendarViews } from '../../calendar.constants'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()
</script>

<template>
  <ToggleGroup
    type="single"
    variant="outline"
    :model-value="store.view"
    @update:model-value="
      (val) => {
        if (val) store.view = val as CalendarView
      }
    "
  >
    <ToggleGroupItem v-for="value in CalendarViews" :key="value" :value="value">
      {{ value.charAt(0).toUpperCase() + value.slice(1) }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>
