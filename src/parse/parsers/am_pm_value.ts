import { ParseError } from '../../errors'
import { mtsNextHour } from '../../util/mts'
import { PARSE_AM_PM_REGEX } from '../../regex'

/**
 * Parse a string representing a time in the format n(am|pm). If the hour is
 * prior to the current hour, the returned timestamp will be for the following
 * day.
 *
 * @private
 */
const parseAMPMValue = (input: string): number => {
  const res = new RegExp(PARSE_AM_PM_REGEX).exec(
    input.toLowerCase().trim()
  )

  if (!res) {
    return NaN
  }

  const [,, value, unit] = res

  if (!['am', 'pm'].includes(unit)) {
    throw new ParseError(input)
  }

  const valueHours = unit === 'am'
    ? +value
    : +value + 12

  return +(new Date(mtsNextHour(valueHours)))
}

export default parseAMPMValue
