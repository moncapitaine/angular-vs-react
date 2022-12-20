import React, { ChangeEventHandler, FocusEventHandler, useImperativeHandle, useRef } from 'react'

export interface MoneyInputProps {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const formatValue = (original: string | number | undefined): string => {
  const originalValue = typeof original === 'number' ? original.toString() : original
  if (!originalValue) {
    return ''
  }
  const valueAsNumber = Number.parseFloat(originalValue.replace(/\./gm, '').replace(/,/gm, '.'))
  const targetFormat = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return targetFormat.format(valueAsNumber)
}

export const MoneyInput: React.FC<MoneyInputProps> = React.forwardRef(
  ({ value, onBlur, onChange, name }, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      if (innerRef.current) {
        innerRef.current.value = formatValue(event.target.value)
      }
      onBlur?.(event)
    }

    return (
      <input
        name={name}
        ref={innerRef}
        type='text'
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
    )
  },
)
