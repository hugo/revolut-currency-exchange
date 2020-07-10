import React from 'react'
import {render} from '@testing-library/react'

import {NarrowContainer} from './NarrowContainer'

test('<NarrowContainer />', () => {
  const content = 'content'
  const {getByText} = render(<NarrowContainer>{content}</NarrowContainer>)

  expect(getByText(content)).toBeInTheDocument()
})
