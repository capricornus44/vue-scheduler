<script setup lang="ts">
import { Github, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ThemeToggle from './ThemeToggle.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const handleLogout = () => {
  store.logout()
  router.push('/login')
}
</script>

<template>
  <header class="flex justify-between items-center px-4 py-2 border-b border-gray-200">
    <div class="flex flex-col">
      <p class="text-lg font-semibold">Event Calendar</p>
      <p class="text-sm text-gray-400">by <span class="font-semibold">Anton Zavalniuk</span></p>
    </div>

    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon-lg">
        <a href="https://github.com/capricornus44/vue-scheduler" target="_blank">
          <Github class="h-[1.2rem] w-[1.2rem]" />
          <span class="sr-only">GitHub Link</span>
        </a>
      </Button>
      <ThemeToggle />
      <Button v-if="store.isAuthenticated" variant="ghost" size="icon-lg" @click="handleLogout" title="Logout">
        <LogOut class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Logout</span>
      </Button>
    </div>
  </header>
</template>
