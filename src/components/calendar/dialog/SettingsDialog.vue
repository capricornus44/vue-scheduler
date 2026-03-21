<script setup lang="ts">
import { DialogHeader, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { useCalendarSettings } from '@/stores/calendarSettings'
import { watch } from 'vue'
import { InfoIcon } from 'lucide-vue-next'
import SettingsDialogCard from './SettingsDialogCard.vue'

const settings = useCalendarSettings()

// Ensure settings are mutually exclusive
watch(() => settings.hideWeekends, (val) => {
  if (val) settings.startWeekOnSunday = false
})

watch(() => settings.startWeekOnSunday, (val) => {
  if (val) settings.hideWeekends = false
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
      <SettingsDialogCard
        id="hide-weekends"
        label="Hide weekends"
        description="Display only Monday to Friday."
        v-model:checked="settings.hideWeekends"
      />

      <SettingsDialogCard
        id="start-week-on-sunday"
        label="Start week on Sunday"
        description="Display Sunday as the first day of the week."
        v-model:checked="settings.startWeekOnSunday"
      />

      <div v-if="settings.hideWeekends || settings.startWeekOnSunday" class="p-3 rounded-md bg-sky-50/50 dark:bg-sky-500/5 text-[11px] text-sky-600 dark:text-sky-400 border border-sky-100/50 dark:border-sky-500/20 leading-relaxed italic animate-in fade-in slide-in-from-top-1 duration-300">
        <div class="flex gap-2">
          <InfoIcon class="h-3 w-3 shrink-0 mt-0.5" />
          <p>
            These settings are mutually exclusive: showing only the work week (Mon-Fri) hides Sunday, so enabling one overrides the other to ensure a consistent layout.
          </p>
        </div>
      </div>

      <SettingsDialogCard
        id="compact-view"
        label="Compact view"
        description="Reduces the height of the calendar grid."
        v-model:checked="settings.compactView"
      />

      <SettingsDialogCard
        id="show-working-hours"
        label="Show working hours"
        description="Show only working hours (8 AM - 6 PM)."
        v-model:checked="settings.showWorkingHours"
      />
    </div>
  </DialogContent>
</template>
