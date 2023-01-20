const capitalizeWeekDay = (weekDay: string): string =>
  weekDay[0].toUpperCase() + weekDay.substring(1)

export const getWeekDays = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  })

  const weekStartedOnSunday = (day: number) => new Date(Date.UTC(2022, 1, day))

  return Array.from({ length: 7 }, (_el, i) =>
    formatter.format(weekStartedOnSunday(i)),
  ).map(capitalizeWeekDay)
}
