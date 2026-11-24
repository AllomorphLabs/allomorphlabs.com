/** A share (0-1) as a percentage, with one decimal place by default. */
export function pct(x, digits = 1) {
  return `${(100 * x).toFixed(digits)}%`
}

/** Sample standard deviation. */
export function sd(xs) {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1))
}

export const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length
