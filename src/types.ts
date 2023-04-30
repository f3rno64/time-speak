/**
 * Units of time
 */
export enum TimeUnit {
  Millisecond = 'millisecond',
  Second = 'second',
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

/**
 * Words representing numbers.
 */
export enum NumberWord {
  One = 'one',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
  Six = 'six',
  Seven = 'seven',
  Eight = 'eight',
  Nine = 'nine',
  Ten = 'ten'
}

/**
 * @private
 */
export type ValueMap = Record<string, number>

/**
 * @private
 */
export type DurationValueMap = Record<TimeUnit, number>

/**
 * @private
 */
export type RegexStringMap = Record<TimeUnit, string>

/**
 * @private
 */
export interface ParsedTimeUnitData {
  timeUnit: TimeUnit
  inputDataIn: boolean
  inputDataValue: string | number | null
  inputDataUnit: string | null
  inputDataAgo: boolean
}

/**
 * @TODO: Refactor
 *
 * @private
 */
export interface DurationToUnitsOptions {
  floor?: boolean
}

/**
 * @private
 */
export interface DurationInUnits {
  [TimeUnit.Millisecond]: number
  [TimeUnit.Second]: number
  [TimeUnit.Minute]: number
  [TimeUnit.Hour]: number
  [TimeUnit.Day]: number
  [TimeUnit.Week]: number
  [TimeUnit.Month]: number
  [TimeUnit.Year]: number
}
