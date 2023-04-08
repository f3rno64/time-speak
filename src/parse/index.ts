import _last from 'lodash/last'

import { TIME_UNIT_DURATIONS } from '../const'
import parseToTimeUnit from './to_time_unit'

/**
 * Main method for parsing strings into dates, durations, and intervals.
 *
 * @TODO: WIP
 *
 * @param {string} input - input
 * @returns {Date} d
 */
const parseString = (input: string): Date => {
  const inputChars = input.trim().split('')
  const inputWords = input.split(' ')
  const direction = _last(inputWords) === 'ago'
    ? -1
    : 1

  let reg = ''
  let result = 0
  let skipUntilWhitespace = false

  for (let i = 0; i < inputChars.length; i += 1) {
    const c = inputChars[i]

    if (c === ' ') {
      skipUntilWhitespace = false
      continue
    } else if (skipUntilWhitespace) {
      continue
    }

    reg += c

    const res = parseToTimeUnit(reg)

    if (typeof res !== 'undefined') {
      const { inputDataValue, timeUnit } = res

      skipUntilWhitespace = true
      result += inputDataValue * TIME_UNIT_DURATIONS[timeUnit]
      reg = ''
    } else if (reg === 'and') {
      reg = ''
      skipUntilWhitespace = true
    }
  }

  return new Date(Date.now() + (result * direction))
}

export default parseString
