import {createMachine, assign, send} from 'xstate'

import {Currency} from './currency'
import {cancel} from 'xstate/lib/actions'

type Context = {
  from: Currency
  to: Currency
  fromAmount?: string
  toAmount?: string
  pockets: Record<Currency, number>
  rate?: number
  error?: Error
  pollExchangeRate(from: Currency, to: Currency): Promise<number>
}

type Event =
  | {type: 'CHANGE_FROM_CURRENCY'; currency: Currency}
  | {type: 'CHANGE_TO_CURRENCY'; currency: Currency}
  | {type: 'SWITCH_CURRENCIES'}
  | {type: 'CHANGE_FROM_AMOUNT'; amount?: string}
  | {type: 'CHANGE_TO_AMOUNT'; amount?: string}
  | {type: 'CONVERT_FROM'}
  | {type: 'CONVERT_TO'}

type State =
  | {value: 'initial'; context: Context}
  | {value: 'poll.initial'; context: Context}
  | {value: 'poll.idle'; context: Context}
  | {value: 'poll.polling'; context: Context}

export const exchangeMachine = createMachine<Context, Event, State>({
  context: {
    from: 'GBP',
    to: 'USD',
    pockets: {
      GBP: 0,
      USD: 0,
      EUR: 0,
    },
    pollExchangeRate() {
      return Promise.reject(
        new Error('Must provide `pollExchangeRate` function')
      )
    },
  },
  initial: 'initial',
  type: 'parallel',
  states: {
    initial: {},
    poll: {
      initial: 'initial',
      states: {
        initial: {
          after: {
            1: 'polling',
          },
        },
        idle: {
          on: {
            CHANGE_FROM_CURRENCY: [
              {
                target: 'polling',
                actions: assign({
                  to: (ctx) => ctx.from,
                  from: (_ctx, evt) => evt.currency,
                }),
                cond: (ctx, evt) => ctx.to === evt.currency,
              },
              {
                target: 'polling',
                actions: assign({
                  from: (_ctx, evt) => evt.currency,
                }),
              },
            ],
            CHANGE_TO_CURRENCY: [
              {
                target: 'polling',
                actions: assign({
                  from: (ctx) => ctx.from,
                  to: (_ctx, evt) => evt.currency,
                }),
                cond: (ctx, evt) => ctx.from === evt.currency,
              },
              {
                target: 'polling',
                actions: assign({
                  to: (_ctx, evt) => evt.currency,
                }),
              },
            ],
            SWITCH_CURRENCIES: {
              target: 'polling',
              actions: assign({
                from: (ctx) => ctx.to,
                to: (ctx) => ctx.from,
              }),
            },
            CHANGE_FROM_AMOUNT: {
              actions: [
                assign({fromAmount: (_ctx, evt) => evt.amount}),
                cancel('convetTo'),
                send('CONVERT_TO', {
                  delay: 500,
                  id: 'convetTo',
                }),
              ],
            },
            CHANGE_TO_AMOUNT: {
              actions: [
                assign({toAmount: (_ctx, evt) => evt.amount}),
                cancel('convertFrom'),
                send('CONVERT_FROM', {
                  delay: 500,
                  id: 'convertFrom',
                }),
              ],
            },
            CONVERT_FROM: {
              actions: assign({
                fromAmount: ({toAmount = '0', rate = 1}) =>
                  (parseFloat(toAmount) / rate).toFixed(2),
              }),
            },
            CONVERT_TO: {
              actions: assign({
                toAmount: ({fromAmount = '0', rate = 1}) =>
                  (parseFloat(fromAmount) * rate).toFixed(2),
              }),
            },
          },
          after: {
            10000: 'polling',
          },
        },
        polling: {
          invoke: {
            src: (ctx) => ctx.pollExchangeRate(ctx.from, ctx.to),
            onDone: {
              target: 'idle',
              actions: assign({rate: (_ctx, evt) => evt.data}),
            },
            onError: {
              target: 'idle',
              actions: assign({error: (_ctx, evt) => evt.data}),
            },
          },
        },
      },
    },
  },
})
