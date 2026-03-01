import { useSearchParams } from 'react-router'
import Select from './Select'

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  function handleChange(e) {
    setSearchParams({ sortBy: e.target.value })
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortBy}
      onChange={handleChange}
    />
  )
}

export default SortBy
