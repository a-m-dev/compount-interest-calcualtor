import { formatNumber } from '../utils/formatting'

interface NumberInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: NumberInputProps) {
  const displayValue = value ? formatNumber(value.replace(/[\s,]/g, '')) : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[\s,]/g, '')
    if (inputValue === '' || !isNaN(Number(inputValue))) {
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
