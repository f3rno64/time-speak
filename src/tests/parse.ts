/* eslint-env mocha */

import { use, expect } from 'chai'
import chaiAlmost from 'chai-almost'

import parse from '../parse'
import { TimeUnit } from '../types'
import { InvalidInputError } from '../errors'

use(chaiAlmost())

const getMilliseconds = (value: number): number => value
const getMinutesMS = (value: number): number => value * 60 * 1000
const getSecondsMS = (value: number): number => value * 1000
const getHoursMS = (value: number): number => value * 60 * 60 * 1000
const getDaysMS = (value: number): number => value * 24 * 60 * 60 * 1000
const getWeeksMS = (value: number): number => value * 7 * 24 * 60 * 60 * 1000
const getMonthsMS = (value: number): number => value * 30 * 24 * 60 * 60 * 1000
const getYearsMS = (value: number): number => value * 365 * 24 * 60 * 60 * 1000
const getDecadesMS = (value: number): number =>
  value * 10 * 365 * 24 * 60 * 60 * 1000
const getCenturiesMS = (value: number): number =>
  value * 100 * 365 * 24 * 60 * 60 * 1000

const MULTI_UNIT_DURATION_TESTS: Record<string, number> = {
  '1 millisecond and 2 seconds': getMilliseconds(1) + getSecondsMS(2),
  '1 second and 2 minutes': getSecondsMS(1) + getMinutesMS(2),
  '1 minute and 2 hours': getMinutesMS(1) + getHoursMS(2),
  '1 hour and 2 days': getHoursMS(1) + getDaysMS(2),
  '1 day and 2 weeks': getDaysMS(1) + getWeeksMS(2),
  '1 week and 2 months': getWeeksMS(1) + getMonthsMS(2),
  '1 month and 2 years': getMonthsMS(1) + getYearsMS(2),
  '1 year and 2 decades': getYearsMS(1) + getDecadesMS(2),
  '1 decade and 2 centuries': getDecadesMS(1) + getCenturiesMS(2)
}

const NUMBER_WORDS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const UNIT_TESTS: Record<string, number> = {
  millisecond: getMilliseconds(1),
  second: getSecondsMS(1),
  minute: getMinutesMS(1),
  hour: getHoursMS(1),
  day: getDaysMS(1),
  week: getWeeksMS(1),
  month: getMonthsMS(1),
  year: getYearsMS(1),
  decade: getDecadesMS(1),
  century: getCenturiesMS(1)
}

const SINGLE_UNIT_DURATION_TESTS: Record<string, number> = {}

Object.keys(TimeUnit).forEach((unit: string): void => {
  const value = Math.floor(Math.random() * 1000)
  const testCaseString = `${value} ${unit.toLowerCase()}{value > 1 ? 's' : ''}`

  SINGLE_UNIT_DURATION_TESTS[testCaseString] =
    value * TimeUnit[unit as keyof typeof TimeUnit]
})

const multiUnitDurationTests = Object.keys(MULTI_UNIT_DURATION_TESTS)
const unitTests = Object.keys(UNIT_TESTS)

describe('parse', function () {
  it('parses ISO date strings', function (): void {
    const date = new Date()
    const parsedDate = parse(date.toISOString())

    expect(+parsedDate).to.be.closeTo(+date, 100)
  })

  it('parses YYYY, YYYY-MM, YYYY-MM-DD, etc', function (): void {
    const inputA = '2022'
    const dateA = new Date(Date.parse(inputA))

    const inputB = '2022-01'
    const dateB = new Date(Date.parse(inputB))

    const inputC = '2022-01-01'
    const dateC = new Date(Date.parse(inputC))

    expect(+parse(inputA)).to.be.closeTo(+dateA, 100)
    expect(+parse(inputB)).to.be.closeTo(+dateB, 100)
    expect(+parse(inputC)).to.be.closeTo(+dateC, 100)
  })

  it('throws an error if the input contains both "in" and "ago"', function () {
    expect(parse.bind(null, 'in 1 second ago')).to.throw(InvalidInputError)
  })

  it('throws an error if multiple quantities are provided', function () {
    expect(parse.bind(null, '1 2 seconds')).to.throw(InvalidInputError)
  })

  it('throws an error if no time unit is identified', function () {
    expect(parse.bind(null, '1 asd')).to.throw(InvalidInputError)
  })

  it('parses strings to correct millisecond values', function () {
    for (let i = 0; i < multiUnitDurationTests.length; i++) {
      const input = multiUnitDurationTests[i]
      const output = MULTI_UNIT_DURATION_TESTS[input]

      expect(+parse(input)).to.be.closeTo(output, 100)
    }
  })

  it('parses strings to the future dates', function () {
    for (let i = 0; i < multiUnitDurationTests.length; i++) {
      const input = multiUnitDurationTests[i]
      const output = new Date(Date.now() + MULTI_UNIT_DURATION_TESTS[input])

      expect(+parse(`in ${input}`)).to.be.closeTo(+output, 100)
    }
  })

  it('parses strings to the past dates', function () {
    for (let i = 0; i < multiUnitDurationTests.length; i++) {
      const input = multiUnitDurationTests[i]
      const output = new Date(Date.now() - MULTI_UNIT_DURATION_TESTS[input])

      expect(+parse(`${input} ago`)).to.be.closeTo(+output, 100)
    }
  })

  it('parses unit strings to valid millisecond values', function () {
    for (let i = 0; i < unitTests.length; i += 1) {
      const input = unitTests[i]
      expect(parse(input)).to.equal(UNIT_TESTS[input])
    }
  })

  it('parses a unit to a valid millisecond value', function () {
    for (let i = 0; i < unitTests.length; i += 1) {
      const input = unitTests[i]

      expect(parse(`a ${input}`)).to.equal(UNIT_TESTS[input])
    }
  })

  it('parses number words to valid millisecond values', function () {
    for (let i = 0; i < unitTests.length; i += 1) {
      const input = unitTests[i]
      const inputPlural =
        input.slice(input.length - 1) === 'y'
          ? input.slice(input.length - 2) === 'ay'
            ? `${input}s`
            : `${input.slice(0, input.length - 1)}ies`
          : `${input}s`

      Object.keys(NUMBER_WORDS).forEach((numberWord: string): void => {
        const v =
          UNIT_TESTS[input] *
          NUMBER_WORDS[numberWord as keyof typeof NUMBER_WORDS]

        expect(parse(`${numberWord} ${inputPlural}`)).to.equal(v)
      })
    }
  })
})
