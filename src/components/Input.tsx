import { Field } from 'formik'
import React from 'react'

export interface InputProps {
  name: string
  label?: string
  realtimeError?: string
  serverErrors?: string[]
  touched?: boolean
  fieldClasses?: string
  type?: 'textarea' | 'number'
  optional?: boolean
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  fieldClasses,
  realtimeError,
  serverErrors,
  touched,
  optional
}) => {
  return (
    <div className='flex flex-col w-full'>
      <label className='text-sm font-medium tracking-wider uppercase text-surface-300'>
        {label ? label : name}
        {optional ? (
          <span className='text-xs text-accent-400'> optional</span>
        ) : (
          <span className='text-xs text-warning-500'> required</span>
        )}
      </label>
      <Field
        name={name}
        className={`h-10 p-2 py-1 mt-1 text-lg rounded bg-surface-700 border-2 border-surface-700 ${fieldClasses} ${
          touched
            ? realtimeError
              ? 'border-danger-600 bg-danger-900'
              : 'border-success-600 bg-success-900'
            : serverErrors && serverErrors.length > 0
            ? 'border-danger-600 bg-danger-900'
            : serverErrors
            ? 'border-success-600 bg-success-900'
            : null
        }`}
        component={type === 'textarea' ? 'textarea' : null}
        type={type === 'number' ? 'number' : 'text'}
      />
      {realtimeError && touched ? (
        <li className='flex mb-1 text-danger-200'>
          <span className='mr-1 text-danger-500'>• </span>
          <span>{realtimeError}</span>
        </li>
      ) : null}
      {serverErrors && !touched ? (
        <ul>
          {serverErrors.map((_err, idx) => (
            <li key={idx} className='flex mb-1 text-danger-200'>
              <span className='mr-1 text-danger-500'>• </span>
              <span>{_err}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Input
