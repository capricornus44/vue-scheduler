<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-vue-next'
import {
  CalendarDate,
  type DateValue,
} from '@internationalized/date'
import { toDate } from 'reka-ui/date'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Hours, Minutes } from '../calendar/calendar.constants'

const { field } = defineProps<{
  field: {
    value?: string;
    onChange: (value: string) => void;
  }
}>();

const date = ref<Date>(field.value ? new Date(field.value) : new Date())

watch(() => field.value, (newValue: string | undefined) => {
  if (newValue) {
    date.value = new Date(newValue);
  } else {
    date.value = new Date(); // Default to current date if field.value is null/undefined
  }
});

const handleDateSelect = (selectedDate: DateValue | undefined) => {
  if (selectedDate) {
    const d = toDate(selectedDate)
    const newDate = new Date(date.value)
    newDate.setFullYear(d.getFullYear())
    newDate.setMonth(d.getMonth())
    newDate.setDate(d.getDate())
    date.value = newDate
    field.onChange(newDate.toISOString())
  }
}

const calendarValue = computed({
  get: () => new CalendarDate(date.value.getFullYear(), date.value.getMonth() + 1, date.value.getDate()),
  set: (val) => handleDateSelect(val),
})

const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string) => {
  const newDate = new Date(date.value)
  if (type === 'hour') {
    newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0))
  } else if (type === 'minute') {
    newDate.setMinutes(parseInt(value))
  } else if (type === 'ampm') {
    const currentHours = newDate.getHours()
    const isPM = value === 'PM'
    if (isPM && currentHours < 12) {
      newDate.setHours(currentHours + 12)
    } else if (!isPM && currentHours >= 12) {
      newDate.setHours(currentHours - 12)
    }
  }
  date.value = newDate
  field.onChange(newDate.toISOString())
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn('w-full justify-start text-left font-normal', !date && 'text-gray-300')"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ date ? format(date, 'MM/dd/yyyy hh:mm aa') : 'MM/DD/YYYY hh:mm aa' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 flex flex-col sm:flex-row">
      <Calendar v-model="calendarValue" initial-focus />

      <div class="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
        <ScrollArea class="w-64 sm:w-auto">
          <ScrollBar orientation="horizontal" class="sm:hidden" />
          <div class="flex sm:flex-col p-2">
            <Button
              v-for="hour in Hours"
              :key="hour"
              :variant="date && date.getHours() % 12 === hour % 12 ? 'default' : 'ghost'"
              size="icon"
              class="sm:w-full shrink-0 aspect-square"
              @click="handleTimeChange('hour', hour.toString())"
            >
              {{ hour }}
            </Button>
          </div>
        </ScrollArea>

        <ScrollArea class="w-64 sm:w-auto">
          <ScrollBar orientation="horizontal" class="sm:hidden" />
          <div class="flex sm:flex-col p-2">
            <Button
              v-for="minute in Minutes"
              :key="minute"
              :variant="date && Math.round(date.getMinutes() / 5) * 5 % 60 === minute ? 'default' : 'ghost'"
              size="icon"
              class="sm:w-full shrink-0 aspect-square"
              @click="handleTimeChange('minute', minute.toString())"
            >
              {{ minute.toString().padStart(2, '0') }}
            </Button>
          </div>
        </ScrollArea>

        <ScrollArea class="w-64 sm:w-auto">
          <div class="flex sm:flex-col p-2">
            <Button
              v-for="ampm in ['AM', 'PM']"
              :key="ampm"
              :variant="
                date &&
                ((date.getHours() >= 12 && ampm === 'PM') ||
                  (date.getHours() < 12 && ampm === 'AM'))
                  ? 'default'
                  : 'ghost'
              "
              size="icon"
              class="sm:w-full shrink-0 aspect-square"
              @click="handleTimeChange('ampm', ampm)"
            >
              {{ ampm }}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </PopoverContent>
  </Popover>
</template>
