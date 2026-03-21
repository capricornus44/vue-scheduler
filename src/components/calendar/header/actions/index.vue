<script setup lang="ts">
import ViewToggle from './ViewToggle.vue'
import AddEventButton from './AddEventButton.vue'
import SettingsTrigger from './SettingsTrigger.vue'
</script>

<template>
  <div class="flex md:justify-start justify-between items-center gap-4">
    <SettingsTrigger />
    <ViewToggle />
    <AddEventButton />
  </div>
</template>
