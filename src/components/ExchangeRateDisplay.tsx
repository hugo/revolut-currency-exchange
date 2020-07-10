import React from 'react'
import {TrendingUp} from 'heroicons-react'

import {Currency, currencySymbol} from '../lib/currency'

// If we were to leave these as separate nodes there would not be a single
// string for `getByText` to find.
const format = (from: Currency, to: Currency, rate: string) =>
  `${currencySymbol(from)}1 = ${currencySymbol(to)}${rate}`

type Props = {
  from: Currency
  to: Currency
  rate: string
}

export const ExchangeRateDisplay: React.FC<Props> = ({from, to, rate}) => (
  <div className="flex items-center bg-white border border-gray-200  shadow-sm rounded-full overflow-hidden px-2 py-1 select-none cursor-default">
    <TrendingUp size={14} />

    <div className="mx-1" />

    <span className="text-xs font-semibold">{format(from, to, rate)}</span>
  </div>
)
