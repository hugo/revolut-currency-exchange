import React from 'react'

import {ExchangePocket} from './ExchangePocket'
import {ExchangeRateDisplay} from './ExchangeRateDisplay'

export const Exchange: React.FC = ({children}) => (
  <div className="rounded-md overflow-hidden border border-gray-300">
    <div className="bg-white">
      <div className="p-6">
        <ExchangePocket />
      </div>
    </div>

    <div className="-my-4 flex justify-center items-center">
      <span className="text-blue-500">
        <ExchangeRateDisplay from="GBP" to="USD" rate="1.2345" />
      </span>
    </div>

    <div className="bg-gray-400">
      <div className="p-6">
        <ExchangePocket />
      </div>
    </div>
  </div>
)
