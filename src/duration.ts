import _reverse from 'lodash/reverse'

import { TIME_UNITS, TIME_UNIT_DURATIONS } from './const'
import { TimeUnit, DurationToUnitsOptions, DurationInUnits } from './types'

/**
 * A class representing a duration, initialized in milliseconds. Provides
 * utility methods to convert to other units (hours, minutes, etc).
 */
class Duration {
  /**
   * @private
   */
  value: number

  /**
   * Create a new duration from a millisecond value.
   *
   * @param {number} value - value in milliseconds
   */
  constructor (value: number) {
    this.value = value
  }

  /**
   * Get millisecond value.
   *
   * @returns {number} value
   */
  getValue (): number {
    return this.value
  }

  /**
   * Convert to milliseconds.
   *
   * @returns {number} inMilliseconds
   */
  toMilliseconds (): number {
    return this.value
  }

  /**
   * Convert to seconds.
   *
   * @returns {number} inSeconds
   */
  toSeconds(): number {
    return this.value / 1000
  }

  /**
   * Convert to minutes.
   *
   * @returns {number} inMinutes
   */
  toMinutes(): number {
    return this.value / (60 * 1000)
  }

  /**
   * Convert to hours.
   *
   * @returns {number} inHours
   */
  toHours(): number {
    return this.value / (60 * 60 * 1000)
  }

  /**
   * Convert to days.
   *
   * @returns {number} inDays
   */
  toDays(): number {
    return this.value / (24 * 60 * 60 * 1000)
  }

  /**
   * Convert to weeks.
   *
   * @returns {number} inWeeks
   */
  toWeeks(): number {
    return this.value / (7 * 24 * 60 * 60 * 1000)
  }

  /**
   * Convert to months.
   *
   * @returns {number} inMonths
   */
  toMonths(): number {
    return this.value / (30 * 24 * 60 * 60 * 1000)
  }

  /**
   * Convert to years.
   *
   * @returns {number} inYears
   */
  toYears(): number {
    return this.value / (365 * 24 * 60 * 60 * 1000)
  }

  /**
   * Get the duration represented in each time unit (day, week, etc).
   *
   *
   * @param {DurationToUnitsOptions} options? - optional
   * @returns {DurationInUnits} unitValues
   */
  toUnits(options: DurationToUnitsOptions = {}): DurationInUnits {
    const { floor } = options
    const units = {
      [TimeUnit.Millisecond]: this.toMilliseconds(),
      [TimeUnit.Second]: this.toSeconds(),
      [TimeUnit.Minute]: this.toMinutes(),
      [TimeUnit.Hour]: this.toHours(),
      [TimeUnit.Day]: this.toDays(),
      [TimeUnit.Week]: this.toWeeks(),
      [TimeUnit.Month]: this.toMonths(),
      [TimeUnit.Year]: this.toYears(),
    }

    if (floor) {
      TIME_UNITS.forEach(((u: string) => {
        // eslint-disable-next-line
        // @ts-ignore
        units[u] = Math.floor(units[u])
      }))
    }

    return units
  }

  /**
*  * Convert to human-readable string. Each unit is represented in order from
   * largest to smallest. i.e. 368 days would result in '1 year 3 days'.
   *
   * @returns {string} result
   */
  toString(): string {
    const units = this.toUnits({ floor: true })

    let remainingValue = this.value
    let output = ''

    _reverse([...TIME_UNITS]).forEach((tu) => {
      const v = units[tu]

      if (v === 0) {
        return
      }

      const tuDuration = TIME_UNIT_DURATIONS[tu]
      const c = Math.floor(remainingValue / tuDuration)

      if (c > 0) {
        output += `${c} ${tu.toLowerCase()}${c > 1 ? 's' : ''} `
        remainingValue = remainingValue % tuDuration
      }
    })

    return output.trim()
  }

  /**
   * Get the value in milliseconds after the provided date.
   *
   * @param {Date|number} d - input
   * @returns {number} value
   */
  fromDate(d: Date | number): number {
    return +d + this.value
  }

  /**
   * Get the value in milliseconds after the current time.
   *
   * @returns {number} value
   */
  fromNow(): number {
    return this.fromDate(Date.now())
  }


  /**
   * Get a date set to the current time plus the duration value.
   *
   * @returns {Date} value
   */
  toDate(): Date {
    return new Date(this.fromNow())
  }
}

export default Duration
