/**
 * Get the unix timestamp for the next hour; if it is prior to the current
 * hour, the hour in the next day is returned.
 */
const mtsNextHour = (h: number): number => {
  const d = new Date()

  if ((d.getUTCHours() + 1) > h) {
    d.setUTCDate(d.getUTCDate() + 1)
  }

  d.setUTCHours(h - 1)

  d.setUTCMilliseconds(0)
  d.setUTCSeconds(0)
  d.setUTCMinutes(0)

  return +d
}

export default mtsNextHour
