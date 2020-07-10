import React from 'react'
import {render, act, waitFor, screen} from '@testing-library/react'

import {Exchange} from './Exchange'

describe('<Exchange />', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('initial render', async () => {
    const rate = 1.1
    const pollExchangeRate = jest.fn().mockResolvedValue(rate)
    const {queryByText} = render(
      <Exchange pollExchangeRate={pollExchangeRate} />
    )

    expect(queryByText(`${rate}`)).not.toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByText(`£1 = $${rate.toFixed(4)}`))

    expect(pollExchangeRate).toHaveBeenCalledTimes(1)
  })

  test('polling', async () => {
    const initialRate = 1.1
    const polledRate = 1.2
    const pollExchangeRate = jest
      .fn()
      .mockResolvedValueOnce(initialRate)
      .mockResolvedValue(polledRate)
    render(<Exchange pollExchangeRate={pollExchangeRate} />)

    act(() => {
      jest.advanceTimersByTime(1)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByText(`£1 = $${initialRate.toFixed(4)}`))

    act(() => {
      jest.advanceTimersByTime(10000)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByText(`£1 = $${polledRate.toFixed(4)}`))

    expect(pollExchangeRate).toHaveBeenCalledTimes(2)
  })
})
