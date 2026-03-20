<script setup lang="ts">
import { format } from 'date-fns'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const now = new Date()
</script>

<template>
  <div
    class="flex flex-col gap-0 w-fit h-fit p-0 overflow-hidden border rounded-md dark:border-input shadow-xs cursor-pointer hover:bg-accent/50 transition-colors"
    @click="emit('click')"
  >
    <p
      class="flex w-full items-center justify-center bg-sky-500 text-center text-xs py-1 px-2 text-white font-semibold uppercase pointer-events-none"
    >
      TODAY
    </p>
    <p class="flex w-full items-baseline justify-center gap-1 text-lg font-bold py-1 px-2 pointer-events-none">
      {{ format(now, 'dd') }}
      <span class="text-xs">{{ format(now, 'MMM') }}</span>
    </p>
  </div>
</template>
