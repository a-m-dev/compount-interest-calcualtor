import { formatCurrency } from '../utils/formatting'
import { CompoundInterestResult } from '../utils/calculations'
import { useCurrency } from '../contexts/CurrencyContext'
import ResultsTabs from './ResultsTabs'

interface ResultsProps {
  result: CompoundInterestResult | null
}

export default function Results({ result }: ResultsProps) {
  const { currency } = useCurrency()
  if (!result) return null

  return (
    <div>
      <div className="results">
        <div className="result-item">
          <span>Final Amount:</span>
          <strong>{formatCurrency(result.finalAmount, currency)}</strong>
        </div>
        <div className="results-summary">
          <div className="result-item">
            <span>Total Contributions:</span>
            <strong>{formatCurrency(result.totalContributions, currency)}</strong>
          </div>
          <div className="result-item">
            <span>Interest Earned:</span>
            <strong>{formatCurrency(result.interestEarned, currency)}</strong>
          </div>
        </div>
        <ResultsTabs data={result.yearlyBreakdown} />
      </div>
    </div>
  )
}
