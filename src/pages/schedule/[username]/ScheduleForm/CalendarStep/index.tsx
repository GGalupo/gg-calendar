import { Calendar } from '../../../../../components'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const hasSelectedDay = false

  return (
    <Container isTimePickerOpen={hasSelectedDay}>
      <Calendar />

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
