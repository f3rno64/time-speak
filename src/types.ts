/**
 * A mapping of time units to their millisecond values.
 */
enum TimeUnit {
  Millisecond = 1,
  Second = 1000,
  Minute = 60 * 1000,
  Hour = 60 * 60 * 1000,
  Day = 24 * 60 * 60 * 1000,
  Week = 7 * 24 * 60 * 60 * 1000,
  Month = 30 * 24 * 60 * 60 * 1000,
  Year = 365 * 24 * 60 * 60 * 1000,
  Decade = 10 * 365 * 24 * 60 * 60 * 1000,
  Century = 100 * 365 * 24 * 60 * 60 * 1000
}

/**
 * A mapping of plural time units to their singular counterparts.
 */
enum TimeUnitPlural {
  Milliseconds = TimeUnit.Millisecond,
  Seconds = TimeUnit.Second,
  Minutes = TimeUnit.Minute,
  Hours = TimeUnit.Hour,
  Days = TimeUnit.Day,
  Weeks = TimeUnit.Week,
  Months = TimeUnit.Month,
  Years = TimeUnit.Year,
  Decades = TimeUnit.Decade,
  Centuries = TimeUnit.Century
}

export { TimeUnit, TimeUnitPlural }
