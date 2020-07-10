import React from 'react'

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
      <div>pocket selector — {currency}</div>
      <div>
        pocket balance —{' '}
        <FormattedCurrency
          amount={balance}
          locale={currencyLocales[currency]}
          options={{
            currency,
            currencyDisplay: 'symbol',
          }}
        />
      </div>
    </div>
    <div className="flex-1 text-right">currency input</div>
  </div>
)
