import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUpdateUser } from './useUpdateUser'

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState
  const { t } = useTranslation()

  const { updateUser, isUpdating } = useUpdateUser()

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={t('updatePasswordForm.passwordLabel')} error={errors?.password}>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: t('updatePasswordForm.required'),
            minLength: {
              value: 8,
              message: t('updatePasswordForm.minLength'),
            },
          })}
        />
      </FormRow>

      <FormRow label={t('updatePasswordForm.confirmPassword')} error={errors?.passwordConfirm}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: t('updatePasswordForm.required'),
            validate: value =>
              getValues().password === value || t('updatePasswordForm.passwordsMatch'),
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' $variation='secondary'>
          {t('updatePasswordForm.cancel')}
        </Button>
        <Button disabled={isUpdating}>{t('updatePasswordForm.updatePassword')}</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
