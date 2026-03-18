<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const mode = useColorMode({ disableTransition: false })
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon-lg">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'" class="flex items-center gap-4">
        <Sun class="h-[1.2rem] w-[1.2rem]" />
        <span>Light</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'" class="flex items-center gap-4">
        <Moon class="h-[1.2rem] w-[1.2rem]" />
        <span>Dark</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'" class="flex items-center gap-4">
        <Monitor class="h-[1.2rem] w-[1.2rem]" />
        <span>System</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
