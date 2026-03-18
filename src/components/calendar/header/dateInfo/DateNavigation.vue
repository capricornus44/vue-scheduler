<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import {
  format,
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'

import Button from "@/components/ui/button/Button.vue"
import type { CalendarView } from '../../calendar.types';

const date = defineModel<Date>('date', { required: true });
const { view } = defineProps<{
  view: CalendarView;
}>();

const formattedDate = computed(() => format(date.value, 'MMMM d, yyyy'));

const handleDateBackward = () => {
  switch (view) {
    case 'month':
      date.value = subMonths(date.value, 1)
      break
    case 'week':
      date.value = subWeeks(date.value, 1)
      break
    case 'day':
      date.value = subDays(date.value, 1)
      break
  }
}

const handleDateForward = () => {
  switch (view) {
    case 'month':
      date.value = addMonths(date.value, 1)
      break
    case 'week':
      date.value = addWeeks(date.value, 1)
      break
    case 'day':
      date.value = addDays(date.value, 1)
      break
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
        variant="outline"
        class="h-7 w-7 p-1"
        @click="handleDateBackward"
      >
        <ChevronLeft class="min-w-5 min-h-5" />
      </Button>

       <span class="w-fit text-center font-medium">
        {{ formattedDate }}
      </span>

      <Button
        variant="outline"
        class="h-7 w-7 p-1"
        @click="handleDateForward"
      >
        <ChevronRight class="min-w-5 min-h-5" />
      </Button>
  </div>
</template>
