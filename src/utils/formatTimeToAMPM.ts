export const formatTimeToAMPM = (hour: number) => {
  const isAM = hour <= 12

  return `${String(isAM ? hour : hour - 12)}:00 ${isAM ? 'AM' : 'PM'}`
}
