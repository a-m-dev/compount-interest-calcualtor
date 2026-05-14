import { formatCurrency } from '../utils/formatting'

interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
}

interface ResultsProps {
  result: CompoundInterestResult | null
}

export default function Results({ result }: ResultsProps) {
  if (!result) return null

  return (
    <div className="results">
      <div className="result-item">
        <span>Final Amount:</span>
        <strong>{formatCurrency(result.finalAmount)} kr</strong>
      </div>
      <div className="result-item">
        <span>Interest Earned:</span>
        <strong>{formatCurrency(result.interestEarned)} kr</strong>
      </div>
    </div>
  )
}
