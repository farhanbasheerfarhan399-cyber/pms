'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2 } from 'lucide-react';

type UserRole = 'property-owner' | 'tenant' | '';

export default function PMSLoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('');
  const [redirectMessage, setRedirectMessage] = React.useState('');

  const handleLogin = () => {
    // Basic Validation
    if (!email || !password || !role) {
      alert('Please fill in Email, Password, and select a Role.');
      return;
    }

    // Authentication Placeholder
    console.log(`Attempting login for user: ${email} with role: ${role}`);
    
    // Define Redirection Paths
    const pathMap: Record<UserRole, string> = {
       "property-owner": "/propertyowner-dashboard",
  "tenant": "/tenant-dashboard",
      '': '/', 
    };

    // Show redirect message and navigate
    const targetPath = pathMap[role];
    setRedirectMessage(`Redirecting to ${role === 'property-owner' ? 'Property Owner' : 'Tenant'} Pro...`);
    
    // Redirect to the appropriate page
    setTimeout(() => {
      router.push(targetPath);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Left Pane (Login Form) */}
        <div className="flex items-center justify-center p-6 md:p-8 lg:p-10 w-full lg:w-1/2">
          <div className="w-full max-w-xs">
            <h2 className="text-4xl font-bold mb-2 text-blue-600">
              Welcome
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Sign in to Property Management System
            </p>

            {redirectMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {redirectMessage}
              </div>
            )}

            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-xs font-medium text-gray-900 mb-1.5 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg"
                />
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-xs font-medium text-gray-900 mb-1.5 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 px-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg"
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <Label htmlFor="role" className="text-xs font-medium text-gray-900 mb-1.5 block">
                  Login As
                </Label>
                <Select onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger id="role" className="w-full h-11 px-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg">
                    <SelectValue placeholder="Select Your Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property-owner">Property Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sign In Button */}
              <Button 
                onClick={handleLogin}
                className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium mt-6" 
              >
                Sign in
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="/registerform" className="text-blue-600 hover:text-blue-700 font-medium">
                Register here
              </a>
            </p>
          </div>
        </div>

        {/* Right Pane (PMS Branding) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-600 p-8 text-white">
          <div className="text-center">
            <Building2 className="w-24 h-24 mx-auto mb-6" strokeWidth={1.5} />
            <p className="text-7xl font-bold mb-4 tracking-wide">PMS</p>
            <h1 className="text-2xl font-normal mb-8">Property Management System</h1>
            
            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-2">
                <span className="text-lg">✓</span>
                <span className="text-base">Manage Multiple Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">✓</span>
                <span className="text-base">Track Rent & Leases</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">✓</span>
                <span className="text-base">Maintenance Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">✓</span>
                <span className="text-base">Tenant Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}