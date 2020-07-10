import React from 'react'
import {ChevronDown} from 'heroicons-react'

import {Currency} from '../lib/currency'
import FormattedCurrency from './FormattedCurrency'

// Without this mapping we'll end up showing US$x.xx instead of $x.xx for
// USD balances
// TODO: figure out if there's a better way to solve this
const currencyLocales: Record<Currency, string> = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'en-GB',
}

type Props = {
  currency: Currency
  balance: number
}

export const ExchangePocket: React.FC<Props> = ({currency, balance}) => (
  <div className="flex">
    <div>
      <div className="flex items-center">
        <span className="text-3xl font-semibold">{currency}</span>{' '}
        <span>
          <ChevronDown size={24} />
        </span>
      </div>

      <div>
        <span className="text-sm text-gray-500">
          Balance:{' '}
          <FormattedCurrency
            amount={balance}
            locale={currencyLocales[currency]}
            options={{
              currency,
              currencyDisplay: 'symbol',
            }}
          />
        </span>
      </div>
    </div>
    <div className="flex-1 flex justify-end items-center">currency input</div>
  </div>
)
