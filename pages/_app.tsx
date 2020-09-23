import { withUrqlClient } from 'next-urql'
import { AppProps } from 'next/app'
import AuthProvider from '../src/context/auth/AuthProvider'
import { createUrqlClient } from '../src/util/createUrqlClient'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default withUrqlClient(createUrqlClient)(MyApp)
