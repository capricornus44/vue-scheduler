<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EventDialog from '../dialog/EventDialog.vue'
import CalendarEventTooltip from './CalendarEventTooltip.vue'
import type { CalendarEvent, PositionedCalendarEvent } from '../calendar.types'
import { CALENDAR_CELL_HEIGHT, CALENDAR_COMPACT_CELL_HEIGHT } from '../calendar.constants'
import { useCalendarSettings } from '@/composables/useCalendarSettings'

const props = defineProps<{
  event: CalendarEvent | PositionedCalendarEvent
  month?: boolean
  className?: string
}>()

const settings = useCalendarSettings()
const cellHeight = computed(() => settings.compactView ? CALENDAR_COMPACT_CELL_HEIGHT : CALENDAR_CELL_HEIGHT)

const isPositioned = (event: CalendarEvent | PositionedCalendarEvent): event is PositionedCalendarEvent => {
  return 'position' in event
}

const style = computed(() => {
  if (props.month) return {}
  
  if (isPositioned(props.event)) {
    return props.event.position
  }

  // Fallback for non-positioned events (though they should be positioned by DayContent)
  const startHour = props.event.start.getHours()
  const startMinutes = props.event.start.getMinutes()
  
  const topPosition = startHour * cellHeight.value + (startMinutes / 60) * cellHeight.value
  const duration = (props.event.end.getTime() - props.event.start.getTime()) / (1000 * 60)
  const height = (duration / 60) * cellHeight.value

  return {
    top: `${topPosition}px`,
    height: `${height}px`,
    left: '0',
    width: '100%'
  }
})

const isEditOpen = ref(false)
</script>

<template>
  <Dialog v-model:open="isEditOpen">
    <CalendarEventTooltip :event="event" side="top">
      <DialogTrigger as-child>
        <div
          :class="cn(
            'px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 border border-transparent shadow-sm hover:shadow-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            `bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border-${event.color}-500/30 hover:border-${event.color}-500/60 text-${event.color}-600 dark:text-${event.color}-400`,
            !month && 'absolute',
            className
          )"
          :style="style"
        >
          <div
            :class="cn(
              'flex flex-col w-full h-full min-h-0',
              month && 'flex-row items-center justify-between'
            )"
          >
            <div class="flex items-center gap-1.5 min-w-0">
              <div :class="cn('w-1 h-1 rounded-full shrink-0', `bg-${event.color}-500`)" v-if="!month" />
              <p :class="cn('font-semibold truncate leading-tight', month ? 'text-xs' : 'text-sm')">
                {{ event.title }}
              </p>
            </div>
            
            <p :class="cn('truncate opacity-80 mt-0.5', month ? 'hidden' : 'text-[11px]')">
              {{ format(event.start, 'h:mm a') }} - {{ format(event.end, 'h:mm a') }}
            </p>
          </div>
        </div>
      </DialogTrigger>
    </CalendarEventTooltip>
    <EventDialog v-model:open="isEditOpen" :event="event" />
  </Dialog>
</template>
