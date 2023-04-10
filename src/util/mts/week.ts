import mtsDay from './day'

/**
 * Get weeks as an mts value
 */
const mtsWeek = (n = 1): number => n * mtsDay(7)

export default mtsWeek
