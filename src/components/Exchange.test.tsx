import React from 'react'
import {render, act, waitFor, screen, fireEvent} from '@testing-library/react'

import {Exchange} from './Exchange'

const pockets = {
  GBP: 0,
  EUR: 0,
  USD: 0,
}

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
      <Exchange pockets={pockets} pollExchangeRate={pollExchangeRate} />
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
    render(<Exchange pockets={pockets} pollExchangeRate={pollExchangeRate} />)

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

  test('exchange GBP to USD', async () => {
    const rate = 1.1
    const pockets = {
      GBP: 1000,
      USD: 0,
      EUR: 0,
    }
    const value = 100
    const pollExchangeRate = jest.fn().mockResolvedValue(rate)
    const {getByText, getAllByPlaceholderText} = render(
      <Exchange pockets={pockets} pollExchangeRate={pollExchangeRate} />
    )
    const button = getByText('Exchange')
    const [input] = getAllByPlaceholderText('0')

    act(() => {
      jest.advanceTimersByTime(1)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByText(`Balance: £1,000.00`))
    await waitFor(() => screen.getByText(`Balance: $0.00`))

    act(() => {
      fireEvent.change(input, {target: {value}})
      // Conversion is debounced
      jest.advanceTimersByTime(500)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByDisplayValue('110.00'))

    act(() => {
      fireEvent.click(button)
    })

    // GBP balance reduced
    await waitFor(() => screen.getByText(`Balance: £900.00`))
    // USD balance increased
    await waitFor(() => screen.getByText(`Balance: $110.00`))
    // App is "reset" and button is disabled again
    expect(button).toBeDisabled()
  })

  test('insufficient balance', async () => {
    const rate = 1.1
    const pockets = {
      GBP: 0,
      USD: 0,
      EUR: 0,
    }
    const value = 100
    const pollExchangeRate = jest.fn().mockResolvedValue(rate)
    const {getByText, getAllByPlaceholderText} = render(
      <Exchange pockets={pockets} pollExchangeRate={pollExchangeRate} />
    )
    const button = getByText('Exchange')
    const [input] = getAllByPlaceholderText('0')

    act(() => {
      jest.advanceTimersByTime(1)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByText(`Balance: £0.00`))
    await waitFor(() => screen.getByText(`Balance: $0.00`))

    act(() => {
      fireEvent.change(input, {target: {value}})
      jest.advanceTimersByTime(500)
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => screen.getByDisplayValue('110.00'))

    act(() => {
      fireEvent.click(button)
    })

    // Warning message displayed
    expect(getByText('Insufficient balance')).toBeInTheDocument()
    // Button not clickable
    expect(button).toBeDisabled()
  })
})
