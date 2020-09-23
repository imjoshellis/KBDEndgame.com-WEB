import { FieldError } from './../generated/graphql'
import { FormErrors } from '../types/FormErrors'

interface Props {
  errorResponse: FieldError[]
  types: string[]
}

export const handleErrors = ({ errorResponse, types }: Props): FormErrors => {
  const errors = {} as FormErrors

  types.forEach(type => {
    errors[type] = errorResponse
      .filter(_err => _err.field === type)
      .map(_err => _err.message)
  })

  return errors
}
