import React from 'react'

// Regexp pattern to only allow allowed format
// n.b. might still not be a valid number e.g. 10. — no decimals
const pattern = '^\\d+(?:\\.\\d{1,2}|\\.)?$'
const re = new RegExp(pattern)

type Props = {
  onChange(v?: string): void
  value: string
}

export const DecimalInput: React.FC<Props> = ({onChange, value}) => {
  return (
    <input
      className="text-right appearance-none bg-transparent text-2xl text-gray-700 focus:outline-none"
      type="text"
      inputMode="numeric"
      pattern={pattern}
      onChange={(e) => {
        const {
          currentTarget: {value},
        } = e

        if (value === '') {
          onChange(undefined)
        }

        // Only fire the onChange callback if it would result in a valid valiue
        if (re.test(value)) {
          onChange?.(value)
        }
      }}
      value={value}
      placeholder="0"
    />
  )
}
