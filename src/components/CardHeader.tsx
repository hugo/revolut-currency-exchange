import React from 'react'

export const CardHeader: React.FC = ({children}) => (
  <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
  </div>
)
