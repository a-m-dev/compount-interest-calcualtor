import { useState } from 'react'
import Chart from './charts/Chart'
import YearlyList from './YearlyList'
import { YearlyData } from '../utils/calculations'
import './ResultsTabs.css'

interface ResultsTabsProps {
  data: YearlyData[]
}

type TabId = 'chart' | 'list'

const TABS: { id: TabId; label: string }[] = [
  { id: 'chart', label: 'Chart' },
  { id: 'list', label: 'Yearly Breakdown' },
]

export default function ResultsTabs({ data }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('chart')

  return (
    <div className="results-tabs">
      <div className="results-tabs-nav" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`results-tabs-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="results-tabs-panel" role="tabpanel">
        {activeTab === 'chart' ? <Chart data={data} /> : <YearlyList data={data} />}
      </div>
    </div>
  )
}
