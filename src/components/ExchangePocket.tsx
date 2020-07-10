import React from 'react'

type Props = {}

export const ExchangePocket: React.FC<Props> = ({}) => (
  <div className="flex">
    <div>
      <div>pocket selector</div>
      <div>pocket balance</div>
    </div>
    <div className="flex-1 text-right">currency input</div>
  </div>
)
