<script setup lang="ts">
import { z } from 'zod'
import { watch, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import SubmitLoader from '@/components/shared/SubmitLoader.vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

const open = defineModel<boolean>('open', { required: true })
const store = useUserStore()
const router = useRouter()
const isLoading = ref(false)

const otpSchema = z.object({
  code: z.string().length(6, 'OTP must be exactly 6 digits'),
})

const form = useForm({
  validationSchema: toTypedSchema(otpSchema),
})

watch(open, (isOpen) => {
  if (isOpen) {
    form.resetForm()
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await store.verifyOtp(values.code)
    open.value = false
    router.push('/')
  } catch (err) {
    console.error('OTP Verification error', err)
    form.setFieldError('code', 'Invalid OTP code')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Verify your email</DialogTitle>
        <DialogDescription>
          We've sent a 6-digit code to your email address. Enter it below to complete registration.
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4 py-4">
        <FormField v-slot="{ componentField }" name="code">
          <FormItem>
            <FormLabel class="text-center block">One-Time Password</FormLabel>
            <FormControl>
              <div class="flex justify-center mt-2">
                <InputOTP
                  id="input-otp"
                  :maxlength="6"
                  v-bind="componentField"
                  class="flex gap-2 items-center"
                >
                  <InputOTPGroup class="gap-2">
                    <template v-for="(id, index) in 6" :key="id">
                      <InputOTPSlot :index="index" />
                    </template>
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </FormControl>
            <FormMessage class="text-center" />
          </FormItem>
        </FormField>

        <div class="flex justify-end pt-2">
          <Button type="submit" class="w-full" :disabled="isLoading">
            <SubmitLoader :isLoading="isLoading" />
            {{ isLoading ? 'Verifying...' : 'Verify OTP' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
