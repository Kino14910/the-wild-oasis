import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import styled, { css } from 'styled-components'

type StyledFormRowProps = {
  $orientation?: string
  children: React.ReactNode
}

const StyledFormRow = styled.div<StyledFormRowProps>`
  display: grid;
  align-items: center;

  grid-template-columns: ${props =>
    props.$orientation === 'vertical' ? '1fr' : '24rem 1fr 1.2fr'};
  gap: ${props => (props.$orientation === 'vertical' ? '0.8rem' : '2.4rem')};

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${props =>
      props.$orientation === 'vertical'
        ? 'none'
        : '1px solid var(--color-grey-100)'};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${props =>
    props.$orientation !== 'vertical' &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function FormRow({
  label,
  error,
  children,
}: {
  label?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  children: React.ReactElement<{ id?: string }>
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{(error as FieldError).message}</Error>}
    </StyledFormRow>
  )
}

export default FormRow
