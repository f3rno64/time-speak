import { NUMBER_WORDS } from '../const'
import { NumberWord } from '../types'

/**
 * @private
 */
const isNumberWord = (v: string): boolean => (
  NUMBER_WORDS.includes(v as NumberWord)
)

export default isNumberWord
