<script setup lang="ts">
import { cn } from "@/lib/utils"

// Native model for absolute reliability in Vue reactivity
const checked = defineModel<boolean>('checked')

const props = defineProps<{
  id?: string
  class?: string
  disabled?: boolean
}>()
</script>

<template>
  <label
    :for="id"
    :class="cn(
      'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background',
      checked ? 'bg-sky-500' : 'bg-input dark:bg-input/80',
      props.disabled && 'cursor-not-allowed opacity-50',
      props.class
    )"
  >
    <input
      :id="id"
      type="checkbox"
      v-model="checked"
      class="sr-only"
      :disabled="props.disabled"
    />
    <span
      :class="cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
        checked ? 'translate-x-4' : 'translate-x-0'
      )"
    />
  </label>
</template>
