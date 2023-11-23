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
})
