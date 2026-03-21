<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'

type AuthView = 'login' | 'register' | 'forgot-password'
const currentView = ref<AuthView>('login')
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-muted/40 p-4">
    <div class="w-full max-w-sm p-8 bg-background rounded-xl border shadow-sm relative overflow-hidden">
      <LoginForm v-if="currentView === 'login'" @switch-view="currentView = $event" />
      <RegisterForm v-else-if="currentView === 'register'" @switch-view="currentView = $event" />
      <ForgotPasswordForm v-else-if="currentView === 'forgot-password'" @switch-view="currentView = $event" />
    </div>
  </main>
</template>
