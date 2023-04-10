import parse from './parse'
import { TimeUnit } from './types'
import { ParseError } from './errors'
import { TIME_UNITS, TIME_UNIT_DURATIONS } from './const'

export default parse
export {
  parse,
  TimeUnit,
  ParseError,
  TIME_UNITS,
  TIME_UNIT_DURATIONS
}
