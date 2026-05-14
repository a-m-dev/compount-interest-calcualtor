import { formatNumber } from '../utils/formatting'

export default function NumberInput({ id, label, value, onChange, placeholder }) {
  const displayValue = value ? formatNumber(value.replace(/[\s,]/g, '')) : ''

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[\s,]/g, '')
    if (inputValue === '' || !isNaN(inputValue)) {
      onChange(inputValue)
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
