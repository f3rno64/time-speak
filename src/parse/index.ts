import _last from 'lodash/last'

import { TU_DURATIONS } from '../const'
import parseToTimeUnit from './to_time_unit'

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
      result += inputDataValue * TU_DURATIONS[timeUnit]
      reg = ''
    } else if (reg === 'and') {
      reg = ''
      skipUntilWhitespace = true
    }
  }

  return new Date(Date.now() + (result * direction))
}

export default parseString
