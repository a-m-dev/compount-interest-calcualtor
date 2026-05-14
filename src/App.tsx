import { useState } from 'react'
import Form from './components/Form'
import Results from './components/Results'
import { calculateCompoundInterest } from './utils/calculations'
import './App.css'

interface CompoundInterestResult {
  finalAmount: number
  interestEarned: number
}

export default function App() {
  const [principal, setPrincipal] = useState<string>('')
  const [years, setYears] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)

  const handleCalculate = (): void => {
    if (!principal || !years || !rate) {
      alert('Please fill in all fields')
      return
    }

    const calculationResult = calculateCompoundInterest(principal, years, rate)
    setResult(calculationResult)
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Compound Interest Calculator</h1>

        <div className="card">
          <Form
            principal={principal}
            years={years}
            rate={rate}
            onPrincipalChange={setPrincipal}
            onYearsChange={setYears}
            onRateChange={setRate}
            onCalculate={handleCalculate}
          />

          <Results result={result} />
        </div>
      </div>
    </div>
  )
}
