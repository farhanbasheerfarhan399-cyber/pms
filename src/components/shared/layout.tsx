// src/app/layout.tsx or src/app/(dashboard)/layout.tsx
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/Shared/header';
import { Sidebar } from '@/components/Shared/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Detect user role from pathname
  const userRole = React.useMemo(() => {
    if (pathname.includes('propertyowner') || pathname.includes('property-owner')) {
      return 'property-owner' as const;
    } else if (pathname.includes('tenant')) {
      return 'tenant' as const;
    }
    return 'property-owner' as const; // default
  }, [pathname]);

  // Mock user data - Replace with actual user data from auth context/API
  const userData = {
    name: 'John Smith',
    initials: 'JS',
    email: 'john.smith@example.com',
  };

  const handleLogout = () => {
    // Clear authentication data
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();
    
    // Redirect to login
    router.push('/login');
  };

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          userRole={userRole}
          userName={userData.name}
          userInitials={userData.initials}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}