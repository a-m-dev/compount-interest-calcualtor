import { useState } from 'react'
import { YearlyData } from '../../utils/calculations'
import AreaChartView from './AreaChartView'
import LineChartView from './LineChartView'
import BarChartView from './BarChartView'
import WaterfallChartView from './WaterfallChartView'
import './Chart.css'

interface ChartProps {
  data: YearlyData[]
}

type ChartType = 'area' | 'line' | 'bar' | 'waterfall'

const CHART_TYPES: { id: ChartType; label: string }[] = [
  { id: 'area', label: 'Area' },
  { id: 'line', label: 'Line' },
  { id: 'bar', label: 'Bar' },
  { id: 'waterfall', label: 'Waterfall' },
]

export default function Chart({ data }: ChartProps) {
  const [chartType, setChartType] = useState<ChartType>('area')

  if (data.length === 0) return null

  return (
    <div className="chart-container">
      <div className="chart-toggle" role="tablist">
        {CHART_TYPES.map(t => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={chartType === t.id}
            className={`chart-toggle-btn ${chartType === t.id ? 'is-active' : ''}`}
            onClick={() => setChartType(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {chartType === 'area' && <AreaChartView data={data} />}
      {chartType === 'line' && <LineChartView data={data} />}
      {chartType === 'bar' && <BarChartView data={data} />}
      {chartType === 'waterfall' && <WaterfallChartView data={data} />}
    </div>
  )
}
