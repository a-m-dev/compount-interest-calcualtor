import { formatCurrency } from '../utils/formatting'
import { CompoundInterestResult } from '../utils/calculations'
import Chart from './Chart'
import YearlyList from './YearlyList'

interface ResultsProps {
  result: CompoundInterestResult | null
}

export default function Results({ result }: ResultsProps) {
  if (!result) return null

  return (
    <div>
      <div className="results">
        <div className="result-item">
          <span>Final Amount:</span>
          <strong>{formatCurrency(result.finalAmount)} kr</strong>
        </div>
        <Chart data={result.yearlyBreakdown} />
        <YearlyList data={result.yearlyBreakdown} />
        <div className="result-item">
          <span>Total Contributions:</span>
          <strong>{formatCurrency(result.totalContributions)} kr</strong>
        </div>
        <div className="result-item">
          <span>Interest Earned:</span>
          <strong>{formatCurrency(result.interestEarned)} kr</strong>
        </div>
      </div>
    </div>
  )
}
