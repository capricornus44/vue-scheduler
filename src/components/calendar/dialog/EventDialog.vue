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
import { useCalendarStore } from '@/stores/calendarStore'
import SubmitLoader from '@/components/shared/SubmitLoader.vue'
import { ref } from 'vue'

const open = defineModel<boolean>('open', { required: true });
const { event } = defineProps<{
  event?: CalendarEvent
}>()

const store = useCalendarStore()

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
    start: store.date?.toISOString(),
    end: store.date?.toISOString(),
    color: 'blue',
  },
});

watch([() => open.value, () => event], ([isOpen, currentEvent]) => {
  if (isOpen) {
    if (currentEvent) {
      // Editing mode
      form.resetForm({
        values: {
          title: currentEvent.title,
          start: currentEvent.start.toISOString(),
          end: currentEvent.end.toISOString(),
          color: currentEvent.color,
        },
      });
    } else {
      // Creation mode — snap to nearest 5 minutes
      const snappedDate = new Date(store.date)
      snappedDate.setMinutes(Math.round(store.date.getMinutes() / 5) * 5)
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
  }
}, { immediate: true });

const isSubmitting = ref(false)
const isDeleting = ref(false)

const onSubmit = form.handleSubmit(
  async (values) => {
    isSubmitting.value = true
    try {
      if (event) {
        await store.updateEvent({
          ...event,
          title: values.title,
          start: new Date(values.start),
          end: new Date(values.end),
          color: values.color,
        });
      } else {
        await store.addEvent({
          id: crypto.randomUUID(),
          title: values.title,
          start: new Date(values.start),
          end: new Date(values.end),
          color: values.color,
          allDay: false,
        });
      }
      form.resetForm();
      open.value = false;
    } finally {
      isSubmitting.value = false
    }
  }
);

const onDelete = async () => {
  if (event) {
    isDeleting.value = true
    try {
      await store.deleteEvent(event.id);
      form.resetForm();
      open.value = false;
    } finally {
      isDeleting.value = false
    }
  }
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{{ event ? 'Edit' : 'Create' }} event</DialogTitle>
      <DialogDescription>
        {{ event ? 'Modify the details of your event below.' : 'Fill out the form below to add a new event to your calendar.' }}
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

      <div class="flex items-center mt-10 gap-4 justify-end">
        <Button
          v-if="event"
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white w-fit"
          :disabled="isSubmitting || isDeleting"
          @click="onDelete"
        >
          <SubmitLoader :isLoading="isDeleting" />
          Delete Event
        </Button>
        <Button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white w-fit" :disabled="isSubmitting || isDeleting">
          <SubmitLoader :isLoading="isSubmitting" />
          {{ event ? 'Update' : 'Create' }} Event
        </Button>
      </div>
    </form>
  </DialogContent>
</template>
