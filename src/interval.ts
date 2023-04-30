import _isFinite from 'lodash/isFinite'
import _isString from 'lodash/isString'

import parse from './parse'

/**
 * Utility class representing an interval of time that repeats into the past
 * and future. Provides methods for getting the next and previous n-th
 * iterations.
 *
 * @example
 * const ti = new Interval('1 day')
 *
 * ti.next() // => 24 hours from now
 * ti.prev() // => 24 hours ago
 *
 * console.log(Date.now() + ti.getValue())
 *
 * ti.setValue('3 years and a day')
 *
 * ti.next() // => 3 years and a day from now
 */
class Interval {
  /**
   * @private
   */
  value: number

  /**
   * @private
   */
  present: number

  /**
   * @private
   */
  input: string | number

  /**
   * Initialize a new Interval with the provided value and present
   * timestamps. Present defaults to the current time.
   */
  constructor (value: string | number, present: number = Date.now()) {
    this.setValue(value)
    this.setPresent(present)
  }

  /**
   * Update the present timestamp, used to resolve the next and previous
   * interval values.
   */
  setPresent (v: string | number): void {
    this.present = _isString(v)
      ? +parse(v)
      : _isFinite(v)
        ? v as number
        : Date.now()
  }

  /**
   * Get the n-th previous timestamp value. Throws an error if given a value
   * less than or equal to zero.
   */
  prev (n = 1): number {
    if (n <= 0) {
      throw new Error(`Value is less than or equal to zero: ${n}`)
    }

    return this.present - (this.value * n)
  }

  /**
   * Get the n-th next timestamp value. Throws an error if given a value less
   * than or equal to zero.
   */
  next (n = 1): number {
    if (n <= 0) {
      throw new Error(`Value is less than or equal to zero: ${n}`)
    }

    return this.present + (this.value * n)
  }

  /**
   * Update the Interval value. Can be called with strings to be parsed or
   * an explicit finite value.
   */
  setValue (v: string | number): void {
    this.input = v
    this.value = _isString(v)
      ? (parse(v) as Interval).valueOf()
      : v
  }

  /**
   * Read the interval length in ms.
   */
  getValue (): number {
    return this.value
  }

  /**
   * Get a human-readable string representation of the current value.
   */
  toString (): string {
    return _isFinite(+this.input)
      ? `every ${this.input}ms`
      : /^every\s+/.test(this.input as string)
        ? this.input as string
        : `every ${this.input}`
  }

  /**
   * Read the interval length in ms.
   */
  valueOf (): number {
    return this.getValue()
  }
}

export default Interval
