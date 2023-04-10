import mtsMillisecond from './millisecond'

/**
 * Get seconds as an mts value
 */
const mtsSecond = (n = 1): number => n * mtsMillisecond(1000)

export default mtsSecond
