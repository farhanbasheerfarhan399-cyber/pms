import DashboardLayout from "@/components/Shared/layout";
import { TenantDashboard } from "@/components/TenantDashboard";





export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantDashboard />
    </DashboardLayout>
  );
}