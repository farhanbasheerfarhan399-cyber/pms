// src/components/shared/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Building2,
  Users,
  FileText,
  DollarSign,
  Wrench,
  LogOut,
  CreditCard,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Navigation items for Property Owner
const propertyOwnerNavItems = [
  { href: '/propertyowner-dashboard', label: 'Dashboard', icon: Home },
  { href: '/propertyowner-properties', label: 'Properties', icon: Building2 },
  { href: '/propertyowner-tenant', label: 'Tenants', icon: Users },
  { href: '/propertyowner-lease', label: 'Leases', icon: FileText },
  { href: '/propertyowner-rent', label: 'Rent Management', icon: DollarSign },
  { href: '/propertyowner-maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/propertyowner-accounts', label: 'Accounts', icon: CreditCard },
];

// Navigation items for Tenant
const tenantNavItems = [
  { href: '/tenant-dashboard', label: 'Dashboard', icon: Home },
  { href: '/tenant-property', label: 'My Properties', icon: Building2 },
  { href: '/tenant-lease', label: 'My Lease', icon: FileText },
  { href: '/tenant-rent', label: 'Rent Status', icon: DollarSign },
  { href: '/tenant-maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/tenant-moveinout', label: 'Move-in-out', icon: CreditCard },
  { href: '/tenant-profile', label: 'Profile', icon: Users },
];

const roleNavItems = {
  'property-owner': propertyOwnerNavItems,
  'tenant': tenantNavItems,
};

interface SidebarProps {
  userRole: 'property-owner' | 'tenant';
  onLogout?: () => void;
  onNavigate?: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function Sidebar({ 
  userRole, 
  onLogout, 
  onNavigate,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen
}: SidebarProps) {
  const pathname = usePathname();
  const navItems = roleNavItems[userRole] || [];

  const normalize = (path: string) => path.replace(/\/+$/, '');
  const currentPath = normalize(pathname);

  const handleLogout = () => {
    setIsMobileMenuOpen?.(false);
    onLogout?.();
  };

  const handleNavigate = () => {
    setIsMobileMenuOpen?.(false);
    onNavigate?.();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen?.(!isMobileMenuOpen);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8 p-3 bg-blue-600 rounded-lg">
        <Building2 className="h-8 w-8 text-white" strokeWidth={2} />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white">PropManager</span>
          <span className="text-xs text-blue-100">Property Management</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isDashboard = item.label === 'Dashboard';
          const itemPath = normalize(item.href);
          const isActive =
            currentPath === itemPath ||
            (!isDashboard && currentPath.startsWith(itemPath + '/'));

          return (
            <Link key={item.href} href={item.href} onClick={handleNavigate}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  'w-full justify-start text-base font-medium h-12 transition-colors',
                  'hover:bg-blue-50 text-gray-700 hover:text-blue-600',
                  isActive &&
                    'bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700 border-l-4 border-blue-600'
                )}
              >
                <span className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar Overlay - Only shows when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}

      {/* Mobile Sidebar Drawer - Only visible on mobile */}
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 h-full w-[280px] bg-white z-50 p-4 flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar - Only visible on desktop */}
      <div className="hidden md:flex flex-col w-[280px] border-r bg-white min-h-screen p-4 sticky top-0 shadow-md">
        <SidebarContent />
      </div>
    </>
  );
}