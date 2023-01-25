import { useState } from 'react'

import { CalendarStep } from './CalendarStep'
import { ConfirmationStep } from './ConfirmationStep'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  const handleClearSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmationStep
        scheduledDateTime={selectedDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarStep onDateTimeSelection={setSelectedDateTime} />
}
