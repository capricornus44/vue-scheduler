<script setup lang="ts">
import DateInfo from './dateInfo/index.vue'
import Actions from './actions/index.vue'
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b">
    <DateInfo />
    <Actions />
  </div>
</template>
