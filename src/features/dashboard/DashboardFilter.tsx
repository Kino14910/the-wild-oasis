import { useTranslation } from 'react-i18next';
import Filter from "../../ui/Filter";

function DashboardFilter() {
  const { t } = useTranslation();

  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: t('dashboard.filter.last7Days') },
        { value: "30", label: t('dashboard.filter.last30Days') },
        { value: "90", label: t('dashboard.filter.last90Days') },
      ]}
    />
  );
}

export default DashboardFilter;
