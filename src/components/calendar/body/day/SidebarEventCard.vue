<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EventDialog from '../../dialog/EventDialog.vue'
import type { CalendarEvent } from '../../calendar.types'

const { event } = defineProps<{
  event: CalendarEvent
}>()

const isEditOpen = ref(false)
</script>

<template>
  <Dialog v-model:open="isEditOpen">
    <DialogTrigger as-child>
      <div
        class="group relative flex flex-col gap-1 p-3 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div
          :class="[
            'absolute top-0 left-0 w-1 h-full rounded-l-xl',
            `bg-${event.color}-500`
          ]"
        />
        <div class="flex items-start gap-2">
          <div
            :class="[
              'mt-1 size-2 rounded-full shrink-0',
              `bg-${event.color}-500 shadow-[0_0_8px] shadow-${event.color}-500/50`
            ]"
          />
          <p class="text-xs font-bold leading-none py-0.5">
            {{ event.title }}
          </p>
        </div>
        <p class="text-[10px] text-muted-foreground pl-4">
          {{ format(event.start, 'h:mm a') }} — {{ format(event.end, 'h:mm a') }}
        </p>
      </div>
    </DialogTrigger>
    <EventDialog v-model:open="isEditOpen" :event="event" />
  </Dialog>
</template>
