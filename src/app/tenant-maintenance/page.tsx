// app/maintenance/page.tsx
"use client";

import { Sidebar } from '@/components/shared/Sidebar';
import MaintenanceRequests from '@/components/TenantMaintenance';
import { Header } from '@/components/shared/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MaintenancePage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - handles its own mobile menu button, overlay, and drawer */}
      <Sidebar 
        userRole="tenant" 
        onLogout={() => router.push('/login')}
        onNavigate={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            <MaintenanceRequests />
          </div>
        </main>
      </div>
    </div>
  );
}