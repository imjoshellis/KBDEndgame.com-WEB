import { Form } from 'formik'
import React from 'react'
import { FormErrors } from '../types/FormErrors'
import Input, { InputProps } from './Input'

interface FormWrapperProps {
  inputs: InputProps[]
  errors: FormErrors
  buttons: {
    handleCancel?: () => unknown
    submitLabel: string
    successLabel: string
  }
  success: boolean
  loading: boolean
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  inputs,
  errors,
  buttons: { handleCancel, submitLabel, successLabel },
  success,
  loading
}) => {
  return (
    <>
      <Form className='flex flex-col'>
        {inputs.map(input => (
          <Input key={input.name} {...{ ...input, errors }} />
        ))}
        <div className={handleCancel ? 'grid gap-2 md:grid-cols-2' : ''}>
          {handleCancel ? (
            <button
              type='button'
              onClick={handleCancel}
              className='p-4 py-2 mt-4 text-sm font-medium tracking-wider uppercase transition-colors duration-200 rounded bg-surface-600 hover:bg-surface-400'
            >
              back
            </button>
          ) : null}
          <button
            type='submit'
            className={`p-4 py-2 mt-4 text-sm font-medium tracking-wider uppercase transition-colors duration-200 rounded w-full
                    ${
                      success
                        ? 'bg-success-500 hover:bg-success-400 text-success-100 hover:text-success-50'
                        : loading
                        ? 'bg-surface-500 text-surface-200'
                        : 'bg-link-600 hover:bg-link-400 text-link-100 hover:text-link-50'
                    }`}
            disabled={loading || success}
          >
            {loading ? 'Loading...' : success ? successLabel : submitLabel}
          </button>
        </div>
      </Form>
    </>
  )
}

export default FormWrapper
