import styled from 'styled-components'

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s;
  cursor: pointer;
  width: 220px;

  &:hover,
  &:focus {
    background-color: var(--color-brand-600);
  }

  &::picker-icon {
    color: var(--color-grey-500);
    transition: 0.4s rotate;
  }

  &::picker(select) {
    border: none;
    border-radius: 8px;
    opacity: 0;
    transition: all 0.4s allow-discrete;
    top: calc(anchor(bottom));
    background-color: var(--color-grey-0);
  }

  &:open {
    border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
    transition: all 0s;

    &::picker-icon {
      rotate: 180deg;
    }

    &::picker(select) {
      border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
      opacity: 1;
    }
  }

  @starting-style {
    :open::picker(select) {
      opacity: 0;
    }
  }
`

const Option = styled.option`
  display: flex;
  justify-content: flex-start;
  gap: 0.8rem;
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  transition: all 0.4s;
  border-left: 1px solid var(--color-grey-200);
  border-right: 1px solid var(--color-grey-200);
  cursor: pointer;
  color: var(--color-grey-600);

  &:first-of-type {
    border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
    border-top: 1px solid var(--color-grey-300);
    border-bottom: none;
  }

  &:last-of-type {
    border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
    border-bottom: 1px solid var(--color-grey-300);
    border-top: none;
  }

  &:not(:last-of-type) {
    border-bottom: none;
  }

  &:nth-of-type(odd) {
    background-color: var(--color-grey-50);
  }

  &:hover,
  &:focus,
  &:checked {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    font-weight: 600;
  }

  &::checkmark {
    order: 1;
    margin-left: auto;
    content: '☑️';
  }

  .icon {
    font-size: 1.6rem;
    text-box: trim-both cap alphabetic;
  }
`

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      <button>
        <selectedcontent />
      </button>
      {options.map(option => (
        <Option value={option.value} key={option.value}>
          {option.icon && (
            <span className='icon' aria-hidden='true'>
              {option.icon}
            </span>
          )}
          <span className='option-label'>{option.label}</span>
        </Option>
      ))}
    </StyledSelect>
  )
}

export default Select
