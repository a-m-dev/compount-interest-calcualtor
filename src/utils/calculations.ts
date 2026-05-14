export interface YearlyData {
  year: number
  principal: number
  contributions: number
  interest: number
  total: number
}

export interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
  totalContributions: number
  yearlyBreakdown: YearlyData[]
}

const calculateYearlyBreakdown = (
  principal: number,
  years: number,
  monthlyRate: number,
  monthlyContribution: number
): YearlyData[] => {
  const yearlyBreakdown: YearlyData[] = []

  // Loop through each year and calculate the growth at that point in time
  for (let year = 1; year <= years; year++) {
    // Convert year to months for calculation (e.g., year 2 = 24 months)
    const yearMonths = year * 12

    // Calculate Future Value of the initial principal at this year
    // Formula: FV = P(1 + r)^n
    const yearlyPrincipalFV = principal * Math.pow(1 + monthlyRate, yearMonths)

    // Calculate Future Value of monthly contributions accumulated up to this year
    // Uses the annuity formula: FV = PMT × [((1 + r)^n - 1) / r]
    let yearlyContributionsFV = 0
    if (monthlyContribution > 0) {
      yearlyContributionsFV =
        monthlyContribution * (Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate
    }

    // Total amount at this year = principal growth + contributions growth
    const yearlyTotal = yearlyPrincipalFV + yearlyContributionsFV

    // Total amount you've contributed so far (principal + monthly payments × months)
    const yearlyContributions = principal + monthlyContribution * year * 12

    // Interest earned = total value minus total amount you put in
    // Using Math.max to ensure we don't show negative interest
    const yearlyInterest = yearlyTotal - yearlyContributions

    // Store this year's data for the chart
    yearlyBreakdown.push({
      year,
      principal,
      contributions: yearlyContributions - principal,  // Only the monthly contributions, not including principal
      interest: Math.max(0, yearlyInterest),
      total: yearlyTotal
    })
  }

  return yearlyBreakdown
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

  // Calculate year-by-year breakdown
  const yearlyBreakdown = calculateYearlyBreakdown(p, t, monthlyRate, m)

  return {
    finalAmount,
    interestEarned,
    totalContributions,
    yearlyBreakdown
  }
}
