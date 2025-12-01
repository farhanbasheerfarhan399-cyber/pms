import AccountManagement from "@/components/accounts";
import DashboardLayout from "@/components/shared/layout";


export default function accountspage() {
  return (
    <DashboardLayout>
      <AccountManagement />
    </DashboardLayout>
  );
}