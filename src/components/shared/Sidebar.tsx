// src/components/shared/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Users,
  FileText,
  DollarSign,
  Wrench,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Navigation items for Property Owner
const propertyOwnerNavItems = [
  { href: '/propertyowner-dashboard', label: 'Dashboard', icon: Home },
  { href: '/propertyowner-properties', label: 'Properties', icon: Building2 },
  { href: '/tenant-management', label: 'Tenants', icon: Users },
  { href: '/lease', label: 'Leases', icon: FileText },
  { href: '/rentmanagement', label: 'Rent Management', icon: DollarSign },
  { href: '/maintanance', label: 'Maintenance', icon: Wrench },
  { href: '/accounts', label: 'Accounts', icon: CreditCard },
];

// Navigation items for Tenant
const tenantNavItems = [
  { href: '/tenant-dashboard', label: 'Dashboard', icon: Home },
  { href: '/tenant-property', label: 'My Properties', icon: Building2 },
  { href: '/tenant-lease', label: 'My Lease', icon: FileText },
  { href: '/tenant/rent-status', label: 'Rent Status', icon: DollarSign },
  { href: '/tenant/maintenance', label: 'Maintenance', icon: Wrench },
];

const roleNavItems = {
  'property-owner': propertyOwnerNavItems,
  'tenant': tenantNavItems,
};

interface SidebarProps {
  userRole: 'property-owner' | 'tenant';
  onLogout?: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ userRole, onLogout, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const navItems = roleNavItems[userRole] || [];

  const normalize = (path: string) => path.replace(/\/+$/, '');
  const currentPath = normalize(pathname);

  const handleLogout = () => onLogout?.();
  const handleNavigate = () => onNavigate?.();

  return (
    <div className="hidden md:flex flex-col w-[280px] border-r bg-white min-h-screen p-4 sticky top-0 shadow-md">
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
    </div>
  );
}