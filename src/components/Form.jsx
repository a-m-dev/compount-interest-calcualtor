import FormField from './FormField'

export default function Form({ principal, years, rate, onPrincipalChange, onYearsChange, onRateChange, onCalculate }) {
  return (
    <>
      <FormField
        id="principal"
        label="Principal Amount"
        value={principal}
        onChange={onPrincipalChange}
        placeholder="Enter amount"
      />

      <FormField
        id="years"
        label="Years"
        value={years}
        onChange={onYearsChange}
        placeholder="Enter years"
      />

      <FormField
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
