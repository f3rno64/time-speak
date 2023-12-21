import * as U from './utils'
import * as E from './errors'
import { TimeUnit, TimeUnitPlural } from './types'

/**
 * Parses a string into a `Date` or number of milliseconds. The string can
 * describe the date in natural language (e.g. "tomorrow", "in 2 hours and 3
 * minutes", "a month ago", etc.) or be a valid date string (e.g. "2018-01-01").
 *
 * @throws {@link InvalidInputError}
 * This exception is thrown if the input is invalid.
 *
 * @param input - The string to parse.
 * @returns The parsed date or number of milliseconds.
 *
 * @example
 * Here are some example invocations:
 * ```
 * const ... = parse('1 day ago')
 * const ... = parse('in 2 hours and 3 minutes')
 * const ... = parse('a month')
 * const ... = parse('2018-01-01')
 * const ... = parse('2018-01-01T00:00:00.000Z')
 * ```
 *
 * @example
 * Here are some example invocations that throw an exception:
 * ```
 * parse('in 2 hours and 3 minutes ago')
 * parse('a month in the past')
 * ```
 *
 * @public
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

    if (token === 'and') {
      continue
    }

    if (token === 'in' || token === 'ago') {
      if (token === 'in') {
        inputIsInFuture = true
      } else if (token === 'ago') {
        inputIsInPast = true
      }

      if (inputIsInPast && inputIsInFuture) {
        throw new E.InvalidInputError(
          input,
          'cannot be both in the past and in the future'
        )
      }

      continue
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
