/**
 * Error thrown when the input cannot be parsed to a date or duration. It
 * optionally accepts a `detail` parameter that can be used to provide more
 * information about why parsing failed.
 *
 * @public
 */
class InvalidInputError extends Error {
  /**
   * The input that could not be parsed.
   */
  private _input: string

  /**
   * An optional detailed description of the reason why parsing failed.
   */
  private _detail: string

  /**
   * Create a new `InvalidInputError` instance with the given `input`,
   * optionally providing a `detail` parameter to describe why parsing failed.
   * The `detail` parameter will be included in the error message if provided.
   *
   * @param input - The input that could not be parsed
   * @param detail - A more detailed description of the error
   */
  constructor(input: string, detail?: string) {
    const message =
      typeof detail === 'undefined'
        ? `Invalid input: ${input}`
        : `Invalid input (${detail}): ${input}`

    super(message)

    this._input = input
    this._detail = detail ?? ''

    this.message = message
    this.name = 'InvalidInputError'

    Object.setPrototypeOf(this, InvalidInputError.prototype)
  }

  /**
   * Get the detail explaining why parsing failed. If no detail was provided,
   * it will return an empty string.
   *
   * @returns The detail string.
   */
  public get detail(): string {
    return this._detail
  }

  /**
   * Get the original input that could not be parsed.
   *
   * @returns The input string.
   */
  public get input(): string {
    return this._input
  }
}

export default InvalidInputError
