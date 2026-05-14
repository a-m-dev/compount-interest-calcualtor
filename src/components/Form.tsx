import NumberInput from './NumberInput'

interface FormProps {
  principal: string
  years: string
  rate: string
  onPrincipalChange: (value: string) => void
  onYearsChange: (value: string) => void
  onRateChange: (value: string) => void
  onCalculate: () => void
}

export default function Form({
  principal,
  years,
  rate,
  onPrincipalChange,
  onYearsChange,
  onRateChange,
  onCalculate,
}: FormProps) {
  return (
    <>
      <NumberInput
        id="principal"
        label="Principal Amount"
        value={principal}
        onChange={onPrincipalChange}
        placeholder="Enter amount"
      />

      <NumberInput
        id="years"
        label="Years"
        value={years}
        onChange={onYearsChange}
        placeholder="Enter years"
      />

      <NumberInput
        id="rate"
        label="Annual Growth Rate (%)"
        value={rate}
        onChange={onRateChange}
        placeholder="Enter rate"
      />

      <button onClick={onCalculate}>Calculate</button>
    </>
  )
}
