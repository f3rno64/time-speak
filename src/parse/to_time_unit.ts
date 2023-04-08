import { TU_REGEX_STRINGS, TIME_UNITS } from '../const'
import { ParsedTimeUnitData, TimeUnit } from '../types'

const parseToTimeUnit = (input: string): ParsedTimeUnitData | null => {
  const result = TIME_UNITS.map((timeUnit: TimeUnit) => (
    [timeUnit, new RegExp(TU_REGEX_STRINGS[timeUnit], 'g').exec(input)]
  )).find(([, r]) => r !== null)

  if (typeof result === 'undefined') {
    return null
  }

  const [timeUnit, inputData] = result
  const [,
    inputDataIn,, inputDataValue,, inputDataUnit,, inputDataAgo
  ] = inputData

  return {
    inputDataUnit,
    inputDataValue,
    timeUnit: timeUnit as TimeUnit,
    inputDataAgo: !!inputDataAgo,
    inputDataIn: !!inputDataIn
  }
}

export default parseToTimeUnit
