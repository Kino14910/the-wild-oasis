import { useTranslation } from 'react-i18next'
import AddCabin from '../features/cabins/AddCabin'
import CabinTable from '../features/cabins/CabinTable'
import CabinTableOperations from '../features/cabins/CabinTableOperations'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Cabins() {
  const { t } = useTranslation()

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>{t('cabins.allHeading')}</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  )
}

export default Cabins
