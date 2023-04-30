class ParseError extends Error {
  _input: string

  constructor (input: string, stack?: string) {
    super(`Parse error for: ${input}`)

    // eslint-why obv
    /* eslint-disable-next-line prefer-destructuring */
    this.name = 'ParseError'
    this._input = input

    if (stack && stack.length > 0) {
      this.stack = stack
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  get input () {
    return this._input
  }
}

export default ParseError
