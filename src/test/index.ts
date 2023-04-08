/* eslint-env mocha */

import { expect } from 'chai'
import parseString from '../'
import { TU_DURATIONS } from '../const'

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
  ['1 month ago', -30 * 24 * 60 * 60 * 1000],
  ['1 year ago', -365 * 24 * 60 * 60 * 1000],
  ['1yr ago', -365 * 24 * 60 * 60 * 1000],
  ['in 1yr', 365 * 24 * 60 * 60 * 1000],
  ['1yr', 365 * 24 * 60 * 60 * 1000],
  ['in 1 year', 365 * 24 * 60 * 60 * 1000],
  ['in 1 week and 3 days', (7 * 24 * 60 * 60 * 1000) + (3 * 24 * 60 * 60 * 1000)],
  ['3 weeks and 5 days', (3 * 7 * 24 * 60 * 60 * 1000) + (5 * 24 * 60 * 60 * 1000)],
  ['3 weeks and 5 days ago', (-3 * 7 * 24 * 60 * 60 * 1000) + (-5 * 24 * 60 * 60 * 1000)],
]

const TIME_UNITS = [
  'day', 'week', 'month', 'year'
]

const NUMBER_WORDS = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
]

NUMBER_WORDS.forEach((numberWord: string, i: number) => {
  TIME_UNITS.forEach((timeUnit: string) => {
    TEST_DATA.push([
      `${numberWord} ${timeUnit}${i > 0 ? 's' : ''} ago`, -1 * (i + 1) * TU_DURATIONS[timeUnit]
    ])
  })
})

describe('parseString', () => {
  TEST_DATA.forEach((data) => {
    it(data[0] as string, () => {
      const [str, v] = data
      const res = parseString(str as string)

      expect(+res).to.equal(v)
    })
  })
})
