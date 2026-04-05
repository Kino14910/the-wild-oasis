import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'

const StyledDialog = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  color: var(--color-grey-500);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  border: none;
  outline: none;
  z-index: 1001;

  &::backdrop {
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && dialog.open === false) {
      dialog.showModal()
    } else if (!isOpen && dialog.open === true) {
      dialog.close()
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleDialogCancel = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <StyledDialog ref={dialogRef} onCancel={handleDialogCancel}>
      <CloseButton onClick={handleClose} type='button'>
        <HiXMark />
      </CloseButton>
      <div>{children}</div>
    </StyledDialog>
  )
}

export default Modal
