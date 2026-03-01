import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(t('hooks.checkout.success', { id: data.id }));
      queryClient.invalidateQueries({ type: 'active' });
    },

    onError: () => toast.error(t('hooks.checkout.error')),
  });

  return { checkout, isCheckingOut };
}
