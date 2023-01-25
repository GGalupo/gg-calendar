import { useState } from 'react'

import { CalendarStep } from './CalendarStep'
import { ConfirmationStep } from './ConfirmationStep'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  if (selectedDateTime) {
    return <ConfirmationStep scheduledDateTime={selectedDateTime} />
  }

  return <CalendarStep onDateTimeSelection={setSelectedDateTime} />
}
