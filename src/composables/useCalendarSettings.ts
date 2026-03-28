import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { fetchCalendarSettings, updateCalendarSettings, type CalendarSettings } from '@/api/calendarSettings.api'
import { reactive } from 'vue'

const defaultSettings: CalendarSettings = {
  hideWeekends: false,
  startWeekOnSunday: false,
  compactView: false,
  showWorkingHours: false,
}

export const useCalendarSettingsQuery = () => {
  return useQuery({
    queryKey: ['calendar', 'settings'],
    queryFn: fetchCalendarSettings,
    staleTime: Infinity,
    initialData: defaultSettings,
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

  return reactive({
    get hideWeekends() { return data.value?.hideWeekends ?? false },
    set hideWeekends(val: boolean) { mutate({ ...data.value!, hideWeekends: val }) },
    get startWeekOnSunday() { return data.value?.startWeekOnSunday ?? false },
    set startWeekOnSunday(val: boolean) { mutate({ ...data.value!, startWeekOnSunday: val }) },
    get compactView() { return data.value?.compactView ?? false },
    set compactView(val: boolean) { mutate({ ...data.value!, compactView: val }) },
    get showWorkingHours() { return data.value?.showWorkingHours ?? false },
    set showWorkingHours(val: boolean) { mutate({ ...data.value!, showWorkingHours: val }) },
  })
}
