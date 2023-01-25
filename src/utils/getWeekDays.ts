interface GetWeekDaysParams {
  short?: boolean
}

const capitalizeWeekDay = (weekDay: string, short: boolean): string => {
  if (short) {
    return weekDay.substring(0, 3).toUpperCase()
  }
  return weekDay[0].toUpperCase() + weekDay.substring(1)
}

export const getWeekDays = ({ short = false }: GetWeekDaysParams = {}) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  })

  const weekStartedOnSunday = (day: number) => new Date(Date.UTC(2022, 1, day))

  return Array.from({ length: 7 }, (_el, i) =>
    formatter.format(weekStartedOnSunday(i)),
  ).map((el) => capitalizeWeekDay(el, short))
}
