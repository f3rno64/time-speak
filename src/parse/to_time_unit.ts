import { TU_REGEX_STRINGS, TIME_UNITS } from '../const'
import { TimeUnit } from '../types'

const parseToTimeUnit = (input: string): any => {
  const result = TIME_UNITS.map((timeUnit: TimeUnit) => (
    [timeUnit, new RegExp(TU_REGEX_STRINGS[timeUnit], 'g').exec(input)]
  )).find(([, r]) => r !== null)

  if (typeof result === 'undefined') {
    return result
  }

  const [timeUnit, inputData] = result
  const [,
    inputDataIn,, inputDataValue,, inputDataUnit,, inputDataAgo
  ] = inputData

  return {
    timeUnit,
    inputDataIn,
    inputDataValue,
    inputDataUnit,
    inputDataAgo
  }
}

export default parseToTimeUnit
