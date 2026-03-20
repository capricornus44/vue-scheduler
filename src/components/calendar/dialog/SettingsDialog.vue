<script setup lang="ts">
import { DialogHeader, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useCalendarSettings } from '@/stores/calendarSettings'
import { watch } from 'vue'

const settings = useCalendarSettings()

// Ensure settings are mutually exclusive
watch(() => settings.showWorkWeek, (val) => {
  if (val) settings.startWeekOnSunday = false
})

watch(() => settings.startWeekOnSunday, (val) => {
  if (val) settings.showWorkWeek = false
})
</script>

<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Calendar Settings</DialogTitle>
      <DialogDescription>
        Customize your calendar view and preferences.
      </DialogDescription>
    </DialogHeader>

    <div class="py-6 space-y-4">
      <div class="flex items-center justify-between space-x-4 rounded-lg border py-2 px-4 shadow-sm hover:bg-accent/50 transition-colors">
        <div class="space-y-0.5">
          <Label for="work-week" class="text-sm font-bold">Show work week</Label>
          <p class="text-xs text-muted-foreground">
            Display only Monday to Friday.
          </p>
        </div>
        <Switch
          id="work-week"
          v-model:checked="settings.showWorkWeek"
        />
      </div>

      <div class="flex items-center justify-between space-x-4 rounded-lg border py-2 px-4 shadow-sm hover:bg-accent/50 transition-colors">
        <div class="space-y-0.5">
          <Label for="start-week-on-sunday" class="text-sm font-bold">Start week on Sunday</Label>
          <p class="text-xs text-muted-foreground">
            Display Sunday as the first day of the week.
          </p>
        </div>
        <Switch
          id="start-week-on-sunday"
          v-model:checked="settings.startWeekOnSunday"
        />
      </div>
    </div>
  </DialogContent>
</template>
