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
 * @returns {number} mts
 */
const parseString = (input: string): number => {
  const inputChars = input.trim().toLowerCase().split('')
  const inputWords = input.trim().toLowerCase().split(' ')
  const direction = _includes(inputWords, 'ago')
    ? -1
    : 1

  let reg = ''
  let result = 0
  let lastValue = null

  for (let i = 0; i < inputChars.length; i += 1) {
    const c = inputChars[i]

    if (c === ' ') {
      continue
    }

    // i.e. 'and' followed by '3'
    if (_isFinite(+c) && !_isFinite(+reg)) {
      reg = ''
    }

    reg += c

    if (_includes(NUMBER_WORDS, reg)) {
      lastValue = NW_VALUES[reg]
      reg = ''
      continue
    }

    const res = parseToTimeUnit(reg)

    if (res !== null) {
      const { timeUnit, inputDataValue } = res

      // eslint-disable-next-line
      // @ts-ignore
      const resultValue = _includes(NUMBER_WORDS, inputDataValue)
        ? NW_VALUES[inputDataValue]
        : _isFinite(+inputDataValue)
          ? +inputDataValue
          : lastValue

      if (!_isFinite(resultValue)) {
        continue
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
    throw new Error(`Failed to parse input string: ${input}`)
  }

  return result * direction
}

export default parseString
