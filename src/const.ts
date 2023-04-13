import {
  DurationValueMap,
  RegexStringMap,
  Weekday,
  NumberWord,
  ValueMap,
  TimeUnit
} from './types'

export const WEEKDAYS = [
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
  Weekday.Sunday
]

export const WEEKDAY_VALUES = {
  [Weekday.Monday]: 1,
  [Weekday.Tuesday]: 2,
  [Weekday.Wednesday]: 3,
  [Weekday.Thursday]: 4,
  [Weekday.Friday]: 5,
  [Weekday.Saturday]: 6,
  [Weekday.Sunday]: 7
}

export const NUMBER_WORDS = [
  NumberWord.One,
  NumberWord.Two,
  NumberWord.Three,
  NumberWord.Four,
  NumberWord.Five,
  NumberWord.Six,
  NumberWord.Seven,
  NumberWord.Eight,
  NumberWord.Nine,
  NumberWord.Ten,
]

export const NUMBER_WORD_VALUES: ValueMap = {
  [NumberWord.One]: 1,
  [NumberWord.Two]: 2,
  [NumberWord.Three]: 3,
  [NumberWord.Four]: 4,
  [NumberWord.Five]: 5,
  [NumberWord.Six]: 6,
  [NumberWord.Seven]: 7,
  [NumberWord.Eight]: 8,
  [NumberWord.Nine]: 9,
  [NumberWord.Ten]: 10
}

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

export const TIME_UNIT_DURATIONS: DurationValueMap = {
  [TimeUnit.Millisecond]: 1,
  [TimeUnit.Second]: 1000,
  [TimeUnit.Minute]: 60 * 1000,
  [TimeUnit.Hour]: 60 * 60 * 1000,
  [TimeUnit.Day]: 24 * 60 * 60 * 1000,
  [TimeUnit.Week]: 7 * 24 * 60 * 60 * 1000,
  [TimeUnit.Month]: 30 * 24 * 60 * 60 * 1000,
  [TimeUnit.Year]: 365 * 24 * 60 * 60 * 1000
}

export const REGEX_STRINGS: RegexStringMap = {
  [TimeUnit.Millisecond]: '(milliseconds?)',
  [TimeUnit.Second]: '(seconds?)',
  [TimeUnit.Minute]: '(minutes?)',
  [TimeUnit.Hour]: '(hours?)',
  [TimeUnit.Day]: '(days?)',
  [TimeUnit.Week]: '(weeks?)',
  [TimeUnit.Month]: '(months?)',
  [TimeUnit.Year]: '(years?)'
}

// eslint-disable-next-line
// @ts-ignore
export const TU_REGEX_STRINGS: RegexStringMap = {}

TIME_UNITS.forEach((timeUnit: TimeUnit) => {
  const tuRegexString = REGEX_STRINGS[timeUnit]

  TU_REGEX_STRINGS[timeUnit] = (
    `(in)?(\\s*)?(\\w*)?(\\s*)?${tuRegexString}(\\s*)?(ago)?`
  )
})
