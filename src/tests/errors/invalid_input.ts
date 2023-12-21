/* eslint-env mocha */

import { expect } from 'chai'
import { InvalidInputError } from '../../errors'

describe('errors:invalid_input', () => {
  it('should include the input in the error message', () => {
    const input = 'test-input'
    const err = new InvalidInputError(input)

    expect(err.message).to.include(input)
  })

  it('should include the detail string if provided in the error message', () => {
    const input = 'test-input'
    const detail = 'failed for some reason'

    const err = new InvalidInputError(input, detail)

    expect(err.message).to.include(detail)
  })
})
