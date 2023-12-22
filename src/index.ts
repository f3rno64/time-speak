import parse from './parse'
import { InvalidInputError } from './errors'

/**
 * A tiny utility library _with no dependencies_ that parses natural language
 * dates, times, and intervals to either a `Date` instance or a numerical value
 * in milliseconds.
 *
 * @packageDocumentation
 */

export { InvalidInputError, parse }
