import * as z from 'zod'

import {exchangeratesapiHost} from '../config'
import {Currency} from './currency'

const schema = z.object({
  base: z.enum(['GBP', 'USD', 'EUR']),
  date: z.string(),
  rates: z.record(z.number()),
})

export const exchangeRate = async (base: Currency, to: Currency) => {
  const qs = new URLSearchParams({
    base,
    symbols: [to],
  } as any)

  const res = await fetch(`${exchangeratesapiHost}/latest?${qs}`)

  const json = await res.json()

  const {rates} = schema.parse(json)

  if (!rates[to]) {
    throw new Error(`${to} missing in results`)
  }

  return rates[to]
}
