import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { updateBooking } from '../../services/apiBookings'

export function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: { bookingId: any; breakfast: any}) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked in!`)
      queryClient.invalidateQueries({ type: 'active' })
      navigate('/')
    },
    onError: error => toast.error(error.message),
  })

  return { checkIn, isCheckingIn }
}
