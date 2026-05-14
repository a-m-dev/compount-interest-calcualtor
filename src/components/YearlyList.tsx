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
        {data.map((yearData, index) => {
          const prev = index > 0 ? data[index - 1].total : null
          const growth = prev !== null ? yearData.total - prev : null

          return (
            <div key={yearData.year} className="yearly-list-block">
              {growth !== null && (
                <div className="yearly-list-growth">
                  <span className="yearly-list-growth-line" />
                  <span className="yearly-list-growth-label">
                    +{formatCurrency(growth)} kr
                  </span>
                  <span className="yearly-list-growth-line" />
                </div>
              )}
              <div className="yearly-list-item">
                <span className="yearly-list-year">Year {yearData.year}</span>
                <span className="yearly-list-amount">
                  {formatCurrency(yearData.total)} kr
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
