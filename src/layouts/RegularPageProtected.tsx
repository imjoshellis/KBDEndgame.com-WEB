import { NextPage } from 'next'
import React from 'react'
import { useAuth } from '../context/auth/AuthProvider'
import RegularPageLayout from './RegularPageLayout'

export const RegularPageProtected: NextPage = ({ children }) => {
  const { user } = useAuth()
  return <>{user ? <RegularPageLayout>{children}</RegularPageLayout> : null}</>
}

export default RegularPageProtected
