import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { Calendar } from '../../../../../components'
import { api } from '../../../../../lib'
import { formatTimeToAMPM } from '../../../../../utils'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

type Availability = {
  possibleTimes: number[]
  availableTimes: number[]
}

type CalendarStepProps = {
  onDateTimeSelection: (date: Date) => void
}

export const CalendarStep = ({ onDateTimeSelection }: CalendarStepProps) => {
  const router = useRouter()
  const username = String(router.query.username)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const hasSelectedDay = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const monthYear = selectedDate ? dayjs(selectedDate).format('MMMM DD') : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onDateTimeSelection(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={hasSelectedDay}>
      <Calendar username={username} onDateSelected={setSelectedDate} />

      {hasSelectedDay && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{monthYear}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {formatTimeToAMPM(hour)}
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
