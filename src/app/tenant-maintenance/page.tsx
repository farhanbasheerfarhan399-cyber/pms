import MaintenanceRequests from "@/components/TenantMaintenance";
import RootLayout from "../layout";
import DashboardLayout from "@/components/shared/layout";






export default function maintenance() {
  return (
    <DashboardLayout>
      <MaintenanceRequests />
    </DashboardLayout>
  );
}