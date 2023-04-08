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
