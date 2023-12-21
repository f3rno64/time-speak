/* eslint-env mocha */

import { expect } from 'chai'
import { getFutureDate } from '../../utils'

describe('utils:get_future_date', () => {
  it('should return a date in the future by the given millisecond value', () => {
    const futureDate = getFutureDate(1000)

    expect(+futureDate).to.be.closeTo(Date.now() + 1000, 100)
  })
})
