export default function Results({ result }) {
  if (!result) return null

  return (
    <div className="results">
      <div className="result-item">
        <span>Final Amount:</span>
        <strong>{result.finalAmount.toFixed(2)} kr</strong>
      </div>
      <div className="result-item">
        <span>Interest Earned:</span>
        <strong>{result.interestEarned.toFixed(2)} kr</strong>
      </div>
    </div>
  )
}
