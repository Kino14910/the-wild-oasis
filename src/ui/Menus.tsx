import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

type ListProps = {
  $position: { x: number; y: number }
}

const StyledList = styled.ul<ListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  ${({ $position: { x, y } }) => css`
    left: ${x}px;
    top: ${y}px;
  `}
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`

type MenuContextType = {
  openId: string
  open: (id: string) => void
  close: () => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

const MenuContext = createContext<MenuContextType>(undefined)

function Menus({ children }) {
  const [openId, setOpenId] = useState('false')
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const open = setOpenId
  const close = () => setOpenId('')
  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  )
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext)
  function handleClick(e) {
    e.stopPropagation()
    const rect = e.target.closest('button').getBoundingClientRect()
    setPosition({ x: rect.x, y: rect.bottom })
    openId === id && openId !== '' ? close() : open(id)
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext)
  const ref = useOutsideClick(close)
  if (openId !== id) return null
  return createPortal(
    <StyledList
      $position={position}
      ref={ref as React.RefObject<HTMLUListElement>}
    >
      {children}
    </StyledList>,
    document.body,
  )
}

function Button({
  icon,
  label,
  onClick,
  children,
  disabled,
}: {
  icon: any
  label?: string
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
}) {
  const { close } = useContext(MenuContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} {label} {children}
      </StyledButton>
    </li>
  )
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>
}

Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
Menus.Menu = Menu
export default Menus
