import React from 'react'
import {render} from '@testing-library/react'

import {ExchangeRateDisplay} from './ExchangeRateDisplay'

test('<ExchangeRateDisplay />', () => {
  const rate = '1.1234'
  const text = `$1 = £${rate}`
  const {getByText} = render(
    <ExchangeRateDisplay from="USD" to="GBP" rate={rate}>
      {text}
    </ExchangeRateDisplay>
  )

  expect(getByText(text)).toBeInTheDocument()
})
