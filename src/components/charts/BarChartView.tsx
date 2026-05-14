import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { YearlyData } from '../../utils/calculations'
import { ChartTooltip, formatAxisNumber, generateYAxisTicks } from './chartUtils'

interface BarChartViewProps {
  data: YearlyData[]
}

export default function BarChartView({ data }: BarChartViewProps) {
  const yAxisTicks = generateYAxisTicks(data)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="year"
          stroke="#94a3b8"
          label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis
          stroke="#94a3b8"
          tickFormatter={formatAxisNumber}
          domain={[0, 'dataMax']}
          ticks={yAxisTicks}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }} />
        <Bar dataKey="principal" stackId="a" fill="#3b82f6" isAnimationActive={false} />
        <Bar dataKey="contributions" stackId="a" fill="#6366f1" isAnimationActive={false} />
        <Bar
          dataKey="interest"
          stackId="a"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
