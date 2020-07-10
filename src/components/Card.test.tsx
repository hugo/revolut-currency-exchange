import React from 'react'
import {render} from '@testing-library/react'

import {Card} from './Card'

test('<Card />', () => {
  const content = 'content'
  const {getByText} = render(<Card>{content}</Card>)

  expect(getByText(content)).toBeInTheDocument()
})
