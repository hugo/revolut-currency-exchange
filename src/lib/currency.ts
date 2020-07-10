export type Currency = 'GBP' | 'EUR' | 'USD'

export const currencySymbol = (c: Currency) => {
  switch (c) {
    case 'GBP':
      return '£'

    case 'EUR':
      return '€'

    case 'USD':
      return '$'

    default:
      throw new Error(`Unknown currency ${c}`)
  }
}
