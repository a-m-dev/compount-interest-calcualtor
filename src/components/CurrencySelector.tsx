import { useCurrency } from '../contexts/CurrencyContext'
import { Currency } from '../types'
import { CURRENCIES } from '../constants/currencies'
import './CurrencySelector.css'

const OPTIONS = Object.values(CURRENCIES).map(c => ({
  value: c.code,
  label: `${c.flag} ${c.label}`,
}))

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <label className="currency-selector">
      <span className="currency-selector-label">Currency</span>
      <select
        className="currency-selector-select"
        value={currency}
        onChange={e => setCurrency(e.target.value as Currency)}
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
