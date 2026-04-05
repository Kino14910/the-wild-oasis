import React, { useEffect, useRef } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
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

const StyledPopover = styled.div`
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0;
  margin-top: 0.4rem;
  border: none;
  position-area: bottom;
  min-width: max-content;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
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
    color: var(--color-grey-500);
    transition: all 0.3s;
  }
`

interface MenuButtonProps {
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

function Menu({ children }: { children: React.ReactNode }) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const toggle = toggleRef.current
    const popover = popoverRef.current

    if (toggle && popover && 'interestForElement' in toggle) {
      ;(toggle as any).interestForElement = popover
    }
  }, [])

  return (
    <StyledMenu>
      <StyledToggle ref={toggleRef} aria-haspopup='menu'>
        <HiEllipsisVertical />
      </StyledToggle>

      <StyledPopover ref={popoverRef} role='menu' popover='hint'>
        {children}
      </StyledPopover>
    </StyledMenu>
  )
}

function MenuButton({
  icon,
  label,
  onClick,
  disabled,
  children,
}: MenuButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {icon} {label} {children}
    </StyledButton>
  )
}

Menu.Button = MenuButton

export default Menu
