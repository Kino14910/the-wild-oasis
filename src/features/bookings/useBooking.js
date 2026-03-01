import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getBooking } from '../../services/apiBookings'

const useBooking = () => {
  const { bookingId } = useParams()
  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  })
  return { booking, error, isLoading }
}

export default useBooking
