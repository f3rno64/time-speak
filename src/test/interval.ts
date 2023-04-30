/* eslint-env mocha */

import { expect, assert } from 'chai'

import Interval from '../interval'
import { mtsDay, mtsYear } from '../util/mts'

describe('Interval', () => {
  it('constructor: sets value and present in constructor', () => {
    const ti = new Interval('1 day')

    expect(ti.value).to.equal(mtsDay())
    expect(Date.now() - ti.present).to.be.lessThan(1000)
  })

  it('constructor: uses present if provided', () => {
    const ti = new Interval('1 day', 0)

    expect(ti.value).to.equal(mtsDay())
    expect(ti.present).to.equal(0)
  })

  it('prev: returns the n-th previous timestamp', () => {
    const n = Date.now()
    const ti = new Interval('2 days', n)

    expect(ti.prev(2) - (n + mtsDay(4))).to.be.lessThan(1000)
  })

  it('prev: returns the previous occurence if n not provided', () => {
    const n = Date.now()
    const ti = new Interval('2 days', n)

    expect(ti.prev() - (n + mtsDay(2))).to.be.lessThan(1000)
  })

  it('prev: throws an error if given input <= 0', () => {
    const n = Date.now()
    const ti = new Interval('2 days', n)
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
    const ti = new Interval('2 days', n)

    expect(ti.next(2) - (n + mtsDay(4))).to.be.lessThan(1000)
  })

  it('next: returns the next occurence if n not provided', () => {
    const n = Date.now()
    const ti = new Interval('2 days', n)

    expect(ti.next() - (n + mtsDay(2))).to.be.lessThan(1000)
  })

  it('next: throws an error if given input <= 0', () => {
    const n = Date.now()
    const ti = new Interval('2 days', n)
    let thrown = false

    try {
      ti.next(-2)
    } catch (e: any) {
      thrown = true
    }

    assert.isTrue(thrown, 'No error was thrown')
  })

  it('setValue: updates internal input', () => {
    const ti = new Interval('2 days')
    ti.setValue(mtsDay(3))

    expect(ti.value).to.equal(mtsDay(3))
  })

  it('setValue: parses value if given a string', () => {
    const ti = new Interval('2 days')

    ti.setValue('2 days')

    expect(ti.value).to.equal(mtsDay(2))
  })

  it('setValue: updates internal input value', () => {
    const ti = new Interval(mtsDay(3))

    ti.setValue('2 days')

    expect(ti.input).to.equal('2 days')
  })

  it('toString: returns input given for current value', () => {
    const ti = new Interval('4 months')

    expect(ti.toString()).to.equal('every 4 months')
  })

  it('getValue: returns interval duration in ms', () => {
    const ti = new Interval('2 years and a day')

    expect(ti.getValue()).to.equal(mtsYear(2) + mtsDay())
  })
})
