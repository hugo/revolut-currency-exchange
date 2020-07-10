import React from 'react'
import cns from 'classnames'

type Props = {
  disabled: boolean
  onClick?(): void
}

export const ExchangeButton: React.FC<Props> = ({disabled, onClick}) => (
  <button
    disabled={disabled}
    onClick={(e) => {
      e.currentTarget.blur()
      onClick?.()
    }}
    type="button"
    className={cns(
      'inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 transition ease-in-out duration-150',
      {
        'cursor-not-allowed': disabled,
      }
    )}
  >
    Exchange
  </button>
)
