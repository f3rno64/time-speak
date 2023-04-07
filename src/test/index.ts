/* eslint-env mocha */

import { expect } from 'chai'
import parseString from '../'

const TEST_DATA = [
  ['1 day', 24 * 60 * 60 * 1000],
  ['in 1 day', 24 * 60 * 60 * 1000],
  ['1d', 24 * 60 * 60 * 1000],
  ['in 1d', 24 * 60 * 60 * 1000],
  ['2 days ago', -2 * 24 * 60 * 60 * 1000],
  ['2d', 2 * 24 * 60 * 60 * 1000],
  ['in 2d', 2 * 24 * 60 * 60 * 1000],
  ['2d ago', -2 * 24 * 60 * 60 * 1000],
  ['1wk', 7 * 24 * 60 * 60 * 1000],
  ['in 1 week', 7 * 24 * 60 * 60 * 1000],
  ['1 week ago', -7 * 24 * 60 * 60 * 1000],
  ['2 months ago', -2 * 30 * 24 * 60 * 60 * 1000],
  ['in 2 months', 2 * 30 * 24 * 60 * 60 * 1000],
  ['2mo ago', -2 * 30 * 24 * 60 * 60 * 1000],
  ['in 2mo', 2 * 30 * 24 * 60 * 60 * 1000],
  ['2mo', 2 * 30 * 24 * 60 * 60 * 1000],
  ['1 month ago', -30 * 24 * 60 * 60 * 1000],
  ['1mo ago', -30 * 24 * 60 * 60 * 1000],
  ['in 1mo', 30 * 24 * 60 * 60 * 1000],
  ['1mo', 30 * 24 * 60 * 60 * 1000],
  ['1 year ago', -365 * 24 * 60 * 60 * 1000],
  ['1yr ago', -365 * 24 * 60 * 60 * 1000],
  ['in 1yr', 365 * 24 * 60 * 60 * 1000],
  ['1yr', 365 * 24 * 60 * 60 * 1000],
  ['in 1 year', 365 * 24 * 60 * 60 * 1000],
  ['in 1 week and 3 days', (7 * 24 * 60 * 60 * 1000) + (3 * 24 * 60 * 60 * 1000)],
  ['3 weeks and 5 days', (3 * 7 * 24 * 60 * 60 * 1000) + (5 * 24 * 60 * 60 * 1000)],
  ['3 weeks and 5 days ago', (-3 * 7 * 24 * 60 * 60 * 1000) + (-5 * 24 * 60 * 60 * 1000)]
]

describe('parseString', () => {
  TEST_DATA.forEach((data) => {
    it(data[0] as string, () => {
      const [str, v] = data
      const res = parseString(str as string)
      const target = new Date(Date.now() + (v as number))

      expect(+res).to.equal(+target)
    })
  })
})
