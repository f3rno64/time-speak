/* eslint-env mocha */

import { expect } from 'chai'

import parseString from '../'
import { TimeUnit } from '../types'
import TimeInterval from '../time_interval'
import { mtsDay, mtsWeek } from '../util/mts'
import { NUMBER_WORDS, TIME_UNITS, TIME_UNIT_DURATIONS } from '../const'

const TEST_DATA = [
  ['in 1 week and 3 days', mtsWeek() + mtsDay(3)],
  ['3 weeks and 5 days', mtsWeek(3) + mtsDay(5)],
  ['3 weeks and 5 days ago', mtsWeek(-3) + mtsDay(-5)],
  ['every 2 days', new TimeInterval(mtsDay(2)).getValue()]
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
})
