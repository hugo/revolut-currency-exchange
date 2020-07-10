import React from 'react'

import {Currency} from '../lib/currency'
import FormattedCurrency from './FormattedCurrency'
import {CurrencyPicker} from './CurrencyPicker'
import {DecimalInput} from './DecimalInput'

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
  amount?: string
  error?: Error
  onChangeCurrency?(c: Currency): void
  onChangeAmount?(v?: string): void
}

export const ExchangePocket: React.FC<Props> = ({
  currencies,
  currency,
  balance,
  direction,
  amount,
  error,
  onChangeCurrency,
  onChangeAmount,
}) => (
  <div className="flex">
    <div>
      <CurrencyPicker
        currencies={currencies}
        currency={currency}
        position={direction === 'from' ? 'below' : 'above'}
        onPickCurrency={onChangeCurrency}
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
    <div className="relative flex-1 flex justify-end items-center">
      <DecimalInput
        onChange={onChangeAmount}
        value={amount ? `${amount}` : ''}
      />
      {error ? (
        <div className="absolute bottom-0 right-0">
          <span className="text-sm text-gray-500">{error?.message}</span>
        </div>
      ) : null}
    </div>
  </div>
)
