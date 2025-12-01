import TenantManagement from "@/components/TenantManagement";

import DashboardLayout from "@/components/shared/layout";



export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantManagement />
    </DashboardLayout>
  );
}