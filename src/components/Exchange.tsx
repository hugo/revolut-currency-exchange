import React from 'react'
import {useMachine} from '@xstate/react'

import {Currency} from '../lib/currency'
import {ExchangePocket} from './ExchangePocket'
import {ExchangeRateDisplay} from './ExchangeRateDisplay'
import {exchangeMachine} from '../lib/exchangeMachine'

const fakePoll = () => Promise.resolve(1 + 1 * Math.random())

type Props = {
  pollExchangeRate?(from: Currency, to: Currency): Promise<number>
}

export const Exchange: React.FC<Props> = ({pollExchangeRate = fakePoll}) => {
  const [state] = useMachine(exchangeMachine, {
    context: {
      from: 'GBP',
      to: 'USD',
      pollExchangeRate,
    },
  })

  return (
    <div className="rounded-md overflow-hidden border border-gray-300">
      <div className="bg-white">
        <div className="p-6">
          <ExchangePocket />
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
          <ExchangePocket />
        </div>
      </div>
    </div>
  )
}
