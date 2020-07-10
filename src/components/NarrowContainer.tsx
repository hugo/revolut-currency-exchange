import React from 'react'

export const NarrowContainer: React.FC = ({children}) => (
  <div className="w-full max-w-7xl mx-auto px-4">
    <div className="w-full max-w-3xl mx-auto">{children}</div>
  </div>
)
