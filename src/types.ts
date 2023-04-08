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

export type ValueMap = Record<string, number>
export type RegexStringMap = Record<TimeUnit, string>

export interface ParsedTimeUnitData {
  timeUnit: TimeUnit
  inputDataIn: boolean
  inputDataValue: string | number | null
  inputDataUnit: string | null
  inputDataAgo: boolean
}

// TODO: Refactor
export interface DurationToUnitsOptions {
  floor?: boolean
}

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
