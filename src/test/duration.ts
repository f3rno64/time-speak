/* eslint-env mocha */

import { expect } from 'chai'
import Duration from '../duration'

const value = 303 * 24 * 60 * 60 * 1000

describe('Duration class', () => {
  const d = new Duration(value)

  it('getValue() returns value', () => {
    expect(d.getValue()).to.equal(value)
  })

  it('toMilliseconds() returns value in milliseconds', () => {
    expect(d.toMilliseconds()).to.equal(value)
  })

  it('toSeconds() returns value in seconds', () => {
    expect(d.toSeconds()).to.equal(value / 1000)
  })

  it('toMinutes() returns value in minutes', () => {
    expect(d.toMinutes()).to.equal(value / (60 * 1000))
  })

  it('toHours() returns value in hours', () => {
    expect(d.toHours()).to.equal(value / (60 * 60 * 1000))
  })

  it('toDays() returns value in days', () => {
    expect(d.toDays()).to.equal(value / (24 * 60 * 60 * 1000))
  })

  it('toWeeks() returns value in weeks', () => {
    expect(d.toWeeks()).to.equal(value / (7 * 24 * 60 * 60 * 1000))
  })

  it('toMonths() returns value in months', () => {
    expect(d.toMonths()).to.equal(value / (30 * 24 * 60 * 60 * 1000))
  })

  it('toYears() returns value in years', () => {
    expect(d.toYears()).to.equal(value / (365 * 24 * 60 * 60 * 1000))
  })

  it('toString() returns string representation', () => {
    expect(new Duration(303 * 24 * 60 * 60 * 1000).toString()).to.equal('10 months 3 days')
    expect(new Duration((4 * 24 * 60 * 60 * 1000) + (30 * 60 * 1000)).toString()).to.equal('4 days 30 minutes')
    expect(new Duration((4 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000) + (30 * 60 * 1000)).toString()).to.equal('4 days 2 hours 30 minutes')
  })
})
