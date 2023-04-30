import { PARSE_SEPERATOR_REGEX } from '../../regex'

/**
 * Indicates if the provided input is a seperator.
 *
 * @private
 */
const parseSeperator = (input: string): number => {
  const res = !!new RegExp(PARSE_SEPERATOR_REGEX).exec(input)

  return res
    ? 0
    : NaN
}

export default parseSeperator
