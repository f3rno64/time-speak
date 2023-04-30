import { ParseError } from '../errors'
import Interval from '../interval'
import { NumberWord, TimeUnit } from '../types'
import {
  NUMBER_WORDS, NW_VALUES, TIME_UNIT_DURATIONS, TIME_UNITS
} from '../const'

// TODO: Extract
const PARSE_REGEX = `^(in)?(every)?\\s*(a|\\d+|${NUMBER_WORDS.join('|')})\\s+(${TIME_UNITS.join('|')})`

/**
 * Parse a string to an mts value.
 *
 * Examples of valid inputs:
 *   - '2 days ago'
 *   - 'in 1 week and 3 days'
 *   - '1 year and 7 months ago'
 *
 * @param {string} rawInput
 * @returns {number} mts
 * @throws ParseError if parsing fails for any reason
 */
const parseString = (rawInput: string): number | Interval => {
  const input = rawInput.trim().toLowerCase()
  const inputChars = input.split('')
  const inputWords = input.split(' ')
  const isInterval = inputWords.includes('every')
  const direction = inputWords.includes('ago')
    ? -1
    : 1

  let reg = ''
  let result = null

  for (let i = 0; i < inputChars.length; i += 1) {
    reg += inputChars[i]

    if (reg.trim() === 'and' || reg === 's ') {
      reg = ''
      continue
    }

    const res = new RegExp(PARSE_REGEX).exec(reg)

    if (!res) {
      continue
    }

    const value = res[3] == 'a'
      ? 1
      : res[3]

    const unit = res[4]
    const unitValue = TIME_UNIT_DURATIONS[unit as TimeUnit]
    const parsedValue = NUMBER_WORDS.includes(value as NumberWord)
      ? NW_VALUES[value as NumberWord] * unitValue
      : +value * unitValue

    if (Number.isFinite(parsedValue)) {
      if (result === null) {
        result = parsedValue
      } else {
        result += parsedValue
      }

      reg = ''
    }
  }

  if (result === null) {
    throw new ParseError(input)
  }

  const v = result * direction

  return isInterval
    ? new Interval(v)
    : v
}

export default parseString
