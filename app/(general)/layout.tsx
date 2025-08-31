import React from 'react'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default GeneralLayout;