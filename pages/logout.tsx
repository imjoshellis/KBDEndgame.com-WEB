import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { useLogoutMutation } from '../src/generated/graphql'
import { createUrqlClient } from '../src/util/createUrqlClient'

export const Logout: NextPage<any> = ({ resetUrqlClient }) => {
  const [, logout] = useLogoutMutation()
  const router = useRouter()
  useEffect(() => {
    resetUrqlClient()
    const awaitLogout = async () => await logout()
    awaitLogout().then(() => router.replace('/'))
  }, [])
  return <div>Logging out... Please wait.</div>
}

export default withUrqlClient(createUrqlClient)(Logout)
