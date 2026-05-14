import { YearlyData } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatting'
import { useCurrency } from '../../contexts/CurrencyContext'

export const formatAxisNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`
  }
  return value.toString()
}

export const generateYAxisTicks = (data: YearlyData[]): number[] => {
  if (data.length === 0) return [0]

  const maxValue = Math.max(...data.map(d => d.total))
  const tickCount = 5
  const step = Math.ceil(maxValue / (tickCount - 1) / 100000) * 100000

  const ticks: number[] = []
  for (let i = 0; i < tickCount; i++) {
    ticks.push(step * i)
  }
  return ticks
}

export const ChartTooltip = (props: any) => {
  const { currency } = useCurrency()
  const { active, payload } = props
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">Year {data.year}</p>
      <p className="tooltip-item principal">
        Principal: {formatCurrency(data.principal, currency)}
      </p>
      <p className="tooltip-item contributions">
        Contributions: {formatCurrency(data.contributions, currency)}
      </p>
      <p className="tooltip-item interest">
        Interest: {formatCurrency(data.interest, currency)}
      </p>
      <p className="tooltip-total">
        Total: {formatCurrency(data.total, currency)}
      </p>
    </div>
  )
}
