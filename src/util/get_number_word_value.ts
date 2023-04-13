import { NUMBER_WORD_VALUES } from '../const'
import { NumberWord } from '../types'

/**
 * @private
 */
const getNumberWordValue = (v: NumberWord): number => {
  const res = NUMBER_WORD_VALUES[v]

  if (!Number.isFinite(res)) {
    throw new Error(`Not a number word: ${v}`)
  }

  return res
}

export default getNumberWordValue
