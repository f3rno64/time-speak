// NOTE: ' s' is parsed as a seperator as time units are parsed without the 's'
// suffix, leaving it behind.
const PARSE_SEPERATOR_REGEX = '^\\s*(and|s)\\s+$'

export default PARSE_SEPERATOR_REGEX
