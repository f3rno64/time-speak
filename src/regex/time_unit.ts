import { TIME_UNITS, NUMBER_WORDS } from '../const'

const NWs = NUMBER_WORDS.join('|')
const TUs = TIME_UNITS.join('|')

/**
 * @private
 */
const PARSE_TIME_UNIT_REGEX = (
  `^(in)?(every)?\\s*(a|\\d+|${NWs})?(\\s+)?(${TUs})`
)

export default PARSE_TIME_UNIT_REGEX
