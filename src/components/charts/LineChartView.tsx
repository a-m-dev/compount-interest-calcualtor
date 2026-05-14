import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { YearlyData } from '../../utils/calculations'
import { ChartTooltip, formatAxisNumber, generateYAxisTicks } from './chartUtils'

interface LineChartViewProps {
  data: YearlyData[]
}

export default function LineChartView({ data }: LineChartViewProps) {
  const yAxisTicks = generateYAxisTicks(data)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="year"
          label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }}
          stroke="#94a3b8"
        />
        <YAxis stroke="#94a3b8" tickFormatter={formatAxisNumber} domain={[0, 'dataMax']} ticks={yAxisTicks} />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="principal"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: '#3b82f6' }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="contributions"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: '#6366f1' }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="interest"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: '#10b981' }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
