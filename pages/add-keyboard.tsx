import { Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import slugid from 'slugid'
import FormWrapper from '../src/components/FormWrapper'
import { InputProps } from '../src/components/Input'
import {
  NewKeyboardInput,
  useCreateKeyboardMutation
} from '../src/generated/graphql'
import { RegularPageProtected } from '../src/layouts/RegularPageProtected'
import { FormErrors } from '../src/types/FormErrors'
import { createUrqlClient } from '../src/util/createUrqlClient'
import { handleErrors } from '../src/util/handleErrors'

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

export const AddKeyboard: NextPage = () => {
  const router = useRouter()
  const [, createKeyboard] = useCreateKeyboardMutation()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverErrors, setServerErrors] = useState<FormErrors>({})

  return (
    <RegularPageProtected>
      <Head>
        <title>KBD Endgame - Add New Keyboard</title>
      </Head>
      <div className='flex flex-col flex-grow w-full'>
        <h1 className='text-xl font-medium'>Add New Keyboard</h1>
        {Object.values(serverErrors).length > 0 ? (
          <div className='p-2 mt-2 text-center rounded bg-danger-500 text-danger-100'>
            There were some errors when create your keyboard.
          </div>
        ) : null}
        <Formik
          initialValues={{ title: '', description: '', image: '' }}
          onSubmit={async values => {
            const { title, description, image } = values
            setServerErrors({})
            setSuccess(false)
            setLoading(true)
            const input = { title } as NewKeyboardInput
            if (description.trim()) input.description = description
            if (image.trim()) input.image = image
            const response = await createKeyboard({
              input
            })
            setLoading(false)
            const errorResponse = response.data?.createKeyboard.errors
            if (errorResponse) {
              setServerErrors(
                handleErrors({
                  errorResponse,
                  types: Object.keys(values)
                })
              )
            } else {
              console.log(response)
              setSuccess(true)
              const slug = slugid.encode(
                response.data?.createKeyboard.keyboard!.id
              )
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
              submitLabel: 'create keyboard',
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
      </div>
    </RegularPageProtected>
  )
}

export default withUrqlClient(createUrqlClient)(AddKeyboard)
