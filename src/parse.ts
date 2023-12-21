import * as U from './utils'
import * as E from './errors'
import { TimeUnit, TimeUnitPlural } from './types'

/**
 * Parses a string into a date or a number of milliseconds. Supports natural
 * language input (i.e. '1 day ago', 'in 2 hours and 3 minutes,) and
 * standard date formats (i.e. '2018-01-01', '2018-01-01T00:00:00.000Z').
 *
 * @throws {Error} If the input is invalid.
 *
 * @example
 * const ... = parse('1 day ago')
 * const ... = parse('in 2 hours and 3 minutes')
 * const ... = parse('a month')
 * const ... = parse('2018-01-01')
 */
const parse = (input: string): Date | number => {
  const attemptToParseAsDate = Date.parse(input)

  if (Number.isFinite(attemptToParseAsDate)) {
    return new Date(attemptToParseAsDate)
  }

  const processedInput = input.toLowerCase().trim()
  const tokens = processedInput.split(' ')

  let inputValueMS = 0
  let inputIsInPast = false
  let inputIsInFuture = false
  let currentQuantity = null

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].replace(/\W/g, '')

    if (token === 'in') {
      inputIsInFuture = true
      continue
    } else if (token === 'ago') {
      inputIsInPast = true
      continue
    } else if (token === 'and') {
      continue
    }

    if (inputIsInPast && inputIsInFuture) {
      throw new E.InvalidInputError(
        input,
        'cannot be both in the past and in the future'
      )
    }

    if (token === 'a') {
      currentQuantity = 1
    } else if (Number.isFinite(+token)) {
      if (currentQuantity !== null) {
        throw new E.InvalidInputError(input, 'quantity already specified')
      }

      currentQuantity = +token
    } else {
      const unit = U.capitalize(token)
      const value =
        TimeUnit[unit as keyof typeof TimeUnit] ??
        TimeUnitPlural[unit as keyof typeof TimeUnitPlural]

      if (typeof value === 'undefined') {
        throw new E.InvalidInputError(input, `invalid unit: ${token}`)
      }

      inputValueMS += (currentQuantity ?? 1) * value
      currentQuantity = null
    }
  }

  if (inputIsInPast) {
    return U.getPastDate(inputValueMS)
  } else if (inputIsInFuture) {
    return U.getFutureDate(inputValueMS)
  }

  return inputValueMS
}

export default parse
