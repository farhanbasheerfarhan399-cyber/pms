import TenantProfile from "@/components/TenantProfile";
import RootLayout from "../layout";
import DashboardLayout from "@/components/Shared/layout";








export default function maintenance() {
  return (
    <DashboardLayout>
      <TenantProfile />
    </DashboardLayout>
  );
}