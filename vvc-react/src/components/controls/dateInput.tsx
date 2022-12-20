import React, { ChangeEventHandler, FocusEventHandler, useImperativeHandle, useRef } from 'react'

export interface DateInputProps {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const formatValue = (original: string | undefined): string => {
  if(!original) {
    return ''
  }
  const splitted = original.replace(/\//gm, '.').split('.')
  if (splitted.length < 3) {
    return ''
  }

  const day = Number.parseInt(splitted[0])
  const month = Number.parseInt(splitted[1])
  const year = Number.parseInt(splitted[2])
  
  const date = new Date()
  date.setFullYear(year < 100 ? year + 2000 : year)
  date.setMonth(month - 1)
  date.setDate(day)

  const formattedDate = date.toLocaleDateString('de-DE')
  console.log('formatValue', formattedDate)
  return formattedDate
}

export const DateInput: React.FC<DateInputProps> = React.forwardRef(
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
