import React from 'react'
import {render} from '@testing-library/react'

import Home from './home'

describe('<Home />', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('render', () => {
    const header = 'Exchange Test'
    const {getByText} = render(<Home header={header} />)

    expect(getByText(header)).toBeInTheDocument()
  })
})
