import mtsDay from './day'

/**
 * Get years as an mts value
 */
const mtsYear = (n = 1): number => n * mtsDay(365)

export default mtsYear
