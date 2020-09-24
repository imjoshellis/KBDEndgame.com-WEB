import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import RegularPageLayout from '../src/layouts/RegularPageLayout'

export const Login: React.FC = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [moreInfo, setMoreInfo] = useState(false)
  const { error, alert } = router.query

  useEffect(() => {
    if (error) {
      let provider
      if (error === 'github-oauth') {
        provider = 'GitHub'
      }
      if (error === 'google-oauth') {
        provider = 'Google'
      }
      setErrorMsg(
        `There was an error with ${provider} authentication, probably because that email is already in use. If you already created an account using a different service, you'll need to log in that way to access your account.`
      )
    }
  }, [error])

  return (
    <>
      <Head>
        <title>KBD Endgame - Login</title>
      </Head>

      <RegularPageLayout>
        <div className='flex flex-col'>
          <h1 className='text-xl font-medium'>Login</h1>
          {alert ? (
            <div className='p-2 my-2 text-sm rounded bg-warning-400 text-warning-900'>
              <p>You must be logged in to do that.</p>
            </div>
          ) : null}
          {errorMsg ? (
            <div className='p-2 my-2 text-sm rounded bg-danger-600 text-danger-100'>
              <p>{errorMsg}</p>
              <p className='mt-2'>
                For help with this error, email{' '}
                <a
                  href='mailto:support@kbdendgame.com'
                  className='text-danger-50'
                >
                  support@kbdendgame.com
                </a>
              </p>
            </div>
          ) : null}
          <p className='my-2 text-sm italic transition duration-300'>
            If you don't have an account, it will be created when you log in for
            the first time using any of the authentication providers below.{' '}
            {moreInfo ? (
              <>
                You'll be able to change your username once you're logged in.
                KBD Endgame only saves your email address, username, and unique
                identifier. We will not be able to access your GitHub or Google
                profiles directly.
                <button
                  onClick={() => setMoreInfo(!moreInfo)}
                  className='text-link-500 hover:text-link-400'
                >
                  {' '}
                  ...less info
                </button>
              </>
            ) : (
              <button
                onClick={() => setMoreInfo(!moreInfo)}
                className='text-link-500 hover:text-link-400'
              >
                more info...
              </button>
            )}
          </p>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            <a
              href={process.env.NEXT_PUBLIC_API_BASE_URL + 'auth/github'}
              className='flex justify-center p-2 px-4 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-out rounded bg-surface-700 hover:bg-surface-600 hover:ease-in hover:text-surface-50 hover:no-underline'
            >
              Login with GitHub
            </a>
            <a
              href={process.env.NEXT_PUBLIC_API_BASE_URL + 'auth/google'}
              className='flex justify-center p-2 px-4 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-out rounded bg-surface-700 hover:bg-surface-600 hover:ease-in hover:text-surface-50 hover:no-underline'
            >
              Login with Google
            </a>
          </div>
        </div>
      </RegularPageLayout>
    </>
  )
}

export default Login
