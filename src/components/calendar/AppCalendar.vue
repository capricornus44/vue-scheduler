<script setup lang="ts">
import CalendarHeader from './header/CalendarHeader.vue'
import CalendarBody from './body/CalendarBody.vue'
</script>

<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <CalendarHeader />
    <CalendarBody />
  </div>
</template>
