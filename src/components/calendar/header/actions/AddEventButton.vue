<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue';
import CreateEventDialog from '@/components/calendar/dialog/CreateEventDialog.vue';
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="flex items-center gap-1 bg-sky-500 text-white hover:bg-sky-600">
        <Plus />
        Add Event
      </Button>
    </DialogTrigger>
    <CreateEventDialog />
  </Dialog>
</template>
