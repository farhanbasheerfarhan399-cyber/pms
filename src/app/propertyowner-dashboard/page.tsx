import { PropertyOwnerDashboard } from "@/components/PropertyDashboard";
import DashboardLayout from "@/components/shared/layout";

export default function dashboard() {
  return (
    <DashboardLayout>
      <PropertyOwnerDashboard />
    </DashboardLayout>
  );
}