import { TimeUnit } from './types'

export const TIME_UNITS = [
  TimeUnit.Day,
  TimeUnit.Week,
  TimeUnit.Month,
  TimeUnit.Year
]

export const TU_DURATIONS: any = {
  [TimeUnit.Day]: 24 * 60 * 60 * 1000,
  [TimeUnit.Week]: 7 * 24 * 60 * 60 * 1000,
  [TimeUnit.Month]: 30 * 24 * 60 * 60 * 1000,
  [TimeUnit.Year]: 365 * 24 * 60 * 60 * 1000
}

export const REGEX_STRINGS: any = {
  [TimeUnit.Day]: '(days?|d)',
  [TimeUnit.Week]: '(weeks?|w|wk)',
  [TimeUnit.Month]: '(months?|m|mon)',
  [TimeUnit.Year]: '(years?|y|yr)'
}

export const TU_REGEX_STRINGS: any = {}

TIME_UNITS.forEach((timeUnit: TimeUnit) => {
  const tuRegexString = REGEX_STRINGS[timeUnit]

  TU_REGEX_STRINGS[timeUnit] = (
    `(in)?(\\s*)?(\\d*)(\\s*)?${tuRegexString}(\\s*)?(ago)?$`
  )
})
