<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import EventDialog from '@/components/calendar/dialog/EventDialog.vue'
import { useCalendarStore } from '@/stores/calendarStore'

const store = useCalendarStore()
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open" @update:open="(val) => { if (val) store.date = new Date() }">
    <DialogTrigger as-child>
      <Button class="flex items-center gap-1 bg-sky-500 text-white hover:bg-sky-600">
        <Plus />
        Add Event
      </Button>
    </DialogTrigger>
    <EventDialog v-model:open="open" />
  </Dialog>
</template>
