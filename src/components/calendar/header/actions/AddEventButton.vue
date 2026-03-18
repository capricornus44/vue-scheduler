<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import CreateEventDialog from '@/components/calendar/dialog/CreateEventDialog.vue'

const open = ref(false)
const date = defineModel<Date>('date', { required: true })
</script>

<template>
  <Dialog v-model:open="open" @update:open="(val) => { if (val) date = new Date() }">
    <DialogTrigger as-child>
      <Button class="flex items-center gap-1 bg-sky-500 text-white hover:bg-sky-600">
        <Plus />
        Add Event
      </Button>
    </DialogTrigger>
    <CreateEventDialog v-model:date="date" :open="open" />
  </Dialog>
</template>
