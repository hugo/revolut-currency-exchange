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
  | {type: 'POLL'}

type State =
  | {value: 'values.editing'; context: Context}
  | {
      value: 'values.validating'
      context: Context & {fromAmount: string; toAmount: string; rate: number}
    }
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
  type: 'parallel',
  states: {
    values: {
      initial: 'editing',
      states: {
        editing: {
          on: {
            CHANGE_FROM_CURRENCY: [
              {
                actions: send({type: 'SWITCH_CURRENCIES'}),
                cond: (ctx, evt) => ctx.to === evt.currency,
              },
              {
                actions: [
                  assign({
                    from: (_ctx, evt) => evt.currency,
                  }),
                  send({type: 'POLL'}),
                ],
              },
            ],
            CHANGE_TO_CURRENCY: [
              {
                actions: send({type: 'SWITCH_CURRENCIES'}),
                cond: (ctx, evt) => ctx.from === evt.currency,
              },
              {
                actions: [
                  assign({
                    to: (_ctx, evt) => evt.currency,
                  }),
                  send({type: 'POLL'}),
                ],
              },
            ],
            SWITCH_CURRENCIES: {
              actions: [
                assign({
                  from: (ctx) => ctx.to,
                  to: (ctx) => ctx.from,
                }),
                send({type: 'POLL'}),
              ],
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
              target: 'validating',
              actions: assign({
                fromAmount: ({toAmount, rate = 1}) =>
                  toAmount
                    ? (parseFloat(toAmount) / rate).toFixed(2)
                    : undefined,
              }),
            },
            CONVERT_TO: {
              target: 'validating',
              actions: assign({
                toAmount: ({fromAmount, rate = 1}) =>
                  fromAmount
                    ? (parseFloat(fromAmount) * rate).toFixed(2)
                    : undefined,
              }),
            },
          },
        },
        validating: {
          always: [
            {
              target: 'editing',
              actions: assign({
                error: (_ctx) => new Error('Insufficient balance'),
              }),
              cond: ({from, fromAmount = '0', pockets}) => {
                const balance = pockets[from]
                const needed = parseFloat(fromAmount)

                return balance < needed
              },
            },
            {
              target: 'editing',
              actions: assign({error: (_ctx) => undefined}),
            },
          ],
        },
      },
    },
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
            POLL: 'polling',
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
