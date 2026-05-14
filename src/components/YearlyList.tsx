import { formatCurrency } from '../utils/formatting'
import { YearlyData } from '../utils/calculations'
import './YearlyList.css'

interface YearlyListProps {
  data: YearlyData[]
}

export default function YearlyList({ data }: YearlyListProps) {
  if (data.length === 0) return null

  return (
    <div className="yearly-list-container">
      <div className="yearly-list">
        {data.map((yearData) => (
          <div key={yearData.year} className="yearly-list-item">
            <span className="yearly-list-label">Year {yearData.year}</span>
            <span className="yearly-list-amount">{formatCurrency(yearData.total)} kr</span>
          </div>
        ))}
      </div>
    </div>
  )
}
