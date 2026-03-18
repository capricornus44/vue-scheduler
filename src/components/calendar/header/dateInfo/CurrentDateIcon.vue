<script setup lang="ts">
import { format } from 'date-fns'

const now = new Date()
</script>

<template>
  <div
    class="flex flex-col gap-0 w-fit h-fit p-0 overflow-hidden border rounded-md dark:border-input shadow-xs"
  >
    <p class="flex w-full items-center justify-center bg-sky-500 text-center text-xs py-1 px-2 text-white font-semibold uppercase">
      {{ format(now, 'MMM') }}
    </p>
    <p class="flex w-full items-center justify-center text-lg font-bold py-1 px-2">
      {{ format(now, 'dd') }}
    </p>
  </div>
</template>
