import React from 'react'
import {Currency} from '../lib/currency'

type Props = {
  amount: number
  locale?: string | string[]
  options?: Intl.NumberFormatOptions
}

const FormattedCurrency: React.FC<Props> = ({
  amount,
  options = {},
  locale = 'en-GB',
}) => (
  <>
    {amount.toLocaleString(locale, {
      currency: 'GBP',
      style: 'currency',
      ...options,
    })}
  </>
)

export default FormattedCurrency
