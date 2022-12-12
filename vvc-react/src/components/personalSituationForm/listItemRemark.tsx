/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from 'react'

export interface ListItemRemarkProps {
  value?: string
  onChange: (event: any) => void
  name?: string
  onBlur: (event: any) => void
}

export const ListItemRemark: React.FC<ListItemRemarkProps> = React.forwardRef(
  (
    { value, onChange, name, onBlur }: ListItemRemarkProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [visible, setVisible] = useState(false)
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setVisible(newValue !== undefined && newValue.length > 0)
      onChange(event)
    }

    return (
      <label style={{ display: 'flex' }}>
        {!visible && <button onClick={() => setVisible(true)}>Show</button>}
        {visible && (
          <>
            <span>Bemerkung</span>
            <input
              ref={ref}
              type='text'
              name={name}
              onChange={(event) => handleOnChange(event)}
              value={value}
              onBlur={onBlur}
            />
          </>
        )}
      </label>
    )
  },
)
