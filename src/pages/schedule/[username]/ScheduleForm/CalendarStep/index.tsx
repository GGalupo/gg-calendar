import { useState } from 'react'

import { Calendar } from '../../../../../components'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const hasSelectedDay = !!selectedDate

  return (
    <Container isTimePickerOpen={hasSelectedDay}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDay && (
        <TimePicker>
          <TimePickerHeader>
            Tuesday, <span>September 20</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00 AM</TimePickerItem>
            <TimePickerItem>09:00 AM</TimePickerItem>
            <TimePickerItem>10:00 AM</TimePickerItem>
            <TimePickerItem>11:00 AM</TimePickerItem>
            <TimePickerItem>12:00 AM</TimePickerItem>
            <TimePickerItem>01:00 PM</TimePickerItem>
            <TimePickerItem>02:00 PM</TimePickerItem>
            <TimePickerItem>03:00 PM</TimePickerItem>
            <TimePickerItem>04:00 PM</TimePickerItem>
            <TimePickerItem>05:00 PM</TimePickerItem>
            <TimePickerItem>06:00 PM</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
