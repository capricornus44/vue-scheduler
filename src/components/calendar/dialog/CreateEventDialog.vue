<script setup lang="ts">
import { z } from 'zod'
import { watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import {DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DateTimePicker from '@/components/shared/DateTimePicker.vue'
import ColorPicker from '@/components/shared/ColorPicker.vue'
import type { CalendarEvent } from '../calendar.types'

const open = defineModel<boolean>('open', { required: true });
const date = defineModel<Date>('date', { required: true });

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  start: z.string().datetime(),
  end: z.string().datetime(),
  color: z.string(),
}).refine((data) => {
  const start = new Date(data.start)
  const end = new Date(data.end)
  return end >= start
}, {
  message: 'End date must be after start date',
  path: ['end'],
})
const validationSchema = toTypedSchema(eventSchema)

type FormData = z.infer<typeof eventSchema>

const form = useForm<FormData>({
  validationSchema,
  initialValues: {
    title: '',
    start: date.value?.toISOString(),
    end: date.value?.toISOString(),
    color: 'blue',
  },
});

watch([() => date.value, () => open], ([newDate, isOpen]) => {
  if (isOpen && newDate) {
    const snappedDate = new Date(newDate)
    snappedDate.setMinutes(Math.round(newDate.getMinutes() / 5) * 5)
    snappedDate.setSeconds(0)
    snappedDate.setMilliseconds(0)

    form.resetForm({
      values: {
        title: '',
        start: snappedDate.toISOString(),
        end: snappedDate.toISOString(),
        color: 'blue',
      },
    });
  }
}, { immediate: true });

const onSubmit = form.handleSubmit(
  (values) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      color: values.color,
      allDay: false,
    }
    console.log(newEvent);
    form.resetForm();
    open.value = false;
  }
);
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create event</DialogTitle>
      <DialogDescription>
        Fill out the form below to add a new event to your calendar.
      </DialogDescription>
    </DialogHeader>

    <form @submit="onSubmit" class="space-y-4">
      <FormField v-slot="{ field }" name="title">
        <FormItem>
          <FormLabel class="font-bold">Title</FormLabel>
          <FormControl>
            <Input placeholder="Event title" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="start">
        <FormItem>
          <FormLabel class="font-bold">Start Date</FormLabel>
          <FormControl>
            <DateTimePicker :field="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="end">
        <FormItem>
          <FormLabel class="font-bold">End Date</FormLabel>
          <FormControl>
            <DateTimePicker :field="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="color">
        <FormItem>
          <FormLabel class="font-bold">Color</FormLabel>
          <FormControl>
            <ColorPicker :field="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="bg-sky-500 hover:bg-sky-600 flex w-fit ml-auto">
        Create Event
      </Button>
    </form>
  </DialogContent>
</template>
