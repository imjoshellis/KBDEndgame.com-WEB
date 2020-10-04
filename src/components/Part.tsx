import { Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import {
  RegularPartFragment,
  UpdatePartInput,
  useDeletePartMutation,
  useUpdatePartMutation
} from '../generated/graphql'
import { FormErrors } from '../types/FormErrors'
import { handleErrors } from '../util/handleErrors'
import FormWrapper from './FormWrapper'
import { InputProps } from './Input'

export const PartSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Required'),
  url: Yup.string().url('Must be valid URL starting with http(s)://')
})

interface PartProps {
  part: RegularPartFragment
  owner: boolean
  getKeyboard: () => void
}

export const Part: React.FC<PartProps> = ({ part, owner, getKeyboard }) => {
  const [hover, setHover] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [, deletePart] = useDeletePartMutation()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverErrors, setServerErrors] = useState<FormErrors>({})
  const [, updatePart] = useUpdatePartMutation()

  useEffect(() => setHover(false), [isEditing])

  return (
    <div
      className='flex flex-col p-4 py-2 mb-2 rounded bg-surface-700'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isEditing ? (
        <Formik
          initialValues={{
            title: part.title,
            url: part.url || '',
            price: part.price || 0
          }}
          validationSchema={PartSchema}
          onSubmit={async values => {
            const { title, url, price } = values
            setServerErrors({})
            setSuccess(false)
            setLoading(true)
            const input = {} as UpdatePartInput
            if (title && title.trim()) input.title = title
            if (url && url.trim()) input.url = url
            if (price > 0) input.price = price
            const response = await updatePart({ id: part.id, input })
            setLoading(false)
            const errorResponse = response.data?.updatePart.errors
            if (errorResponse) {
              setServerErrors(
                handleErrors({
                  errorResponse,
                  types: Object.keys(values)
                })
              )
            } else {
              setSuccess(true)
              setIsEditing(false)
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
              handleCancel: () => setIsEditing(false),
              submitLabel: 'save',
              successLabel: 'success!'
            }
            return (
              <FormWrapper
                {...{
                  inputs,
                  errors,
                  serverErrors,
                  touched,
                  success,
                  loading,
                  buttons,
                  isValid
                }}
                formClasses='grid grid-cols-1 gap-4 lg:grid-cols-2 w-full'
                fieldClasses='bg-surface-800'
                buttonsClasses='items-end'
              />
            )
          }}
        </Formik>
      ) : (
        <>
          <div className='flex justify-between'>
            <h3 className='text-lg'>{part.title}</h3>
            {hover && owner ? (
              <div className='flex'>
                <button
                  className='p-2 py-0 mr-2 rounded bg-link-500 hover:bg-link-400 '
                  onClick={() => setIsEditing(true)}
                >
                  edit
                </button>
                {!confirmDelete ? (
                  <button
                    className='p-2 py-0 rounded bg-danger-500 hover:bg-danger-400 '
                    onClick={() => setConfirmDelete(true)}
                  >
                    delete
                  </button>
                ) : (
                  <button
                    className='p-2 py-0 rounded bg-danger-500 hover:bg-danger-400'
                    onClick={async () => {
                      await deletePart({ id: part.id })
                      getKeyboard()
                    }}
                  >
                    are you sure?
                  </button>
                )}
              </div>
            ) : part.price ? (
              <p className=''>${part.price.toFixed(2)}</p>
            ) : null}
          </div>
          {part.url ? (
            <div>
              <Link href={part.url}>
                <a
                  className='text-sm text-link-500 hover:no-underline hover:text-link-300'
                  target='_blank'
                >
                  <span>{part.url}</span>
                  <span className='text-xs opacity-75'>↗︎</span>
                </a>
              </Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Part
