/**
 * Error thrown when the input cannot be parsed to a date or duration.
 */
class InvalidInputError extends Error {
  input: string
  detail: string

  constructor(input: string, detail?: string) {
    const message =
      typeof detail === 'undefined'
        ? `Invalid input: ${input}`
        : `Invalid input (${detail}): ${input}`

    super(message)

    this.input = input
    this.detail = detail ?? ''
    this.message = message
    this.name = 'InvalidInputError'

    Object.setPrototypeOf(this, InvalidInputError.prototype)
  }
}

export default InvalidInputError
