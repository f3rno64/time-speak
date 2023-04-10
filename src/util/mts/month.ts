import mtsDay from './day'

/**
 * Get months as an mts value
 */
const mtsMonth = (n = 1): number => n * mtsDay(30)

export default mtsMonth
