import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { signup as signupApi } from '../../services/apiAuth'

export function useSignup() {
  const { t } = useTranslation()

  const { mutate: signup, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(t('hooks.signup.success'))
    },
    onError: error => {
      console.error(error.message)
      toast.error(error.message)
    },
  })

  return { signup, isPending }
}
