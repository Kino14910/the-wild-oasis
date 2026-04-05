import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'

interface CabinData {
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string | File
  description: string
}

export function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin: CabinData) => createEditCabin(newCabin, null),
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err: Error) => {
      console.error(err)
      toast.error(err.message)
    },
  })

  return { createCabin, isCreating }
}
