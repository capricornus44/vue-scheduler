<script setup lang="ts">
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useCalendarSettings } from '@/stores/calendarSettings'

const settings = useCalendarSettings()
</script>

<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Calendar Settings</DialogTitle>
      <DialogDescription>
        Customize your calendar view and preferences.
      </DialogDescription>
    </DialogHeader>

    <div class="py-6 space-y-6">
      <div class="flex items-center justify-between space-x-4 rounded-lg border p-4 shadow-sm hover:bg-accent/50 transition-colors">
        <div class="space-y-0.5">
          <Label for="work-week" class="text-sm font-bold">Show Work Week</Label>
          <p class="text-xs text-muted-foreground">
            Display only Monday to Friday in Week and Month views.
          </p>
        </div>
        <Switch
          id="work-week"
          v-model:checked="settings.showWorkWeek"
        />
      </div>
    </div>
  </DialogContent>
</template>
