<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import SubmitLoader from '@/components/shared/SubmitLoader.vue'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const emit = defineEmits<{
  (e: 'switch-view', view: 'register' | 'forgot-password'): void
}>()

const store = useUserStore()
const router = useRouter()
const isLoading = ref(false)

const logInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const form = useForm({
  validationSchema: toTypedSchema(logInSchema),
})

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await store.login(values.email, values.password)
    router.push('/')
  } catch (err) {
    console.error('Login error', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p class="text-sm text-muted-foreground mt-2">Enter your email and password to sign in</p>
    </div>

    <form @submit="onSubmit" class="space-y-4">
      <FormField v-slot="{ field }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="name@example.com" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="password">
        <FormItem>
          <div class="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            <Button
              type="button"
              variant="link"
              class="px-0 py-0 h-auto font-normal text-xs"
              @click="emit('switch-view', 'forgot-password')"
            >
              Forgot password?
            </Button>
          </div>
          <FormControl>
            <Input type="password" placeholder="••••••••" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        <SubmitLoader :isLoading="isLoading" />
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </Button>
    </form>

    <div class="text-center text-sm">
      Don't have an account?
      <Button
        type="button"
        variant="link"
        class="px-0 py-0 h-auto font-semibold"
        @click="emit('switch-view', 'register')"
      >
        Sign up
      </Button>
    </div>
  </div>
</template>
