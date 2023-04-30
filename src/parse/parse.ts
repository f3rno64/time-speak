import Interval from '../interval'
import { PARSERS } from './parsers'
import runParser from './run_parser'
import { ParseError } from '../errors'

/**
 * Parses the provided input to either a unix timestamp or an Interval object.
 *
 * @example
 * const mts = parse('2 days ago')
 * const i = parse('every minute')
 * console.log(+i)
 */
const parse = (rawInput: string): number | Interval => {
  const d = new Date(rawInput)

  if (!Number.isNaN(+d)) {
    return +d
  }

  const input = rawInput.trim().toLowerCase()
  const inputChars = input.split('')
  const inputWords = input.split(' ')

  // TODO: Extract these as a seperate parse step
  const isInterval = inputWords.includes('every')
  const direction = inputWords.includes('ago')
    ? -1
    : 1

  let reg = ''
  let result = NaN

  for (let i = 0; i < inputChars.length; i += 1) {
    reg += inputChars[i]

    PARSERS.forEach((parser) => {
      const parserResult = runParser(result, reg, parser)

      if (!Number.isNaN(parserResult)) {
        result = parserResult
        reg = ''
      }
    })
  }

  if (Number.isNaN(result)) {
    throw new ParseError(input)
  }

  const v = result * direction

  return isInterval
    ? new Interval(v)
    : v
}

export default parse
