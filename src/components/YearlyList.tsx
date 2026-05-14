import { useState } from 'react'
import { formatCurrency } from '../utils/formatting'
import { YearlyData } from '../utils/calculations'
import './YearlyList.css'

interface YearlyListProps {
  data: YearlyData[]
}

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export default function YearlyList({ data }: YearlyListProps) {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())

  if (data.length === 0) return null

  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const next = new Set(prev)
      if (next.has(year)) next.delete(year)
      else next.add(year)
      return next
    })
  }

  return (
    <div className="yearly-list-container">
      <div className="yearly-list">
        {data.map((yearData, index) => {
          const prev = index > 0 ? data[index - 1].total : null
          const growth = prev !== null ? yearData.total - prev : null
          const isExpanded = expandedYears.has(yearData.year)
          const yearStartTotal = prev ?? yearData.principal

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
              <button
                type="button"
                className={`yearly-list-item ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => toggleYear(yearData.year)}
                aria-expanded={isExpanded}
              >
                <span className="yearly-list-year">Year {yearData.year}</span>
                <span className="yearly-list-right">
                  <span className="yearly-list-amount">
                    {formatCurrency(yearData.total)} kr
                  </span>
                  <span className={`yearly-list-chevron ${isExpanded ? 'is-expanded' : ''}`} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </span>
              </button>
              {isExpanded && (
                <div className="yearly-list-months">
                  {yearData.monthlyBreakdown.map((m, mIdx) => {
                    const monthPrev = mIdx === 0
                      ? yearStartTotal
                      : yearData.monthlyBreakdown[mIdx - 1].total
                    const monthGrowth = m.total - monthPrev
                    return (
                      <div key={m.month} className="yearly-list-month-row">
                        <span className="yearly-list-month-label">{MONTH_LABELS[m.month - 1]}</span>
                        <span className="yearly-list-month-growth">
                          +{formatCurrency(monthGrowth)} kr
                        </span>
                        <span className="yearly-list-month-total">
                          {formatCurrency(m.total)} kr
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
