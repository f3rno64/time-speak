import _last from 'lodash/last'
import _isFinite from 'lodash/isFinite'
import _includes from 'lodash/includes'

import { NUMBER_WORDS, NW_VALUES, TIME_UNIT_DURATIONS } from '../const'
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
  const inputChars = input.trim().toLowerCase().split('')
  const inputWords = input.trim().toLowerCase().split(' ')
  const direction = _last(inputWords) === 'ago'
    ? -1
    : 1

  let reg = ''
  let result = null
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

    console.log(reg)

    const res = parseToTimeUnit(reg)

    if (res !== null) {
      const { inputDataValue, timeUnit } = res

      if (result === null) {
        result = 0
      }

      // eslint-disable-next-line
      // @ts-ignore
      const resultValue = _includes(NUMBER_WORDS, inputDataValue)
        ? NW_VALUES[inputDataValue]
        : _isFinite(+inputDataValue)
          ? +inputDataValue
          : 0

      result += resultValue * TIME_UNIT_DURATIONS[timeUnit]
      console.log({ resultValue, inputDataValue, result, timeUnit })
      reg = ''
      skipUntilWhitespace = true
    } else if (reg === 'and') {
      reg = ''
      skipUntilWhitespace = true
    }
  }

  if (result === null) {
    throw new Error(`Failed to parse input string: ${input}`)
  }

  return new Date(Date.now() + (result * direction))
}

export default parseString
