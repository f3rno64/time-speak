import { NUMBER_WORDS, NW_VALUES, TIME_UNIT_DURATIONS } from '../const'
import parseToTimeUnit from './to_time_unit'
import { ParseError } from '../errors'
import { NumberWord } from '../types'

/**
 * Parse a string to an mts value. Does not take whitespace into consideration.
 * Examples of valid inputs:
 *   - '2 days ago'
 *   - 'in 1 week and 3 days'
 *   - '1 year and 7 months ago'
 *
 * @param {string} rawInput
 * @returns {number} mts
 * @throws ParseError if parsing fails for any reason
 */
const parseString = (rawInput: string): number => {
  const input = rawInput.trim().toLowerCase()
  const inputChars = input.split('')
  const inputWords = input.split(' ')
  const direction = inputWords.includes('ago')
    ? -1
    : 1

  let reg = ''
  let result = null
  let lastValue = null

  for (let i = 0; i < inputChars.length; i += 1) {
    const c = inputChars[i]

    if (/\s/.test(c)) {
      continue
    }

    // i.e. 'and' followed by '3'
    if (Number.isFinite(+c) && !Number.isFinite(+reg)) {
      reg = ''
    }

    reg += c

    if (NUMBER_WORDS.includes(reg as NumberWord)) {
      lastValue = NW_VALUES[reg]
      reg = ''
      continue
    }

    const res = parseToTimeUnit(reg)

    if (res !== null) {
      const { timeUnit, inputDataValue } = res

      // eslint-disable-next-line
      // @ts-ignore
      const resultValue = NUMBER_WORDS.includes(inputDataValue)
        ? NW_VALUES[inputDataValue]
        : Number.isFinite(+inputDataValue)
          ? +inputDataValue
          : lastValue

      if (!Number.isFinite(resultValue)) {
        continue
      }

      if (result === null) {
        result = 0
      }

      // eslint-disable-next-line
      // @ts-ignore
      result += resultValue * TIME_UNIT_DURATIONS[timeUnit]
      lastValue = null
      reg = ''
    } else if (reg === 'and') {
      reg = ''
    }
  }

  if (result === null) {
    throw new ParseError(input)
  }

  return result * direction
}

export default parseString
