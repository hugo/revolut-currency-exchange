import React from 'react'
import {useMachine} from '@xstate/react'

import {Currency} from '../lib/currency'
import {ExchangePocket} from './ExchangePocket'
import {ExchangeRateDisplay} from './ExchangeRateDisplay'
import {exchangeMachine} from '../lib/exchangeMachine'
import {exchangeRate} from '../lib/exchangeRate'

type Props = {
  // In the real world, we'd expect this to be passed in
  // pockets: Record<Currency, number>
  pollExchangeRate?(from: Currency, to: Currency): Promise<number>
}

export const Exchange: React.FC<Props> = ({
  pollExchangeRate = exchangeRate,
}) => {
  const [state] = useMachine(exchangeMachine, {
    context: {
      from: 'GBP',
      to: 'USD',
      pockets: {
        GBP: 1121.65,
        EUR: 1258.92,
        USD: 1307.31,
      },
      pollExchangeRate,
    },
  })

  return (
    <div className="rounded-md overflow-hidden border border-gray-300">
      <div className="bg-white">
        <div className="p-6">
          <ExchangePocket
            currency={state.context.from}
            balance={state.context.pockets[state.context.from]}
          />
        </div>
      </div>

      <div className="-my-4 flex justify-center items-center">
        {state.context.rate ? (
          <span className="text-blue-500">
            <ExchangeRateDisplay
              from="GBP"
              to="USD"
              rate={state.context.rate.toFixed(4)}
            />
          </span>
        ) : null}
      </div>

      <div className="bg-gray-400">
        <div className="p-6">
          <ExchangePocket
            currency={state.context.to}
            balance={state.context.pockets[state.context.to]}
          />
        </div>
      </div>
    </div>
  )
}
