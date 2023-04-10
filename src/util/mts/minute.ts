import mtsSecond from './second'

/**
 * Get minutes as an mts value
 */
const mtsMinute = (n = 1): number => n * mtsSecond(60)

export default mtsMinute
