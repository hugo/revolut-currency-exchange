import React from 'react'
import {render} from '@testing-library/react'

import FormattedCurrency from './FormattedCurrency'

describe('<FormattedCurrency />', () => {
  test('£1,337.69', () => {
    const amount = 1337.69
    const formatted = '£1,337.69'
    const {getByText} = render(<FormattedCurrency amount={amount} />)

    expect(getByText(formatted)).toBeInTheDocument()
  })

  test('£1,338', () => {
    const amount = 1337.69
    const formatted = '£1,338'
    const {getByText} = render(
      <FormattedCurrency
        amount={amount}
        options={{
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
      />
    )

    expect(getByText(formatted)).toBeInTheDocument()
  })

  test('$1,337.69', () => {
    const amount = 1337.69
    const formatted = '$1,337.69'
    const {getByText} = render(
      <FormattedCurrency
        amount={amount}
        locale="en-US"
        options={{
          currency: 'USD',
        }}
      />
    )

    expect(getByText(formatted)).toBeInTheDocument()
  })
})
