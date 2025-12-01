import RentPaymentTracker from "@/components/rentmanagement";
import DashboardLayout from "@/components/shared/layout";



export default function maintenance() {
  return (
    <DashboardLayout>
      <RentPaymentTracker />
    </DashboardLayout>
  );
}