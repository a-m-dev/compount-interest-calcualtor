interface FormFieldProps {
  id: string
  label: string
  value: string | number
  onChange: (value: string) => void
  placeholder: string
  type?: string
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'number',
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
