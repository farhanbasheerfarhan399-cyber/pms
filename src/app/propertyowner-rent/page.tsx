import RentPaymentTracker from "@/components/rentmanagement";
import DashboardLayout from "@/components/Shared/layout";



export default function maintenance() {
  return (
    <DashboardLayout>
      <RentPaymentTracker />
    </DashboardLayout>
  );
}