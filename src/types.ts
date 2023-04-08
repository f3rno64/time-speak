/**
 * Units of time
 */
export enum TimeUnit {
  Millisecond = 'MILLISECOND',
  Second = 'SECOND',
  Minute = 'MINUTE',
  Hour = 'HOUR',
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR'
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
