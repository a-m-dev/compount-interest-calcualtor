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
import { formatCurrency } from '../../utils/formatting'
import { formatAxisNumber, generateYAxisTicks } from './chartUtils'

interface WaterfallChartViewProps {
  data: YearlyData[]
}

interface WaterfallDatum {
  year: number
  base: number          // invisible spacer that lifts the visible bar to start at prior year's total
  deposits: number      // new money this year
  interest: number      // earnings this year
  total: number         // end-of-year value
  prior: number         // start-of-year value
}

// Each year shows the climb from prior balance → +deposits → +interest = new balance.
// The `base` (= prior balance) is rendered transparently so the visible portion floats up.
const buildWaterfallData = (data: YearlyData[]): WaterfallDatum[] => {
  return data.map((d, i) => {
    const prior = i === 0 ? 0 : data[i - 1].total
    const contribThisYear = d.contributions - (i === 0 ? 0 : data[i - 1].contributions)
    const principalThisYear = i === 0 ? d.principal : 0
    const deposits = principalThisYear + contribThisYear
    const interest = Math.max(0, d.total - prior - deposits)
    return { year: d.year, base: prior, deposits, interest, total: d.total, prior }
  })
}

const WaterfallTooltip = (props: any) => {
  const { active, payload } = props
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload as WaterfallDatum
  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">Year {d.year}</p>
      <p className="tooltip-item principal">
        Start: {formatCurrency(d.prior)} kr
      </p>
      <p className="tooltip-item contributions">
        + Deposits: {formatCurrency(d.deposits)} kr
      </p>
      <p className="tooltip-item interest">
        + Interest: {formatCurrency(d.interest)} kr
      </p>
      <p className="tooltip-total">
        End: {formatCurrency(d.total)} kr
      </p>
    </div>
  )
}

export default function WaterfallChartView({ data }: WaterfallChartViewProps) {
  const chartData = buildWaterfallData(data)
  const yAxisTicks = generateYAxisTicks(data)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 5, right: 5, left: 15, bottom: 5 }}>
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
        <Tooltip content={<WaterfallTooltip />} cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }} />
        {/* Invisible spacer — pushes the visible portion up to start at prior year's total. */}
        <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="deposits" stackId="w" fill="#6366f1" isAnimationActive={false} />
        <Bar
          dataKey="interest"
          stackId="w"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
