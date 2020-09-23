import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RegularUserFragment, useMeQuery } from '../../generated/graphql'

interface AuthProviderProps {}

const AuthContext = createContext<{ user: RegularUserFragment | null }>({
  user: null
})

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { replace, pathname } = useRouter()
  const [user, setUser] = useState<RegularUserFragment | null>(null)
  const [{ data }] = useMeQuery({ requestPolicy: 'cache-and-network' })

  const protectedRouteRegex = new RegExp(`(add|edit|account)`)

  useEffect(() => {
    if (data?.me === null && protectedRouteRegex.test(pathname)) {
      replace('/login?alert=auth')
    }
    setUser(data?.me ? data?.me : null)
  }, [pathname, data])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
