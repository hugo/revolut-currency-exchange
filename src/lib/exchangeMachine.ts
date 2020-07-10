import {createMachine, assign} from 'xstate'

import {Currency} from './currency'

type Context = {
  from: Currency
  to: Currency
  pockets: Record<Currency, number>
  rate?: number
  error?: Error
  pollExchangeRate(from: Currency, to: Currency): Promise<number>
}

type Event =
  | {type: 'CHANGE_FROM_CURRENCY'; currency: Currency}
  | {type: 'CHANGE_TO_CURRENCY'; currency: Currency}

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
