import { TimeUnit } from './types'

export const TIME_UNITS = [
  TimeUnit.Millisecond,
  TimeUnit.Second,
  TimeUnit.Minute,
  TimeUnit.Hour,
  TimeUnit.Day,
  TimeUnit.Week,
  TimeUnit.Month,
  TimeUnit.Year
]

export const TIME_UNIT_DURATIONS: any = {
  [TimeUnit.Millisecond]: 1,
  [TimeUnit.Second]: 1000,
  [TimeUnit.Minute]: 60 * 1000,
  [TimeUnit.Hour]: 60 * 60 * 1000,
  [TimeUnit.Day]: 24 * 60 * 60 * 1000,
  [TimeUnit.Week]: 7 * 24 * 60 * 60 * 1000,
  [TimeUnit.Month]: 30 * 24 * 60 * 60 * 1000,
  [TimeUnit.Year]: 365 * 24 * 60 * 60 * 1000
}

export const REGEX_STRINGS: any = {
  [TimeUnit.Millisecond]: '(milliseconds?|ms)',
  [TimeUnit.Second]: '(seconds?|sec|s)',
  [TimeUnit.Minute]: '(minutes?|min)',
  [TimeUnit.Hour]: '(hours?|h)',
  [TimeUnit.Day]: '(days?|d)',
  [TimeUnit.Week]: '(weeks?|w|wk)',
  [TimeUnit.Month]: '(months?|mon)',
  [TimeUnit.Year]: '(years?|y|yr)'
}

export const TU_REGEX_STRINGS: any = {}

TIME_UNITS.forEach((timeUnit: TimeUnit) => {
  const tuRegexString = REGEX_STRINGS[timeUnit]

  TU_REGEX_STRINGS[timeUnit] = (
    `(in)?(\\s*)?(\\d*)(\\s*)?${tuRegexString}(\\s*)?(ago)?$`
  )
})
