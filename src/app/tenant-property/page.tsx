// src/app/pages/tenant-properties/page.tsx
'use client';

import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import TenantProperty from '@/components/TenantProperty';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TenantPropertiesPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication data if needed
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - handles its own mobile menu button, overlay, and drawer */}
      <Sidebar 
        userRole="tenant" 
        onLogout={handleLogout}
        onNavigate={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <TenantProperty />
        </main>
      </div>
    </div>
  );
}