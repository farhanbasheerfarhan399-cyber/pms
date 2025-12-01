import MoveInOutPhotos from "@/components/TenantMoveinout";
import RootLayout from "../layout";
import DashboardLayout from "@/components/Shared/layout";







export default function maintenance() {
  return (
    <DashboardLayout>
      <MoveInOutPhotos />
    </DashboardLayout>
  );
}