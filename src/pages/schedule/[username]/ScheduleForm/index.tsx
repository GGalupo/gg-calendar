import { CalendarStep } from './CalendarStep'
import { ConfirmationStep } from './ConfirmationStep'

export const ScheduleForm = () => {
  const isCalendarStep = true

  return isCalendarStep ? <CalendarStep /> : <ConfirmationStep />
}
