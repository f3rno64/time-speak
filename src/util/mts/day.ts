import mtsHour from './hour'

/**
 * Get days as an mts value
 */
const mtsDay = (n = 1): number => n * mtsHour(24)

export default mtsDay
