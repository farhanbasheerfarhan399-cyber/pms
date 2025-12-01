import TenantLease from "@/components/TenantLease";

import DashboardLayout from "@/components/Shared/layout";





export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantLease />
    </DashboardLayout>
  );
}