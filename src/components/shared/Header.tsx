// src/components/shared/Header.tsx
'use client';

import * as React from 'react';
import { Bell, Search, LogOut, Settings, User, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userRole?: 'property-owner' | 'tenant';
  userName?: string;
  userInitials?: string;
}

export function Header({ 
  userRole, 
  userName = 'John Smith',
  userInitials = 'JS'
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Detect user role from pathname if not provided as prop
  const detectedRole = React.useMemo(() => {
    if (userRole) return userRole;
    
    if (pathname.includes('propertyowner') || pathname.includes('property-owner')) {
      return 'property-owner';
    } else if (pathname.includes('tenant')) {
      return 'tenant';
    }
    return 'property-owner'; // default
  }, [pathname, userRole]);

  // Set role display text
  const roleDisplay = detectedRole === 'property-owner' ? 'Property Owner' : 'Tenant';

  const handleLogout = () => {
    // Clear any stored authentication data (tokens, user data, etc.)
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 bg-white px-4 md:px-6 shadow-sm">
      
      {/* Logo/Title Section */}
      <div className="flex items-center space-x-2">
        <Building2 className="h-6 w-6 text-blue-600" />
      </div>
      
      {/* Search Bar */}
      <div className="relative flex-1 max-w-lg hidden md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={detectedRole === 'property-owner' 
            ? "Search properties, tenants..." 
            : "Search properties, leases..."}
          className="w-full rounded-lg bg-gray-50 pl-9 focus-visible:ring-blue-200 focus-visible:border-blue-500 h-10"
        />
      </div>

      {/* Right Side: Notifications and Profile */}
      <div className="flex items-center space-x-4 ml-auto">
        
        {/* Notification Bell */}
        <Button variant="outline" size="icon" className="relative h-10 w-10 border-gray-300 hover:bg-gray-50">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-auto p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-none">{userName}</p>
                  <p className="text-xs text-muted-foreground">{roleDisplay}</p>
                </div>
                <Avatar className="h-10 w-10 border-2 border-blue-600">
                  <AvatarFallback className="bg-blue-600 text-white font-bold text-base">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {roleDisplay}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push(
                detectedRole === 'property-owner' 
                  ? '/propertyowner-profile' 
                  : '/tenant-profile'
              )}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}