// src/app/pages/tenant/Dashboard.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DollarSign,
  Wrench,
  FileText,
  Home,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';

export function TenantDashboard() {
  // Mock data - replace with actual data from your API
  const leaseInfo = {
    property: 'Sunset Apartments - Unit 101',
    address: '123 Main Street, Downtown',
    monthlyRent: 1200,
    leaseEnds: 'Jan 14, 2024',
    securityDeposit: 2400,
    status: 'Active Lease',
  };

  const rentPayment = {
    currentMonth: 1200,
    paidDate: 'Nov 01, 2023',
    nextPaymentDue: 'Dec 01, 2023',
    paymentHistory: '10/10 On Time',
    progressPercentage: 100,
  };

  const maintenanceRequest = {
    title: 'Leaking Faucet',
    description: 'Kitchen faucet is dripping',
    status: 'In Progress',
    assignedTo: 'Mike Technician',
    date: 'Nov 10, 2023',
  };

  const propertyManager = {
    name: 'Jane Manager',
    email: 'manager@propmanager.com',
    phone: '+1 234-567-8900',
  };

  const emergencyContact = {
    hotline: '24/7 Hotline',
    phone: '+1 234-567-9999',
    note: 'For urgent issues only',
  };

  const leaseRenewal = {
    daysRemaining: 75,
    expiryDate: 'Jan 14, 2024',
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Title */}
      <div className="px-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back to your tenant portal</p>
      </div>

      {/* Lease Information Card */}
      <Card className="border-2 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Mobile: Stacked Layout, Desktop: Side by Side */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Property Image */}
              <div className="w-full sm:w-32 md:w-40 h-32 sm:h-32 md:h-40 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Home className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
              </div>

              {/* Property Details */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{leaseInfo.property}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{leaseInfo.address}</p>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs sm:text-sm w-fit">
                    {leaseInfo.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Monthly Rent</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">${leaseInfo.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Lease Ends</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{leaseInfo.leaseEnds}</p>
                  </div>
                  <div className="xs:col-span-2 sm:col-span-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Security Deposit</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">${leaseInfo.securityDeposit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border">
          <CardContent className="p-4 sm:p-5 md:p-6 text-center">
            <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-500 mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Pay Rent</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Make payment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border">
          <CardContent className="p-4 sm:p-5 md:p-6 text-center">
            <Wrench className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-500 mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Report Issue</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Maintenance request</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border">
          <CardContent className="p-4 sm:p-5 md:p-6 text-center">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-500 mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">View Lease</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Agreement details</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border">
          <CardContent className="p-4 sm:p-5 md:p-6 text-center">
            <Home className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-500 mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Contact Owner</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Send message</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Rent Payment Status */}
        <Card className="border">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              Rent Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Current Month Payment */}
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Current Month</span>
                <Badge className="bg-green-500 hover:bg-green-600 text-xs">Paid</Badge>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                ${rentPayment.currentMonth.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Paid on {rentPayment.paidDate}</p>
            </div>

            {/* Next Payment Due */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Next Payment Due</p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{rentPayment.nextPaymentDue}</p>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
                ${rentPayment.currentMonth.toLocaleString()}
              </p>
            </div>

            {/* Payment History */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Payment History</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-600">{rentPayment.paymentHistory}</span>
              </div>
              <Progress value={rentPayment.progressPercentage} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card className="border">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              My Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Active Request */}
            <div className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">{maintenanceRequest.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{maintenanceRequest.description}</p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap text-xs w-fit">
                  {maintenanceRequest.status}
                </Badge>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2 text-xs sm:text-sm text-gray-600">
                <span className="truncate">Assigned: {maintenanceRequest.assignedTo}</span>
                <span className="whitespace-nowrap">{maintenanceRequest.date}</span>
              </div>
            </div>

            {/* No Other Requests */}
            <div className="text-center py-6 sm:py-8">
              <Wrench className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-gray-300 mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">No other active requests</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 sm:px-6">
                Report New Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="border">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Property Manager */}
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 space-y-2">
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Property Manager</h4>
              <p className="font-semibold text-sm sm:text-base text-gray-900 wrap-break-word">{propertyManager.name}</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span className="break-all">{propertyManager.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span>{propertyManager.phone}</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-lg p-3 sm:p-4 space-y-2">
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Emergency Contact</h4>
              <p className="font-semibold text-sm sm:text-base text-gray-900">{emergencyContact.hotline}</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span>{emergencyContact.phone}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">{emergencyContact.note}</p>
            </div>

            {/* Lease Renewal */}
            <div className="bg-orange-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Lease Renewal</h4>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{leaseRenewal.daysRemaining} Days Remaining</p>
              <p className="text-xs sm:text-sm text-gray-600">Expires: {leaseRenewal.expiryDate}</p>
              <Button variant="outline" className="w-full mt-2 text-sm sm:text-base">
                Discuss Renewal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}