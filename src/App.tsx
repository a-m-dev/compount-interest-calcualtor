import { useState } from 'react'
import Form from './components/Form'
import Results from './components/Results'
import CurrencySelector from './components/CurrencySelector'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { calculateCompoundInterest, CompoundInterestResult } from './utils/calculations'
import './App.css'

export default function App() {
  const [principal, setPrincipal] = useState<string>('')
  const [years, setYears] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)

  const handleCalculate = (): void => {
    if (!principal || !years || !rate) {
      alert('Please fill in all fields')
      return
    }

    const calculationResult = calculateCompoundInterest(
      principal,
      years,
      rate,
      monthlyContribution || 0
    )
    setResult(calculationResult)
  }

  return (
    <CurrencyProvider>
      <div className="container">
        <div className="wrapper">
          <div className="page-header">
            <h1>Compound Interest Calculator</h1>
            <CurrencySelector />
          </div>

          <div className="card">
            <Form
              principal={principal}
              years={years}
              rate={rate}
              monthlyContribution={monthlyContribution}
              onPrincipalChange={setPrincipal}
              onYearsChange={setYears}
              onRateChange={setRate}
              onMonthlyContributionChange={setMonthlyContribution}
              onCalculate={handleCalculate}
            />

            <Results result={result} />
          </div>
        </div>
      </div>
    </CurrencyProvider>
  )
}
