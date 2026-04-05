import { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add new cabin</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default AddCabin
