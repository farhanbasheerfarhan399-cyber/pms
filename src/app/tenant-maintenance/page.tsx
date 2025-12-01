import MaintenanceRequests from "@/components/TenantMaintenance";
import RootLayout from "../layout";
import DashboardLayout from "@/components/Shared/layout";






export default function maintenance() {
  return (
    <DashboardLayout>
      <MaintenanceRequests />
    </DashboardLayout>
  );
}