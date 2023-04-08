import _reverse from 'lodash/reverse'

import { TIME_UNITS, TU_DURATIONS } from './const'
import { TimeUnit, DurationToUnitsOptions } from './types'

class Duration {
  value: number

  constructor (value: number) {
    this.value = value
  }

  getValue (): number {
    return this.value
  }

  toMilliseconds (): number {
    return this.value
  }

  toSeconds(): number {
    return this.value / 1000
  }

  toMinutes(): number {
    return this.value / (60 * 1000)
  }

  toHours(): number {
    return this.value / (60 * 60 * 1000)
  }

  toDays(): number {
    return this.value / (24 * 60 * 60 * 1000)
  }

  toWeeks(): number {
    return this.value / (7 * 24 * 60 * 60 * 1000)
  }

  toMonths(): number {
    return this.value / (30 * 24 * 60 * 60 * 1000)
  }

  toYears(): number {
    return this.value / (365 * 24 * 60 * 60 * 1000)
  }

  toUnits(options: DurationToUnitsOptions = {}) {
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

  toString(): string {
    const units = this.toUnits({ floor: true })

    let remainingValue = this.value
    let output = ''

    _reverse([...TIME_UNITS]).forEach((tu) => {
      const v = units[tu]

      if (v === 0) {
        return
      }

      const tuDuration = TU_DURATIONS[tu]
      const c = Math.floor(remainingValue / tuDuration)

      if (c > 0) {
        output += `${c} ${tu.toLowerCase()}${c > 1 ? 's' : ''} `
        remainingValue = remainingValue % tuDuration
      }
    })

    return output.trim()
  }

  fromDate(d: Date | number): number {
    return +d + this.value
  }

  fromNow(): number {
    return this.fromDate(Date.now())
  }

  toDate(): Date {
    return new Date(this.fromNow())
  }
}

export default Duration
