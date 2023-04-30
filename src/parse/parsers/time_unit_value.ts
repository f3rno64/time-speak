import { PARSE_TIME_UNIT_REGEX } from '../../regex'
import { type TimeUnit, type NumberWord } from '../../types'
import { NUMBER_WORDS, TIME_UNIT_DURATIONS, NW_VALUES } from '../../const'

/**
 * Parse a string representing a time with a unit.
 *
 * @private
 */
const parseTimeUnitValue = (input: string): number => {
  const res = new RegExp(PARSE_TIME_UNIT_REGEX).exec(
    input.toLowerCase().trim()
  )

  if (!res) {
    return NaN
  }

  const value = res[3] == 'a'
    ? 1
    : res[3]

  const unit = res[5]
  const unitValue = TIME_UNIT_DURATIONS[unit as TimeUnit]

  return NUMBER_WORDS.includes(value as NumberWord)
    ? NW_VALUES[value as NumberWord] * unitValue
    : Number.isFinite(+value)
      ? +value * unitValue
      : unitValue
}

export default parseTimeUnitValue
