<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
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
import OtpDialog from './OtpDialog.vue'

const emit = defineEmits<{
  (e: 'switch-view', view: 'login'): void
}>()

const store = useUserStore()
const isLoading = ref(false)
const isOtpDialogOpen = ref(false)

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await store.register(values.email, values.password)
    isOtpDialogOpen.value = true
  } catch (err) {
    console.error('Registration error', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm text-muted-foreground mt-2">Enter your details below to create your account</p>
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
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="••••••••" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="••••••••" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        <SubmitLoader :isLoading="isLoading" />
        {{ isLoading ? 'Creating account...' : 'Create Account' }}
      </Button>
    </form>

    <div class="text-center text-sm">
      Already have an account?
      <Button
        type="button"
        variant="link"
        class="px-0 py-0 h-auto font-semibold"
        @click="emit('switch-view', 'login')"
      >
        Sign in
      </Button>
    </div>

    <OtpDialog v-model:open="isOtpDialogOpen" />
  </div>
</template>
