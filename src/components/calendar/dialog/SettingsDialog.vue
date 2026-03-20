<script setup lang="ts">
import { DialogHeader, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useCalendarSettings } from '@/stores/calendarSettings'
import { watch } from 'vue'
import { InfoIcon } from 'lucide-vue-next'

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

      <div v-if="settings.showWorkWeek || settings.startWeekOnSunday" class="p-3 rounded-md bg-sky-50/50 dark:bg-sky-500/5 text-[11px] text-sky-600 dark:text-sky-400 border border-sky-100/50 dark:border-sky-500/20 leading-relaxed italic animate-in fade-in slide-in-from-top-1 duration-300">
        <div class="flex gap-2">
          <InfoIcon class="h-3 w-3 shrink-0 mt-0.5" />
          <p>
            These settings are mutually exclusive: showing only the work week (Mon-Fri) hides Sunday, so enabling one overrides the other to ensure a consistent layout.
          </p>
        </div>
      </div>
    </div>
  </DialogContent>
</template>
