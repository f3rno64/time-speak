import _isFinite from 'lodash/isFinite'
import _isString from 'lodash/isString'

import parse from './parse'

// TODO: Docs
class TimeInterval {
  value: number

  /**
   * @private
   */
  present: number

  /**
   * @private
   */
  input: string | number

  constructor (value: string | number, present: number = Date.now()) {
    this.set(value)
    this.setPresent(present)
  }

  setPresent (v: string | number): void {
    this.present = _isString(v)
      ? parse(v)
      : _isFinite(v)
        ? v
        : Date.now()
  }

  prev (n = 1): number {
    if (n <= 0) {
      throw new Error(`Value is less than or equal to zero: ${n}`)
    }

    return this.present - (this.value * n)
  }

  next (n = 1): number {
    if (n <= 0) {
      throw new Error(`Value is less than or equal to zero: ${n}`)
    }

    return this.present + (this.value * n)
  }

  set (v: string | number): void {
    this.input = v
    this.value = _isString(v)
      ? parse(v)
      : v
  }

  getValue (): number {
    return this.value
  }

  /**
   * @TODO: Refactor
   */
  toString (): string {
    return _isFinite(+this.input)
      ? `every ${this.input}ms`
      : /^every\s+/.test(this.input as string)
        ? this.input as string
        : `every ${this.input}`
  }
}

export default TimeInterval