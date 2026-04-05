import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import Empty from '../../ui/Empty'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'

function CabinTable() {
  const { cabins, isLoading, error } = useCabins()
  const [searchParam] = useSearchParams()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (!cabins.length) return <Empty resourceName='cabins' />
  const filterValue = searchParam.get('discount') || 'all'

  let filteredCabins
  switch (filterValue) {
    case 'all':
      filteredCabins = cabins
      break
    case 'with-discount':
      filteredCabins = cabins.filter(cabin => cabin.discount > 0)
      break
    case 'no-discount':
      filteredCabins = cabins.filter(cabin => cabin.discount === 0)
  }

  const sortBy = searchParam.get('sortBy') || 'name-asc'
  const [field, order] = sortBy.split('-')
  const modifier = order === 'asc' ? 1 : -1
  filteredCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  )

  return (
    <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>{t('cabinTable.cabin')}</div>
        <div>{t('cabinTable.capacity')}</div>
        <div>{t('cabinTable.price')}</div>
        <div>{t('cabinTable.discount')}</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={filteredCabins}
        render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  )
}

export default CabinTable
