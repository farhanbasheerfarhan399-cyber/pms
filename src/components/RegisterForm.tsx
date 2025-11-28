'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';

export default function PropertyOwnerRegisterForm() {
  const router = useRouter();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [redirectMessage, setRedirectMessage] = React.useState('');

 const handleRegister = () => {
  if (name && email && phone) {
    // All fields entered → redirect to login page
    router.push("/login");
  } else {
    // One or more fields empty
    alert("Please fill in Name, Email, and Phone Number.");
  }
};


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">

        {/* Left Pane (Form) */}
        <div className="flex items-center justify-center p-6 md:p-8 lg:p-10 w-full lg:w-1/2">
          <div className="w-full max-w-xs">

            <h2 className="text-4xl font-bold mb-2 text-blue-600">
              Register
            </h2>

            <p className="text-sm text-gray-600 mb-8">
              Property Owner Registration
            </p>

            {redirectMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {redirectMessage}
              </div>
            )}

            <div className="space-y-5">

              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-xs font-medium text-gray-900 mb-1.5 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 px-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg"
                />
              </div>

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

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phone" className="text-xs font-medium text-gray-900 mb-1.5 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 px-3 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg"
                />
              </div>

              {/* Register Button */}
              <Button
                onClick={handleRegister}
                className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium mt-6"
              >
                Register
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login here
              </a>
            </p>
          </div>
        </div>

        {/* Right Pane (PMS Branding) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-600 p-8 text-white">
          <div className="text-center">
            <Building2 className="w-24 h-24 mx-auto mb-6" strokeWidth={1.5} />
            <p className="text-7xl font-bold mb-4 tracking-wide">PMS</p>
            <h1 className="text-2xl font-normal mb-8">
              Property Management System
            </h1>

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
