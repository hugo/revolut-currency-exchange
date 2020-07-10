import React from 'react'
import cns from 'classnames'

type Props = {
  isEnabled: boolean
  onClick?(): void
}

export const ExchangeButton: React.FC<Props> = ({isEnabled, onClick}) => (
  <button
    onClick={(e) => {
      e.currentTarget.blur()
      onClick?.()
    }}
    type="button"
    className={cns(
      'inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 transition ease-in-out duration-150',
      {
        'cursor-not-allowed': !isEnabled,
      }
    )}
  >
    Exchange
  </button>
)
