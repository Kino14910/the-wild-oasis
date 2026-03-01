import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    // onSuccess: user => {
    //   console.log(user)
    onSuccess: data => {
      navigate('/dashboard', { replace: true })
      queryClient.setQueryData(['user'], data.user)
    },
    onError: error => {
      console.error(error.message)
      toast.error('Provided email or password are incorrect')
    },
  })

  return { login, isLoading }
}
