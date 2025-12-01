import TenantProperty from "@/components/TenantProperty";
import RootLayout from "../layout";
import DashboardLayout from "@/components/shared/layout";









export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantProperty />
    </DashboardLayout>
  );
}