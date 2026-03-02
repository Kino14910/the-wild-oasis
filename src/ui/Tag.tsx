import styled, { css } from 'styled-components'

type TagProps = {
  $type: string
}

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  ${({ $type }) => css`
    color: var(--color-${$type}-700);
    background-color: var(--color-${$type}-100);
  `}
`

export default Tag
