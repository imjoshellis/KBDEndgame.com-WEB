import { Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import slugid from 'slugid'
import FormWrapper from '../../../src/components/FormWrapper'
import { InputProps } from '../../../src/components/Input'
import {
  NewKeyboardInput,
  useKeyboardQuery,
  useUpdateKeyboardMutation
} from '../../../src/generated/graphql'
import RegularPageProtected from '../../../src/layouts/RegularPageProtected'
import { FormErrors } from '../../../src/types/FormErrors'
import { createUrqlClient } from '../../../src/util/createUrqlClient'
import { handleErrors } from '../../../src/util/handleErrors'

import * as Yup from 'yup'
import Head from 'next/head'

export const KeyboardSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(4, 'Too Short!')
    .max(260, 'Too Long!'),
  image: Yup.string().url('Must be valid URL starting with http(s)://')
})

export const UpdateKeyboard: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState('')
  const [slug, setSlug] = useState('')
  const [, updateKeyboard] = useUpdateKeyboardMutation()
  const [{ data }] = useKeyboardQuery({ variables: { id }, pause: !id })
  const keyboard = data?.keyboard

  useEffect(() => {
    if (router && router.query.slug) {
      setId(slugid.decode(router.query.slug))
      setSlug(router.query.slug as string)
    }
  }, [router])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverErrors, setServerErrors] = useState<FormErrors>({})

  return (
    <RegularPageProtected>
      <Head>
        <title>KBD Endgame - Edit Keyboard</title>
      </Head>
      <div className='flex flex-col flex-grow w-full'>
        <h1 className='text-xl font-medium'>Updating Keyboard</h1>
        {Object.values(serverErrors).length > 0 ? (
          <div className='p-2 mt-2 text-center rounded bg-danger-500 text-danger-100'>
            There were some errors when updating your keyboard.
          </div>
        ) : null}
        {keyboard ? (
          <Formik
            initialValues={{
              title: keyboard.title,
              description: keyboard.description || '',
              image: keyboard.image || ''
            }}
            validationSchema={KeyboardSchema}
            onSubmit={async values => {
              const { title, description, image } = values
              setServerErrors({})
              setSuccess(false)
              setLoading(true)
              const input = { title } as NewKeyboardInput
              if (description && description.trim())
                input.description = description
              if (image && image.trim()) input.image = image
              const response = await updateKeyboard({ id, input })
              setLoading(false)
              const errorResponse = response.data?.updateKeyboard.errors
              if (errorResponse) {
                setServerErrors(
                  handleErrors({
                    errorResponse,
                    types: Object.keys(values)
                  })
                )
              } else {
                setSuccess(true)
                router.push(`/kbd/${slug}`)
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
                { name: 'title' },
                {
                  name: 'description',
                  optional: true,
                  type: 'textarea'
                },
                { name: 'image', optional: true }
              ] as InputProps[]

              const buttons = {
                handleCancel: () => router.back(),
                submitLabel: 'update keyboard',
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
        ) : (
          'Loading...'
        )}
      </div>
    </RegularPageProtected>
  )
}

export default withUrqlClient(createUrqlClient)(UpdateKeyboard)
