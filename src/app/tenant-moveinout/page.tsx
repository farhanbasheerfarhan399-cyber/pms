import MoveInOutPhotos from "@/components/TenantMoveinout";
import RootLayout from "../layout";
import DashboardLayout from "@/components/shared/layout";







export default function maintenance() {
  return (
    <DashboardLayout>
      <MoveInOutPhotos />
    </DashboardLayout>
  );
}