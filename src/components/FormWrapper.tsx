import { Form, FormikErrors, FormikTouched } from 'formik'
import React from 'react'
import { FormErrors } from '../types/FormErrors'
import Input, { InputProps } from './Input'

interface FormWrapperProps {
  inputs: InputProps[]
  errors: FormikErrors<unknown>
  serverErrors: FormErrors
  touched: FormikTouched<unknown>
  isValid: boolean
  formClasses?: string
  fieldClasses?: string
  buttonsClasses?: string
  buttons: {
    handleCancel?: () => unknown
    cancelLabel?: string
    submitLabel: string
    successLabel: string
  }
  success: boolean
  loading: boolean
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  inputs,
  formClasses = 'grid grid-cols-1 gap-4 pt-4',
  fieldClasses,
  buttonsClasses = '',
  errors,
  serverErrors,
  touched,
  isValid,
  buttons: { cancelLabel, handleCancel, submitLabel, successLabel },
  success,
  loading
}) => {
  return (
    <>
      <Form className={formClasses}>
        {inputs.map(input => (
          <Input
            key={input.name}
            {...{
              ...input,
              realtimeError: errors[input.name],
              serverErrors: serverErrors[input.name],
              touched: touched[input.name],
              fieldClasses
            }}
          />
        ))}
        <div
          className={
            handleCancel
              ? `w-full grid gap-4 md:grid-cols-2 ${buttonsClasses}`
              : `w-full pt-6 ${buttonsClasses}`
          }
        >
          {handleCancel ? (
            <button
              type='button'
              onClick={handleCancel}
              className='h-10 p-4 py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 rounded bg-surface-600 hover:bg-surface-400'
            >
              {cancelLabel || 'cancel'}
            </button>
          ) : null}
          <button
            type='submit'
            className={`h-10 p-4 py-1 text-sm font-medium tracking-wider uppercase transition-colors duration-200 rounded w-full
                    ${
                      success
                        ? 'bg-success-500 hover:bg-success-400 text-success-100 hover:text-success-50 cursor-not-allowed'
                        : loading || !isValid
                        ? 'bg-surface-500 text-surface-200 cursor-not-allowed'
                        : 'bg-link-600 hover:bg-link-400 text-link-100 hover:text-link-50'
                    }`}
            disabled={loading || success || !isValid}
          >
            {loading ? 'Loading...' : success ? successLabel : submitLabel}
          </button>
        </div>
      </Form>
    </>
  )
}

export default FormWrapper
