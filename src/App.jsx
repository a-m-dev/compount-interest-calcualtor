import { useState } from 'react'
import Form from './components/Form'
import Results from './components/Results'
import { calculateCompoundInterest } from './utils/calculations'
import './App.css'

export default function App() {
  const [principal, setPrincipal] = useState('')
  const [years, setYears] = useState('')
  const [rate, setRate] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!principal || !years || !rate) {
      alert('Please fill in all fields')
      return
    }

    const calculationResult = calculateCompoundInterest(principal, years, rate)
    setResult(calculationResult)
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Compound Interest Calculator</h1>

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
  )
}
