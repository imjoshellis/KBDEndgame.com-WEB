import { Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import slugid from 'slugid'
import FormWrapper from '../../src/components/FormWrapper'
import { InputProps } from '../../src/components/Input'
import Part from '../../src/components/Part'
import { useAuth } from '../../src/context/auth/AuthProvider'
import {
  NewPartInput,
  RegularKeyboardFragment,
  RegularPartFragment,
  useCreatePartMutation,
  useDeleteKeybardMutation,
  useKeyboardQuery,
  useAddedPartSubscription,
  useDeletedPartSubscription
} from '../../src/generated/graphql'
import RegularPageLayout from '../../src/layouts/RegularPageLayout'
import { FormErrors } from '../../src/types/FormErrors'
import { createUrqlClient } from '../../src/util/createUrqlClient'
import { handleErrors } from '../../src/util/handleErrors'

import * as Yup from 'yup'
import { formatDistanceToNow, toDate } from 'date-fns'
import Head from 'next/head'
import { isServer } from '../../src/util/isServer'

export const PartSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Required'),
  url: Yup.string().url('Must be valid URL starting with http(s)://')
})

export const Keyboard: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<string | null>()
  const [slug, setSlug] = useState('')
  const [parts, setParts] = useState<RegularPartFragment[] | null>(null)
  const [addedPartSubscription] = useAddedPartSubscription({
    variables: { keyboardId: id as string },
    pause: !id || isServer()
  })
  const [deletedPartSubscription] = useDeletedPartSubscription({
    variables: { keyboardId: id as string },
    pause: !id || isServer()
  })
  const [newestPart, setNewestPart] = useState<RegularPartFragment | null>(null)

  useEffect(() => {
    if (addedPartSubscription.data?.addedPart.part)
      setNewestPart(addedPartSubscription.data?.addedPart.part)
  }, [addedPartSubscription])

  useEffect(() => {
    const deletedPart = deletedPartSubscription.data?.deletedPart.part
    if (parts && deletedPart)
      setParts([...parts].filter(p => p.id !== deletedPart.id))
  }, [deletedPartSubscription])

  const [{ data, fetching }] = useKeyboardQuery({
    variables: { id: id as string },
    pause: !id || isServer(),
    requestPolicy: 'cache-and-network'
  })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [, deleteKeyboard] = useDeleteKeybardMutation()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverErrors, setServerErrors] = useState<FormErrors>({})
  const [, createPart] = useCreatePartMutation()
  const [keyboard, setKeyboard] = useState<RegularKeyboardFragment | null>(null)

  const { user } = useAuth()

  useEffect(() => {
    if (data?.keyboard) setKeyboard(data?.keyboard)
  }, [data])

  useEffect(() => {
    keyboard?.parts ? setParts(keyboard?.parts) : null
  }, [keyboard])

  useEffect(() => {
    if (!newestPart) return
    if (!parts) {
      setParts([newestPart])
    } else {
      parts.filter(p => p.id === newestPart.id).length === 0
        ? setParts([...parts, newestPart])
        : null
    }
  }, [newestPart])

  const relativeUpdatedAt = keyboard
    ? formatDistanceToNow(toDate(parseInt(keyboard.updatedAt)))
    : null

  useEffect(() => {
    if (router && router.query.slug) {
      setId(slugid.decode(router.query.slug))
      setSlug(router.query.slug as string)
    }
  }, [router])

  return (
    <RegularPageLayout>
      {keyboard ? (
        <div className='grid w-full grid-cols-1 gap-4'>
          <Head>
            <title>
              KBD Endgame - {keyboard.title} by {keyboard.user.username}
            </title>
          </Head>
          <div className='flex items-baseline justify-between'>
            <div className='flex items-baseline'>
              <h2 className='text-3xl font-medium'>{keyboard.title}</h2>
              <h3 className='ml-1 text-xl text-surface-300'>
                by{' '}
                <Link href={`/u/${keyboard.user.username}`}>
                  <a className='mr-1 text-link-500'>{keyboard.user.username}</a>
                </Link>
              </h3>
            </div>
            <p className='text-sm text-surface-300'>
              updated {relativeUpdatedAt} ago
            </p>
          </div>
          {user && user.id === keyboard.user.id ? (
            <>
              <div className='grid gap-2 my-2 sm:grid-cols-1 md:grid-cols-2'>
                <Link href={`/kbd/${slug}/edit`}>
                  <button className='p-2 py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-in rounded bg-link-500 hover:bg-link-400 text-link-100 hover:text-link-50 hover:ease-out'>
                    edit
                  </button>
                </Link>
                {!confirmDelete ? (
                  <button
                    className='p-2 py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-in rounded bg-danger-500 hover:bg-danger-400 text-danger-100 hover:text-danger-50 hover:ease-out'
                    onClick={() => setConfirmDelete(true)}
                  >
                    delete
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className='p-2 py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-in rounded bg-surface-500 hover:bg-surface-400 text-surface-100 hover:text-surface-50 hover:ease-out'
                  >
                    cancel
                  </button>
                )}
              </div>
              {confirmDelete ? (
                <div className='flex flex-col items-center p-2 mt-2 border-2 rounded border-danger-700 bg-danger-900'>
                  Are you sure you want to delete this keyboard?
                  <button
                    onClick={async () => {
                      await deleteKeyboard({ id: id as string })
                      router.push('/kbd')
                    }}
                    className='p-2 py-1 mt-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 ease-in rounded text-danger-100 hover:text-danger-50 hover:bg-danger-500 hover:ease-out'
                  >
                    yes, permanently delete this keyboard
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
          <div className='flex flex-col flex-grow mb-2 overflow-hidden border-2 rounded border-surface-700 bg-surface-800'>
            {keyboard.image ? (
              <div className='relative z-0 pb-1/2'>
                <img
                  src={keyboard.image}
                  alt={keyboard.title + ' image'}
                  className='absolute object-cover w-full h-full rounded-b-sm'
                />
              </div>
            ) : null}
            <div className='p-4 py-2'>
              <div className='flex flex-wrap items-baseline justify-between'></div>
              <h3 className='text-xl font-medium'>Description</h3>
              <p>{keyboard.description || 'No description'}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 mb-2 overflow-hidden border-2 rounded flex-cols border-surface-700 bg-surface-800'>
            <h3 className='text-xl font-medium'>Parts</h3>
            {parts && parts.length > 0 ? (
              parts.map(part => (
                <Part
                  key={part.id}
                  part={part}
                  owner={user ? user.id === keyboard.user.id : false}
                />
              ))
            ) : (
              <p className='text-surface-300'>No parts</p>
            )}
          </div>
          {user && user.id === keyboard.user.id ? (
            <Formik
              initialValues={{
                title: '',
                url: '',
                price: 0
              }}
              validationSchema={PartSchema}
              onSubmit={async (values, { resetForm }) => {
                const { title, url, price } = values
                setServerErrors({})
                setSuccess(false)
                setLoading(true)
                const input = { title } as NewPartInput
                if (url && url.trim()) input.url = url
                if (price > 0) input.price = price
                const response = await createPart({
                  keyboardId: id as string,
                  input
                })
                setLoading(false)
                const errorResponse = response.data?.createPart.errors
                if (errorResponse) {
                  setServerErrors(
                    handleErrors({
                      errorResponse,
                      types: Object.keys(values)
                    })
                  )
                } else {
                  setSuccess(true)
                  setTimeout(() => resetForm({}), 1000)
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
                    name: 'url',
                    optional: true
                  },
                  { name: 'price', optional: true, type: 'number' }
                ] as InputProps[]

                const buttons = {
                  submitLabel: 'add part',
                  successLabel: 'success!'
                }
                return (
                  <div className='flex flex-col'>
                    <h2 className='text-xl font-medium'>Add Part</h2>
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
                      formClasses='grid grid-cols-1 w-full justify-between lg:grid-cols-4 gap-4 md:grid-cols-2 items-start'
                    />
                  </div>
                )
              }}
            </Formik>
          ) : null}
        </div>
      ) : fetching ? (
        <p>'Loading, please wait...'</p>
      ) : (
        <>
          <p>Keyboard not found</p>
          <Link href='/kbd'>
            <a className='text-link-500 hover:text-link-400'>All keyboards</a>
          </Link>
        </>
      )}
    </RegularPageLayout>
  )
}

export default withUrqlClient(createUrqlClient)(Keyboard)
