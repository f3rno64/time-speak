import parseSeperator from './seperator'
import parseAMPMValue from './am_pm_value'
import parseTimeUnitValue from './time_unit_value'

const PARSERS = [
  parseSeperator,
  parseAMPMValue,
  parseTimeUnitValue
]

export {
  PARSERS,

  parseAMPMValue,
  parseSeperator,
  parseTimeUnitValue
}
