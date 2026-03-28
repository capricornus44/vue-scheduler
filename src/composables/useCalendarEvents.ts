import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  fetchCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
} from '@/api/calendarEvents.api'
import type { CalendarEvent } from '@/components/calendar/calendar.types'

export const useCalendarEventsQuery = () => {
  return useQuery({
    queryKey: ['calendar', 'events'],
    queryFn: fetchCalendarEvents,
  })
}

export const useAddEventMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCalendarEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ['calendar', 'events'] })
      const previousEvents = queryClient.getQueryData<CalendarEvent[]>(['calendar', 'events'])

      if (previousEvents) {
        queryClient.setQueryData<CalendarEvent[]>(['calendar', 'events'], [...previousEvents, newEvent])
      }

      return { previousEvents }
    },
    onError: (err, newEvent, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['calendar', 'events'], context.previousEvents)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar', 'events'] })
    },
  })
}

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCalendarEvent,
    onMutate: async (updatedEvent) => {
      await queryClient.cancelQueries({ queryKey: ['calendar', 'events'] })
      const previousEvents = queryClient.getQueryData<CalendarEvent[]>(['calendar', 'events'])

      if (previousEvents) {
        queryClient.setQueryData<CalendarEvent[]>(
          ['calendar', 'events'],
          previousEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        )
      }

      return { previousEvents }
    },
    onError: (err, updatedEvent, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['calendar', 'events'], context.previousEvents)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar', 'events'] })
    },
  })
}

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCalendarEvent,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['calendar', 'events'] })
      const previousEvents = queryClient.getQueryData<CalendarEvent[]>(['calendar', 'events'])

      if (previousEvents) {
        queryClient.setQueryData<CalendarEvent[]>(
          ['calendar', 'events'],
          previousEvents.filter((e) => e.id !== deletedId)
        )
      }

      return { previousEvents }
    },
    onError: (err, deletedId, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['calendar', 'events'], context.previousEvents)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar', 'events'] })
    },
  })
}

import { computed } from 'vue'

export const useCalendarEvents = () => {
  const { data: eventsData, isLoading } = useCalendarEventsQuery()
  const { mutateAsync: addEvent } = useAddEventMutation()
  const { mutateAsync: updateEvent } = useUpdateEventMutation()
  const { mutateAsync: deleteEvent } = useDeleteEventMutation()

  const events = computed(() => eventsData.value ?? [])

  return { events, isLoading, addEvent, updateEvent, deleteEvent }
}
