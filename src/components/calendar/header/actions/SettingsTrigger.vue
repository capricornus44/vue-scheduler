<script setup lang="ts">
import { SettingsIcon } from 'lucide-vue-next'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import SettingsDialog from '@/components/calendar/dialog/SettingsDialog.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" size="icon">
        <SettingsIcon class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <SettingsDialog />
  </Dialog>
</template>
