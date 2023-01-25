import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { Calendar } from '../../../../../components'
import { api } from '../../../../../lib'

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

export const CalendarStep = () => {
  const router = useRouter()
  const username = String(router.query.username)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const hasSelectedDay = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const monthYear = selectedDate ? dayjs(selectedDate).format('DD MMMM') : null

  const formattedTimePickerHour = (hour: number) => {
    const isAM = hour <= 12

    return `${String(isAM ? hour : hour - 12)}:00 ${isAM ? 'AM' : 'PM'}`
  }

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

  return (
    <Container isTimePickerOpen={hasSelectedDay}>
      <Calendar
        username={username}
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />

      {hasSelectedDay && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{monthYear}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {formattedTimePickerHour(hour)}
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
