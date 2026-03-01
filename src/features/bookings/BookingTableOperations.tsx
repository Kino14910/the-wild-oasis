import { useTranslation } from 'react-i18next';
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  const { t } = useTranslation();

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: t('bookingTableOperations.all') },
          { value: "checked-out", label: t('bookingTableOperations.checkedOut') },
          { value: "checked-in", label: t('bookingTableOperations.checkedIn') },
          { value: "unconfirmed", label: t('bookingTableOperations.unconfirmed') },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: t('bookingTableOperations.sortByDateRecent') },
          { value: "startDate-asc", label: t('bookingTableOperations.sortByDateEarlier') },
          {
            value: "totalPrice-desc",
            label: t('bookingTableOperations.sortByAmountHigh'),
          },
          { value: "totalPrice-asc", label: t('bookingTableOperations.sortByAmountLow') },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
