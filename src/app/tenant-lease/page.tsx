import TenantLease from "@/components/TenantLease";

import DashboardLayout from "@/components/shared/layout";





export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantLease />
    </DashboardLayout>
  );
}