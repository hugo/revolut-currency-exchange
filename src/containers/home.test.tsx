import React from 'react'
import {render} from '@testing-library/react'

import Home from './home'

describe('<Home />', () => {
  test('render', () => {
    const header = 'Exchange'
    const {getByText} = render(<Home />)

    expect(getByText(header)).toBeInTheDocument()
  })
})
