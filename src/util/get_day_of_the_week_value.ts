import { WEEKDAY_VALUES } from '../const'
import { Weekday } from '../types'

/**
 * @private
 */
const getDayOfTheWeekValue = (v: Weekday): number => {
  const res = WEEKDAY_VALUES[v]

  if (!Number.isFinite(res)) {
    throw new Error(`Not a day of the week: ${v}`)
  }

  return res
}

export default getDayOfTheWeekValue
