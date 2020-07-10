import React from 'react'
import {ChevronDown} from 'heroicons-react'

import {Currency} from '../lib/currency'
import FormattedCurrency from './FormattedCurrency'
import {CurrencyPicker} from './CurrencyPicker'

// Without this mapping we'll end up showing US$x.xx instead of $x.xx for
// USD balances
// TODO: figure out if there's a better way to solve this
const currencyLocales: Record<Currency, string> = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'en-GB',
}

type Props = {
  currencies: Currency[]
  currency: Currency
  balance: number
  direction: 'from' | 'to'
}

export const ExchangePocket: React.FC<Props> = ({
  currencies,
  currency,
  balance,
  direction,
}) => (
  <div className="flex">
    <div>
      <CurrencyPicker
        currencies={currencies}
        currency={currency}
        position={direction === 'from' ? 'below' : 'above'}
      />

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
