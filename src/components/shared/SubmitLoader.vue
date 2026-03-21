<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

withDefaults(defineProps<{
  isLoading?: boolean
}>(), {
  isLoading: true
})
</script>

<template>
  <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
</template>
