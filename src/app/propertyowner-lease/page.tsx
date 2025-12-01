// src/app/pages/property-owner/lease/page.tsx
"use client";

import { Sidebar } from '@/components/shared/Sidebar';
import LeaseManagement from '@/components/LeaseManagement';
import { Header } from '@/components/shared/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LeasePage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - handles its own mobile menu button, overlay, and drawer */}
      <Sidebar 
        userRole="property-owner" 
        onLogout={() => router.push('/login')}
        onNavigate={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <LeaseManagement />
          </div>
        </main>
      </div>
    </div>
  );
}