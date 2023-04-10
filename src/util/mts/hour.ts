import mtsMinute from './minute'

/**
 * Get hours as an mts value
 */
const mtsHour = (n = 1): number => n * mtsMinute(60)

export default mtsHour
