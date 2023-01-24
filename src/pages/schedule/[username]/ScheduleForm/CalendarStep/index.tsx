import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const [availability, setAvailability] = useState<Availability | null>(null)

  const hasSelectedDay = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const monthYear = selectedDate ? dayjs(selectedDate).format('DD MMMM') : null

  const formattedTimePickerHour = (hour: number) => {
    const isAM = hour <= 12

    return `${String(isAM ? hour : hour - 12)}:00 ${isAM ? 'AM' : 'PM'}`
  }

  useEffect(() => {
    if (!selectedDate) return

    const getAvailability = async () => {
      try {
        const response = await api.get(`/users/${username}/availability`, {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
          },
        })

        setAvailability(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    getAvailability()
  }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={hasSelectedDay}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

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
