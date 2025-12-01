import TenantProfile from "@/components/TenantProfile";
import RootLayout from "../layout";
import DashboardLayout from "@/components/shared/layout";



export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantProfile />
    </DashboardLayout>
  );
}