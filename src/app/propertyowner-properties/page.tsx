// src/app/pages/property-owner/properties/page.tsx
'use client';

import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import PropertyManagement from '@/components/Properties';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PropertyPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication data if needed
    // localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - handles its own mobile menu button, overlay, and drawer */}
      <Sidebar 
        userRole="property-owner" 
        onLogout={handleLogout}
        onNavigate={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <PropertyManagement />
          </div>
        </main>
      </div>
    </div>
  );
}