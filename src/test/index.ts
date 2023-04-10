/* eslint-env mocha */

import { expect } from 'chai'

import parseString from '../'
import { TIME_UNIT_DURATIONS } from '../const'
import {
  mtsMillisecond, mtsMinute, mtsDay, mtsWeek, mtsMonth, mtsYear
} from '../util/mts'

const TEST_DATA = [
  ['1 day', mtsDay()],
  ['in 1 day', mtsDay()],
  ['2 days ago', mtsDay(-2)],
  ['in 2 days', mtsDay(2)],
  ['2 day ago', mtsDay(-2)],
  ['1 week', mtsWeek()],
  ['in 1 week', mtsWeek()],
  ['1 week ago', mtsWeek(-1)],
  ['2 months ago', mtsMonth(-2)],
  ['in 2 months', mtsMonth(2)],
  ['1 month ago', mtsMonth(-1)],
  ['1 year ago', mtsYear(-1)],
  ['in 1 year', mtsYear()],
  ['1 year', mtsYear()],
  ['in 1 week and 3 days', mtsWeek() + mtsDay(3)],
  ['3 weeks and 5 days', mtsWeek(3) + mtsDay(5)],
  ['3 weeks and 5 days ago', mtsWeek(-3) + mtsDay(-5)],
  /*
  ['in 1dy', mtsDay()],
  ['in 1wk', mtsWeek()],
  ['in 1mo', mtsMonth()],
  ['in 1min', mtsMinute()],
  ['in 1ms', mtsMillisecond()],
  ['in 1yr', mtsYear()]
  */
]

const TIME_UNITS = [
  'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'
]

const NUMBER_WORDS = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
]

NUMBER_WORDS.forEach((numberWord: string, i: number) => {
  TIME_UNITS.forEach((timeUnit: string) => {
    TEST_DATA.push([
      // eslint-disable-next-line
      // @ts-ignore
      `${numberWord} ${timeUnit}${i > 0 ? 's' : ''} ago`, -1 * (i + 1) * TIME_UNIT_DURATIONS[timeUnit]
    ])
  })
})

describe('parseString', () => {
  TEST_DATA.forEach((data) => {
    it(data[0] as string, () => {
      const [str, v] = data
      const res = parseString(str as string)

      expect(res).to.equal(v)
    })
  })
})
