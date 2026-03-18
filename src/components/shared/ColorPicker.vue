<script lang="ts" setup>
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

import { CalendarColorOptions } from '../calendar/calendar.constants'

const { field } = defineProps<{
  field: {
    value?: string
    onChange: (value: string) => void
  }
}>()
</script>

<template>
  <RadioGroup
    :model-value="field.value"
    @update:model-value="
      (v) => {
        if (v) field.onChange(v as string)
      }
    "
    class="flex gap-2"
  >
    <RadioGroupItem
      v-for="color in CalendarColorOptions"
      :key="color.value"
      :value="color.value"
      :id="color.value"
      :class="
        cn(
          'size-6 border-0 shadow-none transition-all duration-200',
          `bg-${color.value}-500`,
          `dark:bg-${color.value}-500`,
        )
      "
      :aria-label="color.label"
    >
      <div class="size-3 rounded-full bg-white dark:bg-black" />
    </RadioGroupItem>
  </RadioGroup>
</template>
