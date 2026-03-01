import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { logout as logoutApi } from '../../services/apiAuth'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logout, isLoading } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate('/login', { replace: true })
      queryClient.removeQueries()
    },
  })
  return { logout, isLoading }
}
