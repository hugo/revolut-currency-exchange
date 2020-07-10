import React from 'react'

import {ExchangePocket} from './ExchangePocket'

export const Exchange: React.FC = ({children}) => (
  <div className="rounded-md overflow-hidden border border-gray-300">
    <div className="bg-white">
      <div className="p-6">
        <ExchangePocket />
      </div>
    </div>

    <div className="-my-4 flex justify-center items-center">
      <div className="bg-white border border-gray-200 shadow-sm rounded-full overflow-hidden px-2 py-1">
        <span className="text-xs font-semibold">exchange rate</span>
      </div>
    </div>

    <div className="bg-gray-400">
      <div className="p-6">
        <ExchangePocket />
      </div>
    </div>
  </div>
)
