import _last from 'lodash/last'
import _isFinite from 'lodash/isFinite'
import _capitalize from 'lodash/capitalize'

import { TimeUnit } from './types'

const parse = (rawInput: string) => {
  const attemptToParseAsDate = Date.parse(rawInput)

  if (_isFinite(attemptToParseAsDate)) {
    return new Date(attemptToParseAsDate)
  }

  const input = rawInput.toLowerCase().trim()
  const tokens = input.split(' ')

  let inputValueMS = 0
  let inputIsInPast = false
  let inputIsInFuture = false
  let currentInputQuantity = null

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].replace(/,$/g, '')

    if (token === 'in') {
      inputIsInFuture = true
    } else if (token === 'ago') {
      inputIsInPast = true
    } else if (['and', ','].includes(token)) {
      continue
    } else if (token === 'a') {
      currentInputQuantity = 1
    } else if (_isFinite(+token)) {
      if (currentInputQuantity !== null) {
        throw new Error(`Invalid input: ${input}`)
      }

      currentInputQuantity = +token
    } else {
      const timeUnitToken = (
        _last(token) === 's' ? token.slice(0, -1) : token
      ).replace('centurie', 'century')

      const unitValue =
        TimeUnit[_capitalize(timeUnitToken) as keyof typeof TimeUnit]

      if (typeof unitValue === 'undefined' || currentInputQuantity === null) {
        throw new Error(`Invalid input: ${input}`)
      }

      inputValueMS += currentInputQuantity * unitValue
      currentInputQuantity = null
    }
  }

  if (inputIsInPast && inputIsInFuture) {
    throw new Error(`Invalid input: ${input}`)
  }

  // prettier-ignore
  return inputIsInPast
    ? new Date(Date.now() - inputValueMS)
    : inputIsInFuture
      ? new Date(Date.now() + inputValueMS)
      : inputValueMS
}

export default parse
