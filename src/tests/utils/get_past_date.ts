/* eslint-env mocha */

import { expect } from 'chai'
import { getPastDate } from '../../utils'

describe('utils:get_past_date', function () {
  it('should return a date in the past by the given millisecond value', function () {
    const pastDate = getPastDate(1000)

    expect(+pastDate).to.be.closeTo(Date.now() - 1000, 100)
  })
})
