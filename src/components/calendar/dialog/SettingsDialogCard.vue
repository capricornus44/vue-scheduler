<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

defineProps<{
  id: string
  label: string
  description: string
}>()

const checked = defineModel<boolean>('checked', { default: false })
</script>

<template>
  <div class="flex items-center justify-between space-x-4 rounded-lg border py-2 px-4 shadow-sm hover:bg-accent/50 transition-colors">
    <div class="space-y-0.5">
      <Label :for="id" class="text-sm font-bold">{{ label }}</Label>
      <p class="text-xs text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <Switch
      :id="id"
      v-model:checked="checked"
    />
  </div>
</template>
