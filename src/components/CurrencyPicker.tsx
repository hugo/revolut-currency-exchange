import React, {useState} from 'react'
import {ChevronDown} from 'heroicons-react'
import cns from 'classnames'

import {Currency} from '../lib/currency'

// Dropdown panel, show/hide based on dropdown state.
// Entering: "transition ease-out duration-100"
//   From: "transform opacity-0 scale-95"
//   To: "transform opacity-100 scale-100"
// Leaving: "transition ease-in duration-75"
//   From: "transform opacity-100 scale-100"
//   To: "transform opacity-0 scale-95"

type Props = {
  currencies: Currency[]
  currency: Currency
  onPickCurrency?(c: Currency): void
  position?: 'above' | 'below'
}

export const CurrencyPicker: React.FC<Props> = ({
  currencies,
  currency,
  onPickCurrency,
  position,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center w-full rounded-md text-4xl font-semibold transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={(e) => {
            e.currentTarget.blur()

            setIsOpen((o) => !o)
          }}
        >
          {currency} <ChevronDown />
        </button>
      </div>

      {isOpen ? (
        <div
          className={cns(
            'origin-top-right absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg',
            {'top-0': position === 'below', 'bottom-0': position === 'above'}
          )}
        >
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {currencies.map((c) => (
                <button
                  key={c}
                  className="w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  onClick={(e) => {
                    e.currentTarget.blur()

                    setIsOpen(false)

                    onPickCurrency?.(c)
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
