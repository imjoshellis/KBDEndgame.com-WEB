import { Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import React, { useEffect, useState } from 'react'
import FormWrapper from '../src/components/FormWrapper'
import { InputProps } from '../src/components/Input'
import { useAuth } from '../src/context/auth/AuthProvider'
import {
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../src/generated/graphql'
import { RegularPageProtected } from '../src/layouts/RegularPageProtected'
import { FormErrors } from '../src/types/FormErrors'
import { createUrqlClient } from '../src/util/createUrqlClient'
import { handleErrors } from '../src/util/handleErrors'

import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AccountSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(15, 'Too Long!')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'username may only contain letters, numbers, or underscores'
    )
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

export const Login: React.FC = () => {
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverErrors, setServerErrors] = useState<FormErrors>({})
  const { user } = useAuth()
  const [, updateUser] = useUpdateUserMutation()
  const { username, email, id } = user
    ? user
    : { username: '', email: '', id: '' }
  const [, deleteAccount] = useDeleteUserMutation()

  const router = useRouter()

  return (
    <RegularPageProtected>
      <Head>
        <title>KBD Endgame - Your Account</title>
      </Head>
      <div className='flex flex-col flex-grow w-full'>
        {user ? (
          <>
            <h1 className='text-3xl font-medium'>Hello {username}</h1>
            {Object.values(serverErrors).length > 0 ? (
              <div className='p-2 mt-2 text-center rounded bg-danger-500 text-danger-100'>
                There were some errors when updating your account.
              </div>
            ) : null}
            <Formik
              initialValues={{ username, email }}
              validationSchema={AccountSchema}
              onSubmit={async values => {
                setServerErrors({})
                setSuccess(false)
                setLoading(true)
                const response = await updateUser({ input: { ...values } })
                setLoading(false)
                const errorResponse = response.data?.updateUser.errors
                if (errorResponse) {
                  setServerErrors(
                    handleErrors({
                      errorResponse,
                      types: Object.keys(values)
                    })
                  )
                } else {
                  setSuccess(true)
                }
              }}
            >
              {({ errors, values, touched, setTouched, isValid }) => {
                useEffect(() => {
                  setSuccess(false)
                }, [values])
                useEffect(() => {
                  setTouched({})
                }, [serverErrors])

                const inputs = [
                  { name: 'username' },
                  {
                    name: 'email'
                  }
                ] as InputProps[]

                const buttons = {
                  submitLabel: 'update account',
                  successLabel: 'success!'
                }

                return (
                  <FormWrapper
                    {...{
                      inputs,
                      errors,
                      serverErrors,
                      touched,
                      isValid,
                      success,
                      loading,
                      buttons
                    }}
                  />
                )
              }}
            </Formik>
            <button
              onClick={() => setDeleteClicked(true)}
              className='mt-4 transition-colors duration-200 text-danger-400 hover:text-danger-50'
            >
              Want to Delete Your Account?
            </button>
          </>
        ) : (
          <div>loading...</div>
        )}
        {deleteClicked ? (
          <div className='grid grid-cols-2 gap-2'>
            <button
              onClick={() => setDeleteClicked(false)}
              className='p-4 py-2 mt-4 text-xs font-medium tracking-wider uppercase transition-colors duration-200 border-2 border-solid rounded text-surface-200 hover:bg-surface-500 border-surface-500 hover:text-danger-50'
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await deleteAccount({ id })
                router.push('/logout')
                // todo: push to homepage and log out
              }}
              className='p-4 py-2 mt-4 text-xs font-medium tracking-wider uppercase transition-colors duration-200 rounded bg-danger-500 text-danger-100 hover:bg-danger-400 hover:text-danger-50'
            >
              yes, Permanently Delete My Account
            </button>
          </div>
        ) : null}
      </div>
    </RegularPageProtected>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
