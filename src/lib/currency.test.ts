import {currencySymbol, Currency} from './currency'

const cases: [Currency, string][] = [
  ['GBP', '£'],
  ['EUR', '€'],
  ['USD', '$'],
]

describe('currencySymbol', () => {
  cases.forEach(([c, s]) =>
    test(`${c}`, () => {
      expect(currencySymbol(c)).toBe(s)
    })
  )

  test('invalid', () =>
    expect(() => currencySymbol('AUD' as Currency)).toThrowError(
      'Unknown currency AUD'
    ))
})
