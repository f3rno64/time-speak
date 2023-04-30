/* eslint-env mocha */

import { expect } from 'chai'

import parseString from '../'
import { TimeUnit } from '../types'
import Interval from '../interval'
import { NUMBER_WORDS, TIME_UNITS, TIME_UNIT_DURATIONS } from '../const'
import {
  mtsDay,
  mtsHour,
  mtsWeek,
  mtsYear,
  mtsMonth,
  mtsSecond,
  mtsMinute,
  mtsNextHour,
  mtsMillisecond,
} from '../util/mts'

const TEST_DATA = [
  ['millisecond', mtsMillisecond()],
  ['second', mtsSecond()],
  ['minute', mtsMinute()],
  ['hour', mtsHour()],
  ['day', mtsDay()],
  ['month', mtsMonth()],
  ['year', mtsYear()],
  ['in 1 week and 3 days', mtsWeek() + mtsDay(3)],
  ['3 weeks and 5 days', mtsWeek(3) + mtsDay(5)],
  ['3 weeks and 5 days ago', mtsWeek(-3) + mtsDay(-5)],
]

TIME_UNITS.forEach((timeUnit: TimeUnit): void => {
  TEST_DATA.push([`a ${timeUnit}`, TIME_UNIT_DURATIONS[timeUnit]])
  TEST_DATA.push([`in a ${timeUnit}`, TIME_UNIT_DURATIONS[timeUnit]])
  TEST_DATA.push([`a ${timeUnit} ago`, -1 * TIME_UNIT_DURATIONS[timeUnit]])
  TEST_DATA.push([`in 4 ${timeUnit}s`, 4 * TIME_UNIT_DURATIONS[timeUnit]])
  TEST_DATA.push([`4 ${timeUnit}s ago`, -4 * TIME_UNIT_DURATIONS[timeUnit]])
})

NUMBER_WORDS.forEach((numberWord: string, i: number) => {
  TIME_UNITS.forEach((timeUnit: TimeUnit) => {
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

  it('every year', () => {
    const res = parseString('every year') as Interval

    expect(res.valueOf() - mtsYear()).to.be.lessThan(1000)
  })

  it('every 2 days', () => {
    const res = parseString('every 2 days') as Interval

    expect(res.valueOf() - mtsDay(2)).to.be.lessThan(1000)
  })

  it('5pm', () => {
    const res = parseString('5pm') as number

    expect(res - mtsNextHour(5 + 12)).to.be.lessThan(1000)
  })

  it('5am', () => {
    const res = parseString('5am') as number

    expect(res - mtsNextHour(5)).to.be.lessThan(1000)
  })
})
