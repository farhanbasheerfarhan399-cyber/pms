import DashboardLayout from "@/components/shared/layout";
import { TenantDashboard } from "@/components/TenantDashboard";





export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantDashboard />
    </DashboardLayout>
  );
}