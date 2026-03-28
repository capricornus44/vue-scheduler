import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { fetchCalendarSettings, updateCalendarSettings } from '@/api/calendarSettings.api'
import type { CalendarSettings } from '@/components/calendar/calendar.types'
import { DEFAULT_CALENDAR_SETTINGS } from '@/components/calendar/calendar.constants'
import { reactive } from 'vue'

export const useCalendarSettingsQuery = () => {
  return useQuery({
    queryKey: ['calendar', 'settings'],
    queryFn: fetchCalendarSettings,
    placeholderData: DEFAULT_CALENDAR_SETTINGS,
  })
}

export const useUpdateCalendarSettingsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCalendarSettings,
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: ['calendar', 'settings'] })
      const previousSettings = queryClient.getQueryData<CalendarSettings>(['calendar', 'settings'])
      queryClient.setQueryData(['calendar', 'settings'], newSettings)
      return { previousSettings }
    },
    onError: (err, newSettings, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(['calendar', 'settings'], context.previousSettings)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar', 'settings'] })
    },
  })
}

export const useCalendarSettings = () => {
  const { data } = useCalendarSettingsQuery()
  const { mutate } = useUpdateCalendarSettingsMutation()

  const currentSettings = () => data.value ?? DEFAULT_CALENDAR_SETTINGS

  return reactive({
    get hideWeekends() { return currentSettings().hideWeekends },
    set hideWeekends(val: boolean) { mutate({ ...currentSettings(), hideWeekends: val }) },
    
    get startWeekOnSunday() { return currentSettings().startWeekOnSunday },
    set startWeekOnSunday(val: boolean) { mutate({ ...currentSettings(), startWeekOnSunday: val }) },
    
    get compactView() { return currentSettings().compactView },
    set compactView(val: boolean) { mutate({ ...currentSettings(), compactView: val }) },
    
    get showWorkingHours() { return currentSettings().showWorkingHours },
    set showWorkingHours(val: boolean) { mutate({ ...currentSettings(), showWorkingHours: val }) },
  })
}
