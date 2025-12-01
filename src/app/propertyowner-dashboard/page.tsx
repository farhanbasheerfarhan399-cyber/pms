import { PropertyOwnerDashboard } from "@/components/PropertyDashboard";
import DashboardLayout from "@/components/Shared/layout";




 



export default function dashboard() {
  return (
    <DashboardLayout>
      <PropertyOwnerDashboard />
    </DashboardLayout>
  );
}