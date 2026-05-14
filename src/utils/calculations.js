export const calculateCompoundInterest = (principal, years, rate) => {
  const p = parseFloat(principal)
  const t = parseFloat(years)
  const r = parseFloat(rate) / 100

  const finalAmount = p * Math.pow(1 + r, t)
  const interestEarned = finalAmount - p

  return {
    finalAmount,
    interestEarned
  }
}
