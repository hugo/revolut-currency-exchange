import React from 'react'
import {Currency} from '../lib/currency'

type Props = {
  currency: Currency
  balance: number
}

export const ExchangePocket: React.FC<Props> = ({currency, balance}) => (
  <div className="flex">
    <div>
      <div>pocket selector — {currency}</div>
      <div>pocket balance — {balance.toFixed(2)}</div>
    </div>
    <div className="flex-1 text-right">currency input</div>
  </div>
)
