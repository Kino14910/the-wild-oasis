import styled, { css } from 'styled-components'

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
}

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background: var(--color-brand-600);

    &:hover {
      background: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background: var(--color-red-700);

    &:hover {
      background: var(--color-red-800);
    }
  `,
}

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  // 过时的写法， 配合页面底部的Button.defaultProps使用
  /* ${props => sizes[props.size]}
  ${props => variations[props.variation]} */

  /* ${props => {
    const { $size = 'medium', $variation = 'primary' } = props
    return css`
      ${sizes[$size]}
      ${variations[$variation]}
    `
  }} */
    //上面的写法可以换成下面这样，在参数处解构，看起来更简洁
  ${({ $size = 'medium', $variation = 'primary' }) => css`
    ${sizes[$size]}
    ${variations[$variation]}
  `}
`

// Button.defaultProps = {
//   variation: 'primary',
//   size: 'medium',
// }

export default Button
