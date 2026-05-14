export interface MonthlyData {
  month: number
  total: number
}

export interface YearlyData {
  year: number
  principal: number
  contributions: number
  interest: number
  total: number
  monthlyBreakdown: MonthlyData[]
}

export interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
  totalContributions: number
  yearlyBreakdown: YearlyData[]
}

const calculateMonthlyBreakdown = (
  year: number,
  principal: number,
  monthlyRate: number,
  monthlyContribution: number
): MonthlyData[] => {
  // Accumulator that will hold one entry per month (12 in total) for this year.
  const monthlyBreakdown: MonthlyData[] = []

  // Walk through the 12 months of the requested year, in order from 1 to 12.
  for (let monthInYear = 1; monthInYear <= 12; monthInYear++) {
    // Convert (year, monthInYear) to an absolute month index from time zero.
    // Example: Year 2, Month 3 → (2 - 1) * 12 + 3 = 15.
    const globalMonth = (year - 1) * 12 + monthInYear

    // Future Value of the initial principal after `globalMonth` months of compounding.
    // Formula: FV = P × (1 + r)^n   where r is the monthly rate, n is months elapsed.
    const principalFV = principal * Math.pow(1 + monthlyRate, globalMonth)

    // Future Value of all recurring monthly deposits made up to this month.
    // Uses the ordinary-annuity FV formula: FV = PMT × [((1 + r)^n − 1) / r].
    // Skipped (kept at 0) when there are no recurring deposits, to avoid wasted math.
    const contributionsFV = monthlyContribution > 0
      ? monthlyContribution * (Math.pow(1 + monthlyRate, globalMonth) - 1) / monthlyRate
      : 0

    // Store the month's total = grown principal + grown contributions.
    // `month` is the 1..12 index within the year (not the global index).
    monthlyBreakdown.push({
      month: monthInYear,
      total: principalFV + contributionsFV,
    })
  }

  // Return the populated 12-entry array to the caller.
  return monthlyBreakdown
}

const calculateYearlyBreakdown = (
  principal: number,
  years: number,
  monthlyRate: number,
  monthlyContribution: number
): YearlyData[] => {
  // Accumulator that will hold one entry per year for the full horizon.
  const yearlyBreakdown: YearlyData[] = []

  // Iterate from year 1 up to and including the final year of the horizon.
  for (let year = 1; year <= years; year++) {
    // Delegate the monthly math: returns 12 entries with totals at end of each month.
    const monthlyBreakdown = calculateMonthlyBreakdown(year, principal, monthlyRate, monthlyContribution)

    // The year-end value is just the last month's total — no need to recompute.
    const yearlyTotal = monthlyBreakdown[monthlyBreakdown.length - 1].total

    // Total raw money put in by the end of this year:
    // initial principal + (monthly deposit × 12 months × number of years elapsed).
    const yearlyContributions = principal + monthlyContribution * year * 12

    // Interest earned = what the account is worth − what was actually deposited.
    const yearlyInterest = yearlyTotal - yearlyContributions

    // Record the year's summary plus the nested monthly breakdown used by the UI.
    yearlyBreakdown.push({
      year,
      principal,
      // Only the recurring contributions — principal is reported separately above.
      contributions: yearlyContributions - principal,
      // Guard against tiny negative floats when monthlyRate is 0 or near-zero.
      interest: Math.max(0, yearlyInterest),
      total: yearlyTotal,
      monthlyBreakdown,
    })
  }

  // Return the array, ordered from year 1 to year N.
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
