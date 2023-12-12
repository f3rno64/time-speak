/* eslint-env mocha */

const chai = require('chai')
const chaiAlmost = require('chai-almost')
const { expect } = chai

chai.use(chaiAlmost())

const parse = require('../lib/parse')

const getMilliseconds = (value) => value
const getMinutesMS = (value) => value * 60 * 1000
const getSecondsMS = (value) => value * 1000
const getHoursMS = (value) => value * 60 * 60 * 1000
const getDaysMS = (value) => value * 24 * 60 * 60 * 1000
const getWeeksMS = (value) => value * 7 * 24 * 60 * 60 * 1000
const getMonthsMS = (value) => value * 30 * 24 * 60 * 60 * 1000
const getYearsMS = (value) => value * 365 * 24 * 60 * 60 * 1000
const getDecadesMS = (value) => value * 10 * 365 * 24 * 60 * 60 * 1000
const getCenturiesMS = (value) => value * 100 * 365 * 24 * 60 * 60 * 1000

const TEST_CASES = {
  '5 milliseconds': getMilliseconds(5),
  '10 minutes and 3 hours': getMinutesMS(10) + getHoursMS(3),
  '24 seconds and 5 milliseconds': getSecondsMS(24) + getMilliseconds(5),
  '5 weeks': getWeeksMS(5),
  '2 days': getDaysMS(2),
  '2 days and 3 months': getDaysMS(2) + getMonthsMS(3),
  '2 days, 3 months and 4 years': getDaysMS(2) + getMonthsMS(3) + getYearsMS(4),
  '2 days, 3 months, 4 years and 5 centuries':
    getDaysMS(2) + getMonthsMS(3) + getYearsMS(4) + getCenturiesMS(5),
  '2 days, 3 months, 4 years, 5 centuries and 6 decades':
    getDaysMS(2) +
    getMonthsMS(3) +
    getYearsMS(4) +
    getCenturiesMS(5) +
    getDecadesMS(6)
}

describe('parse', () => {
  Object.keys(TEST_CASES).forEach((input) => {
    it(`parses ${input} to ${TEST_CASES[input]}ms`, () => {
      expect(parse(input)).to.equal(TEST_CASES[input])
    })
  })

  Object.keys(TEST_CASES).forEach((input) => {
    it(`parses ${input} to the future date: ${new Date(
      TEST_CASES[input]
    ).toLocaleString()}`, () => {
      expect(+parse(`in ${input}`)).to.be.almost(
        +new Date(Date.now() + TEST_CASES[input]),
        100
      )
    })
  })

  Object.keys(TEST_CASES).forEach((input) => {
    it(`parses ${input} to the past date: ${new Date(
      TEST_CASES[input]
    ).toLocaleString()}`, () => {
      expect(+parse(`${input} ago`)).to.be.almost(
        +new Date(Date.now() - TEST_CASES[input]),
        100
      )
    })
  })

  it('parses ISO date strings', () => {
    const date = new Date()
    const parsedDate = parse(date.toISOString())

    expect(+parsedDate).to.be.almost(+date, 100)
  })

  it('parses YYYY, YYYY-MM, YYYY-MM-DD, etc', () => {
    const inputA = '2022'
    const dateA = new Date(Date.parse(inputA))

    const inputB = '2022-01'
    const dateB = new Date(Date.parse(inputB))

    const inputC = '2022-01-01'
    const dateC = new Date(Date.parse(inputC))

    expect(+parse(inputA)).to.be.almost(+dateA, 100)
    expect(+parse(inputB)).to.be.almost(+dateB, 100)
    expect(+parse(inputC)).to.be.almost(+dateC, 100)
  })

  it('parses "a *"', () => {
    const inputA = 'a month'
    const durationA = 30 * 24 * 60 * 60 * 1000

    const inputB = 'a month and a day'
    const durationB = 30 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000

    expect(+parse(inputA)).to.equal(durationA)
    expect(+parse(inputB)).to.equal(durationB)
  })
})
