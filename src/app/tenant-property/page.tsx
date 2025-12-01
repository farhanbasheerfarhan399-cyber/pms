import TenantProperty from "@/components/TenantProperty";
import RootLayout from "../layout";
import DashboardLayout from "@/components/Shared/layout";









export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantProperty />
    </DashboardLayout>
  );
}