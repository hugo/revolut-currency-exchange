import React from 'react'
import {render} from '@testing-library/react'

import {CardHeader} from './CardHeader'

test('<CardHeader />', () => {
  const title = 'title'
  const {getByText} = render(<CardHeader>{title}</CardHeader>)

  expect(getByText(title)).toBeInTheDocument()
})
