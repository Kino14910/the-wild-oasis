import { useTranslation } from 'react-i18next'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

function CabinTableOperations() {
  const { t } = useTranslation()

  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: t('cabinTableOperations.all') },
          { value: 'no-discount', label: t('cabinTableOperations.noDiscount') },
          { value: 'with-discount', label: t('cabinTableOperations.withDiscount') },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: t('cabinTableOperations.sortByNameAsc') },
          { value: 'name-desc', label: t('cabinTableOperations.sortByNameDesc') },
          { value: 'regularPrice-asc', label: t('cabinTableOperations.sortByPriceLow') },
          { value: 'regularPrice-desc', label: t('cabinTableOperations.sortByPriceHigh') },
          { value: 'maxCapacity-asc', label: t('cabinTableOperations.sortByCapacityLow') },
          { value: 'maxCapacity-desc', label: t('cabinTableOperations.sortByCapacityHigh') },
        ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations
