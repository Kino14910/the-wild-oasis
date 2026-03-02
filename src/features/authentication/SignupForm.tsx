import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignup } from './useSignup'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup()
  const { register, handleSubmit, getValues, reset, formState } = useForm()
  const { errors } = formState
  const { t } = useTranslation()

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    )
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={t('signupForm.fullName')} error={errors?.fullName}>
        <Input
          type='text'
          id='fullName'
          disabled={isPending}
          {...register('fullName', { required: t('signupForm.required') })}
        />
      </FormRow>

      <FormRow label={t('signupForm.email')} error={errors?.email}>
        <Input
          type='email'
          id='email'
          disabled={isPending}
          {...register('email', {
            required: t('signupForm.required'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('signupForm.validEmail'),
            },
          })}
        />
      </FormRow>

      <FormRow label={t('signupForm.password')} error={errors?.password}>
        <Input
          type='password'
          id='password'
          disabled={isPending}
          {...register('password', {
            required: t('signupForm.required'),
            minLength: {
              value: 8,
              message: t('signupForm.passwordMinLength'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('signupForm.repeatPassword')}
        error={errors?.passwordConfirm}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isPending}
          {...register('passwordConfirm', {
            required: t('signupForm.required'),
            validate: value =>
              value === getValues().password || t('signupForm.passwordMatch'),
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            $variation='secondary'
            type='reset'
            onClick={reset}
            disabled={isPending}
          >
            {t('signupForm.cancel')}
          </Button>
          <Button>{t('signupForm.createUser')}</Button>
        </>
      </FormRow>
    </Form>
  )
}

export default SignupForm
