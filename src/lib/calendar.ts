import { nextTick } from 'vue';
import { WORKING_HOURS } from '@/components/calendar/calendar.constants';

export const isWorkingHour = (hour: number): boolean => {
  return hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end;
};

export const scrollToWorkingHours = async (
  container: HTMLElement | null,
  showWorkingHours: boolean,
  cellHeight: number,
  behavior: ScrollBehavior = 'auto'
) => {
  await nextTick();
  if (container && showWorkingHours) {
    container.scrollTo({
      top: WORKING_HOURS.start * cellHeight,
      behavior,
    });
  }
};
