/**
 * Utility to run a parser method and add the result to the current result.
 * Returns the value if there is no current result
 */
const runParser = (
  currentResult: number,
  input: string,
  parser: Function
): number => {
  const v = parser(input)

  if (Number.isNaN(+v)) {
    return NaN
  }

  return Number.isNaN(currentResult)
    ? v
    : currentResult + v
}

export default runParser
