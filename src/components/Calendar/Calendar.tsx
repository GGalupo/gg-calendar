import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'

import { api } from '../../lib'
import { getWeekDays } from '../../utils'

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

type CalendarWeek = {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type BlockedDates = {
  blockedWeekDays: number[]
}

type CalendarProps = {
  selectedDate: Date | null
  username: string
  onDateSelected: (date: Date) => void
}

export const Calendar = ({
  selectedDate,
  username,
  onDateSelected,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const currentYear = currentDate.get('year')
  const currentMonth = currentDate.get('month')
  console.log('currentDate: ', currentDate)
  console.log('currentYear: ', currentYear)
  console.log('currentMonth: ', currentMonth)

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentYear, currentMonth],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })

      return response.data
    },
  )

  const shortWeekDays = getWeekDays({ short: true })

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const currentMonthFormatted = currentDate.format('MMMM')
  const currentYearFormatted = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonth = currentDate.daysInMonth()

    const daysInMonthArray = Array.from({ length: daysInMonth }, (_el, i) =>
      currentDate.set('date', i + 1),
    )

    const lastMonthDate = currentDate.set('date', daysInMonth)

    const firstMonthDay = currentDate.get('day')
    const lastMonthDay = lastMonthDate.get('day')

    const previousMonthLastDaysArray = Array.from(
      { length: firstMonthDay },
      (_el, i) => currentDate.subtract(i + 1, 'day'),
    ).reverse()

    const nextMonthFirstDaysArray = Array.from(
      { length: 7 - (lastMonthDay + 1) },
      (_el, i) => lastMonthDate.add(i + 1, 'day'),
    )

    const calendarDays = [
      ...previousMonthLastDaysArray.map((date) => ({
        date,
        disabled: true,
      })),
      ...daysInMonthArray.map((date) => {
        const dayHasAlreadyPassed = date.endOf('day').isBefore(new Date())
        const dayIsBlockedByUser = !!blockedDates?.blockedWeekDays.includes(
          date.get('day'),
        )

        return {
          date,
          disabled: dayHasAlreadyPassed || dayIsBlockedByUser,
        }
      }),
      ...nextMonthFirstDaysArray.map((date) => ({
        date,
        disabled: true,
      })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, index, originalArray) => {
        const isNewWeek = index % 7 === 0

        if (!isNewWeek) return weeks

        return [
          ...weeks,
          {
            week: index / 7 + 1,
            days: originalArray.slice(index, index + 7),
          },
        ]
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonthFormatted} <span>{currentYearFormatted}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    onClick={() => onDateSelected(date.toDate())}
                    disabled={disabled}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
