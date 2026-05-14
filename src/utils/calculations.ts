interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
}

export const calculateCompoundInterest = (
  principal: string | number,
  years: string | number,
  rate: string | number
): CompoundInterestResult => {
  const p = parseFloat(principal.toString())
  const t = parseFloat(years.toString())
  const r = parseFloat(rate.toString()) / 100

  const finalAmount = p * Math.pow(1 + r, t)
  const interestEarned = finalAmount - p

  return {
    finalAmount,
    interestEarned
  }
}
