<script setup lang="ts">
import ViewToggle from './ViewToggle.vue';
import AddEventButton from './AddEventButton.vue';
import type { CalendarView } from '../../calendar.types';

const view = defineModel<CalendarView>('view', { required: true });
</script>

<template>
  <div class="flex md:justify-start justify-between items-center gap-4">
    <ViewToggle v-model:view="view"/>
    <AddEventButton />
  </div>
</template>
