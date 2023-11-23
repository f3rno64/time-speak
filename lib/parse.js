const _capitalize = require('lodash/capitalize')
const _isFinite = require('lodash/isFinite')
const _last = require('lodash/last')

const { TIME_UNITS } = require('./const')

const parse = (rawInput) => {
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
    } else if (_isFinite(+token)) {
      if (currentInputQuantity !== null) {
        throw new Error(`Invalid input: ${input}`)
      }

      currentInputQuantity = +token
    } else {
      const timeUnitToken = (
        _last(token) === 's' ? token.slice(0, -1) : token
      ).replace('centurie', 'century')

      const unitValue = TIME_UNITS[_capitalize(timeUnitToken)]

      if (typeof unitValue === 'undefined') {
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

module.exports = parse
