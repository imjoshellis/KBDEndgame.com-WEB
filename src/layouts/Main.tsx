import { NextPage } from 'next'
import React from 'react'

export const Main: NextPage = ({ children }) => {
  return (
    <main className='flex flex-col items-center justify-center'>
      {children}
    </main>
  )
}

export default Main
