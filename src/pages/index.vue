<script setup lang="ts">
import Calendar from '../components/calendar/AppCalendar.vue'
import AppHeader from '../components/shared/AppHeader.vue'
</script>

<template>
  <main class="h-screen flex flex-col overflow-hidden bg-background">
    <AppHeader />
    <Calendar />
  </main>
</template>
