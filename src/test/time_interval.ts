/* eslint-env mocha */

import { expect, assert } from 'chai'

import TimeInterval from '../time_interval'
import { mtsDay, mtsYear } from '../util/mts'

describe('TimeInterval', () => {
  it('constructor: sets value and present in constructor', () => {
    const ti = new TimeInterval('1 day')

    expect(ti.value).to.equal(mtsDay())
    expect(Date.now() - ti.present).to.be.lessThan(1000)
  })

  it('constructor: uses present if provided', () => {
    const ti = new TimeInterval('1 day', 0)

    expect(ti.value).to.equal(mtsDay())
    expect(ti.present).to.equal(0)
  })

  it('prev: returns the n-th previous timestamp', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)

    expect(ti.prev(2)).to.equal(n - mtsDay(2))
  })

  it('prev: returns the previous occurence if n not provided', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)

    expect(ti.prev()).to.equal(n - mtsDay())
  })

  it('prev: throws an error if given input <= 0', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)
    let thrown = false

    try {
      ti.prev(-2)
    } catch (e: any) {
      thrown = true
    }

    assert.isTrue(thrown, 'No error was thrown')
  })

  it('next: returns the n-th next timestamp', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)

    expect(ti.next(2)).to.equal(n + mtsDay(2))
  })

  it('next: returns the next occurence if n not provided', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)

    expect(ti.next() - (n + mtsDay(2))).to.be.lessThan(1000)
  })

  it('next: throws an error if given input <= 0', () => {
    const n = Date.now()
    const ti = new TimeInterval('2 days', n)
    let thrown = false

    try {
      ti.next(-2)
    } catch (e: any) {
      thrown = true
    }

    assert.isTrue(thrown, 'No error was thrown')
  })

  it('set: updates internal input', () => {
    const ti = new TimeInterval('2 days')
    ti.set(mtsDay(3))

    expect(ti.value).to.equal(mtsDay(3))
  })

  it('set: parses value if given a string', () => {
    const ti = new TimeInterval('2 days')

    ti.set('2 days')

    expect(ti.value).to.equal(mtsDay(2))
  })

  it('set: updates internal input value', () => {
    const ti = new TimeInterval(mtsDay(3))

    ti.set('2 days')

    expect(ti.input).to.equal('2 days')
  })

  it('toString: returns input given for current value', () => {
    const ti = new TimeInterval('4 months')

    expect(ti.toString()).to.equal('every 4 months')
  })

  it('getValue: returns interval duration in ms', () => {
    const ti = new TimeInterval('2 years and a day')

    expect(ti.getValue()).to.equal(mtsYear(2) + mtsDay())
  })
})