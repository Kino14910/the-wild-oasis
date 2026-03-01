import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './useLogin'

function LoginForm() {
  const [email, setEmail] = useState('jonas@example.com')
  const [password, setPassword] = useState('qweasdzxc')
  const { login, isLoading } = useLogin()
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label={t('loginForm.emailAddress')}>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label={t('loginForm.password')}>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size='large' disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : t('loginForm.logIn')}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
