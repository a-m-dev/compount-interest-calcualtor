import NumberInput from './NumberInput'

interface FormProps {
  principal: string
  years: string
  rate: string
  monthlyContribution: string
  onPrincipalChange: (value: string) => void
  onYearsChange: (value: string) => void
  onRateChange: (value: string) => void
  onMonthlyContributionChange: (value: string) => void
  onCalculate: () => void
}

export default function Form({
  principal,
  years,
  rate,
  monthlyContribution,
  onPrincipalChange,
  onYearsChange,
  onRateChange,
  onMonthlyContributionChange,
  onCalculate,
}: FormProps) {
  return (
    <>
      <div className="form-row">
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
      </div>

      <NumberInput
        id="monthlyContribution"
        label="Monthly Contribution"
        value={monthlyContribution}
        onChange={onMonthlyContributionChange}
        placeholder="Enter amount (optional)"
      />

      <button onClick={onCalculate}>Calculate</button>
    </>
  )
}
