import { Weekday } from '../types'
import { mtsDay } from '../util/mts'
import { getDayOfTheWeekValue } from '../util'

const getNextDayOfTheWeekMTS = (wdStr: Weekday): number => {
  const wd = getDayOfTheWeekValue(wdStr)

  let d = new Date()

  d.setMilliseconds(0)
  d.setSeconds(0)
  d.setMinutes(0)
  d.setHours(0)

  const dDay = d.getDay()
  const dOffset = wd === dDay
    ? 0
    : dDay - wd

  d = new Date(+d + mtsDay(dOffset))

  return +d
}

export default getNextDayOfTheWeekMTS
