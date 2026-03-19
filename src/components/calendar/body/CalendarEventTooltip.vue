<script setup lang="ts">
import { format } from 'date-fns'
import { Clock } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { CalendarEvent } from '../calendar.types'

interface Props {
  event: CalendarEvent
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

withDefaults(defineProps<Props>(), {
  side: 'right',
  sideOffset: 8,
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent
        class="p-0 border-none bg-transparent shadow-none"
        :side="side"
        :side-offset="sideOffset"
      >
        <div class="relative overflow-hidden rounded-xl border bg-popover/95 p-3 shadow-2xl backdrop-blur-sm min-w-48 max-w-64">
          <div
            :class="cn(
              'absolute top-0 left-0 w-1 h-full',
              `bg-${event.color}-500`
            )"
          />
          <div class="space-y-2.5">
            <div class="flex items-start gap-2.5">
              <div
                :class="cn(
                   'mt-1.5 size-2 rounded-full shrink-0',
                   `bg-${event.color}-500 shadow-[0_0_8px] shadow-${event.color}-500/50`
                )"
              />
              <p class="text-sm font-bold leading-tight tracking-tight text-foreground/90">
                {{ event.title }}
              </p>
            </div>
            <div class="flex items-center gap-2 px-0.5 text-[11px] font-medium text-muted-foreground/80">
              <Clock class="size-3.5" />
              <span>
                {{ format(event.start, 'h:mm a') }} — {{ format(event.end, 'h:mm a') }}
              </span>
            </div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
