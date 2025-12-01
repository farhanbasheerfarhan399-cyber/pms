import TenantManagement from "@/components/TenantManagement";

import DashboardLayout from "@/components/Shared/layout";



export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantManagement />
    </DashboardLayout>
  );
}