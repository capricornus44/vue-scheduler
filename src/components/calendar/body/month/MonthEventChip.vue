<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateEventDialog from '../../dialog/CreateEventDialog.vue'
import CalendarEventTooltip from '../CalendarEventTooltip.vue'
import type { CalendarEvent } from '../../calendar.types'

const { event } = defineProps<{
  event: CalendarEvent
}>()

const isEditOpen = ref(false)
</script>

<template>
  <Dialog v-model:open="isEditOpen">
    <CalendarEventTooltip :event="event" side="top">
      <DialogTrigger as-child>
        <Button
          :class="cn(
            `flex w-full h-auto px-1.5 py-0.5 text-[10px] rounded-sm truncate border-l-2 justify-start`,
            `bg-${event.color}-500/10 text-${event.color}-500 border-${event.color}-500 hover:bg-${event.color}-500/20 hover:text-${event.color}-500`
          )"
          variant="ghost"
          @click.stop
        >
          {{ event.title }}
        </Button>
      </DialogTrigger>
    </CalendarEventTooltip>
    <CreateEventDialog v-model:open="isEditOpen" :event="event" />
  </Dialog>
</template>
