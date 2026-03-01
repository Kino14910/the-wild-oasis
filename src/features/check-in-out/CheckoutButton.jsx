import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import { useCheckout } from './useCheckout'

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout()
  const { t } = useTranslation()

  return (
    <Button
      $variation='primary'
      $size='small'
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {t('checkoutButton.checkOut')}
    </Button>
  )
}

export default CheckoutButton
