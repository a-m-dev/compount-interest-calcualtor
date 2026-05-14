import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { YearlyData } from '../../utils/calculations'
import { ChartTooltip, formatAxisNumber, generateYAxisTicks } from './chartUtils'

interface AreaChartViewProps {
  data: YearlyData[]
}

export default function AreaChartView({ data }: AreaChartViewProps) {
  const yAxisTicks = generateYAxisTicks(data)

  return (
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
        <Tooltip content={<ChartTooltip />} />
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
  )
}
