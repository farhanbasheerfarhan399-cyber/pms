"use client";
import { Sidebar } from '@/components/shared/Sidebar';
import TenantManagement from '@/components/TenantManagement';
import { Header } from '@/components/shared/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function TenantManagementPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <Sidebar 
          userRole="property-owner" 
          onLogout={() => router.push('/pages/auth/login')}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <TenantManagement />
          </div>
        </main>
      </div>
    </div>
  );
}