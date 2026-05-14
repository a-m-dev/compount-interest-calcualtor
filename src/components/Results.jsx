import { formatCurrency } from '../utils/formatting'

export default function Results({ result }) {
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
