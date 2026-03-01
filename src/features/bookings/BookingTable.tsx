import Empty from '../../ui/Empty'
import Menus from '../../ui/Menus'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import BookingRow from './BookingRow'
import useBookings from './useBookings'
import { useTranslation } from 'react-i18next'

function BookingTable() {
  const { bookings, isLoading, count } = useBookings()
  const { t } = useTranslation()

  if (isLoading) return <Spinner />

  if (!bookings.length) return <Empty resourceName='bookings' />

  return (
    <Menus>
      <Table $columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>{t('bookingTable.cabin')}</div>
          <div>{t('bookingTable.guest')}</div>
          <div>{t('bookingTable.dates')}</div>
          <div>{t('bookingTable.status')}</div>
          <div>{t('bookingTable.amount')}</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  )
}

export default BookingTable
