import React, { useState } from 'react'

const allOptions = ['1. Tag', '10. Tag', '20. Tag', '30. Tag']

export const KopfNuss = () => {
  const [selectedValues, setSelectedValues] = useState<Array<string | null>>([])

  return (
    <>
      <button onClick={() => setSelectedValues([...selectedValues, null])}>Hunzifügen</button>
      {selectedValues.map((selectedValue, index) => (
        <React.Fragment key={index}>
          <KopfListe
            onChange={(value) => {
              const newSelectedValues = [...selectedValues]
              newSelectedValues[index] = value
              setSelectedValues(newSelectedValues)
            }}
            value={selectedValues[index]}
            options={allOptions.filter(
              (o) => o === selectedValues[index] || !selectedValues.some((o2) => o2 === o),
            )}
          />
          <button onClick={() => setSelectedValues(selectedValues.filter((_o, i) => i !== index))}>
            Entfernen
          </button>
        </React.Fragment>
      ))}
    </>
  )
}

const KopfListe = (props: {
  options: string[]
  value: string | null
  onChange: (value: string) => void
}) => {
  return (
    <select value={props.value ?? undefined} onChange={(e) => props.onChange(e.target.value)}>
      <option></option>
      {props.options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  )
}
