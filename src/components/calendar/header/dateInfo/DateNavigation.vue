<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { format, addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from 'date-fns'

import Button from '@/components/ui/button/Button.vue'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()

const formattedDate = computed(() => format(store.date, 'MMMM d, yyyy'))

const handleDateBackward = () => {
  switch (store.view) {
    case 'month':
      store.date = subMonths(store.date, 1)
      break
    case 'week':
      store.date = subWeeks(store.date, 1)
      break
    case 'day':
      store.date = subDays(store.date, 1)
      break
  }
}

const handleDateForward = () => {
  switch (store.view) {
    case 'month':
      store.date = addMonths(store.date, 1)
      break
    case 'week':
      store.date = addWeeks(store.date, 1)
      break
    case 'day':
      store.date = addDays(store.date, 1)
      break
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button variant="outline" class="h-7 w-7 p-1" @click="handleDateBackward">
      <ChevronLeft class="min-w-5 min-h-5" />
    </Button>

    <span class="w-fit text-center font-medium">
      {{ formattedDate }}
    </span>

    <Button variant="outline" class="h-7 w-7 p-1" @click="handleDateForward">
      <ChevronRight class="min-w-5 min-h-5" />
    </Button>
  </div>
</template>
