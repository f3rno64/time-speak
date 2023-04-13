import { WEEKDAYS } from '../const'
import { Weekday } from '../types'

/**
 * @private
 */
const isDayOfTheWeek = (v: string): boolean => (
  WEEKDAYS.includes(v as Weekday)
)

export default isDayOfTheWeek
