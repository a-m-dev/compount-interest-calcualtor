import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { YearlyData } from '../utils/calculations'
import { formatCurrency } from '../utils/formatting'
import './Chart.css'

interface ChartProps {
  data: YearlyData[]
}

const formatAxisNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`
  }
  return value.toString()
}

const generateYAxisTicks = (data: YearlyData[]): number[] => {
  if (data.length === 0) return [0]

  const maxValue = Math.max(...data.map(d => d.total))
  const tickCount = 5
  const step = Math.ceil(maxValue / (tickCount - 1) / 100000) * 100000 // Round to nearest 100k

  const ticks: number[] = []
  for (let i = 0; i < tickCount; i++) {
    ticks.push(step * i)
  }
  return ticks
}

export default function Chart({ data }: ChartProps) {
  if (data.length === 0) return null

  const CustomTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">Year {data.year}</p>
          <p className="tooltip-item principal">
            Principal: {formatCurrency(data.principal)} kr
          </p>
          <p className="tooltip-item contributions">
            Contributions: {formatCurrency(data.contributions)} kr
          </p>
          <p className="tooltip-item interest">
            Interest: {formatCurrency(data.interest)} kr
          </p>
          <p className="tooltip-total">
            Total: {formatCurrency(data.total)} kr
          </p>
        </div>
      )
    }
    return null
  }

  const yAxisTicks = generateYAxisTicks(data)

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 15, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }}
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" tickFormatter={formatAxisNumber} domain={[0, 'dataMax']} ticks={yAxisTicks} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="principal"
            stackId="1"
            stroke="#3b82f6"
            fill="url(#colorPrincipal)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="1"
            stroke="#6366f1"
            fill="url(#colorContributions)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#10b981"
            fill="url(#colorInterest)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
