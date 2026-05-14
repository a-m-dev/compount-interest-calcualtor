export interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
  totalContributions: number
}

export const calculateCompoundInterest = (
  principal: string | number,
  years: string | number,
  rate: string | number,
  monthlyContribution: string | number = 0
): CompoundInterestResult => {
  // Parse inputs and convert to numbers
  const p = parseFloat(principal.toString())
  const t = parseFloat(years.toString())
  const r = parseFloat(rate.toString()) / 100 // Convert percentage to decimal
  const m = parseFloat(monthlyContribution.toString())

  // Convert annual values to monthly for compounding
  const monthlyRate = r / 12 // Divide annual rate by 12 months
  const months = t * 12 // Total number of months

  // Calculate Future Value of initial principal
  // Formula: FV = P(1 + r)^n where r is monthly rate, n is months
  const principalFV = p * Math.pow(1 + monthlyRate, months)

  // Calculate Future Value of monthly contributions (annuity formula)
  // Formula: FV = PMT × [((1 + r)^n - 1) / r]
  // This accounts for each contribution earning interest over remaining months
  let contributionsFV = 0
  if (m > 0) {
    contributionsFV = m * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
  }

  // Total final amount = principal growth + contributions growth
  const finalAmount = principalFV + contributionsFV

  // Total contributions = initial principal + all monthly payments
  const totalContributions = p + m * months

  // Interest earned = final amount minus total amount you put in
  const interestEarned = finalAmount - totalContributions

  return {
    finalAmount,
    interestEarned,
    totalContributions
  }
}
