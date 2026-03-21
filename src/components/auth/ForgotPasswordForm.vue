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

const emit = defineEmits<{
  (e: 'switch-view', view: 'login'): void
}>()

const store = useUserStore()
const isLoading = ref(false)
const isSuccess = ref(false)

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const form = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await store.forgotPassword(values.email)
    isSuccess.value = true
  } catch (err) {
    console.error('Forgot password error', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Forgot password</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Enter your email and we'll send you a reset link
      </p>
    </div>

    <div v-if="isSuccess" class="bg-green-50 text-green-800 p-4 rounded-md text-sm text-center">
      Check your email for a password reset link.
    </div>

    <form v-else @submit="onSubmit" class="space-y-4">
      <FormField v-slot="{ field }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="name@example.com" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        <SubmitLoader :isLoading="isLoading" />
        {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
      </Button>
    </form>

    <div class="text-center">
      <Button
        type="button"
        variant="ghost"
        class="text-sm"
        @click="emit('switch-view', 'login')"
      >
        &larr; Back to login
      </Button>
    </div>
  </div>
</template>
