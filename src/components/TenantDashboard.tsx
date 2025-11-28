// src/app/pages/tenant/Dashboard.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [showMaintenanceForm, setShowMaintenanceForm] = React.useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = React.useState({
    issueType: '',
    title: '',
    description: '',
    urgency: 'normal',
  });

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - send data to your API
    console.log('Maintenance Request:', maintenanceFormData);
    // Reset form and close
    setMaintenanceFormData({
      issueType: '',
      title: '',
      description: '',
      urgency: 'normal',
    });
    setShowMaintenanceForm(false);
    // Show success message or update UI
  };

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
    <div className="space-y-3">
      {/* Page Title - More Compact */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
      </div>

      {/* Lease Information Card - Reduced Padding */}
      <Card className="border">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Property Image - Smaller */}
            <div className="w-full sm:w-28 h-28 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Home className="w-12 h-12 text-white" />
            </div>

            {/* Property Details - Tighter Spacing */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{leaseInfo.property}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{leaseInfo.address}</p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600 text-white w-fit text-sm">
                  {leaseInfo.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-sm text-gray-600 mb-0.5">Monthly Rent</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">${leaseInfo.monthlyRent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-0.5">Lease Ends</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{leaseInfo.leaseEnds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-0.5">Security Deposit</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">${leaseInfo.securityDeposit.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border">
          <CardContent className="p-3 text-center">
            <DollarSign className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <h3 className="font-semibold text-sm mb-0.5">Pay Rent</h3>
            <p className="text-xs text-gray-600">Make payment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border">
          <CardContent className="p-3 text-center">
            <Wrench className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <h3 className="font-semibold text-sm mb-0.5">Report Issue</h3>
            <p className="text-xs text-gray-600">Maintenance request</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border">
          <CardContent className="p-3 text-center">
            <FileText className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <h3 className="font-semibold text-sm mb-0.5">View Lease</h3>
            <p className="text-xs text-gray-600">Agreement details</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border">
          <CardContent className="p-3 text-center">
            <Home className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <h3 className="font-semibold text-sm mb-0.5">Contact Owner</h3>
            <p className="text-xs text-gray-600">Send message</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Reduced Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Rent Payment Status - Compact */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <DollarSign className="w-4 h-4 text-blue-500" />
              Rent Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Current Month Payment */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Current Month</span>
                <Badge className="bg-green-500 hover:bg-green-600 text-xs">Paid</Badge>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                ${rentPayment.currentMonth.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Paid on {rentPayment.paidDate}</p>
            </div>

            {/* Next Payment Due */}
            <div className="bg-gray-50 p-2.5 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Next Payment Due</p>
                    <p className="text-xs text-gray-600">{rentPayment.nextPaymentDue}</p>
                  </div>
                </div>
                <p className="text-base font-bold text-gray-900">${rentPayment.currentMonth.toLocaleString()}</p>
              </div>
            </div>

            {/* Payment History */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-gray-900">Payment History</p>
                <p className="text-sm font-semibold text-blue-600">{rentPayment.paymentHistory}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${rentPayment.progressPercentage}%`}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests - Compact */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Wrench className="w-4 h-4 text-blue-500" />
              My Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showMaintenanceForm ? (
              <>
                {/* Active Request */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{maintenanceRequest.title}</h4>
                      <p className="text-sm text-gray-600">{maintenanceRequest.description}</p>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-xs whitespace-nowrap">
                      {maintenanceRequest.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
                    <span>Assigned: {maintenanceRequest.assignedTo}</span>
                    <span>{maintenanceRequest.date}</span>
                  </div>
                </div>

                {/* No Other Requests */}
                <div className="text-center py-4">
                  <Wrench className="w-14 h-14 mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-600 mb-3">No other active requests</p>
                  <Button 
                    onClick={() => setShowMaintenanceForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    Report New Issue
                  </Button>
                </div>
              </>
            ) : (
              /* Maintenance Request Form */
              <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type *
                  </label>
                  <select
                    required
                    value={maintenanceFormData.issueType}
                    onChange={(e) => setMaintenanceFormData({...maintenanceFormData, issueType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select issue type</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="appliance">Appliance</option>
                    <option value="structural">Structural</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={maintenanceFormData.title}
                    onChange={(e) => setMaintenanceFormData({...maintenanceFormData, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={maintenanceFormData.description}
                    onChange={(e) => setMaintenanceFormData({...maintenanceFormData, description: e.target.value})}
                    placeholder="Provide detailed information about the issue"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    required
                    value={maintenanceFormData.urgency}
                    onChange={(e) => setMaintenanceFormData({...maintenanceFormData, urgency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low - Can wait</option>
                    <option value="normal">Normal - Within a week</option>
                    <option value="high">High - Within 24 hours</option>
                    <option value="emergency">Emergency - Immediate attention</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowMaintenanceForm(false)}
                    variant="outline"
                    className="flex-1 text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Important Information - Compact */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Important Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Property Manager */}
          <Card className="border bg-blue-50">
            <CardContent className="p-3">
              <p className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Property Manager</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">{propertyManager.name}</p>
              <p className="text-sm text-gray-600 mb-0.5">{propertyManager.email}</p>
              <p className="text-sm text-gray-600">{propertyManager.phone}</p>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border bg-blue-50">
            <CardContent className="p-3">
              <p className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Emergency Contact</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">{emergencyContact.hotline}</p>
              <p className="text-sm text-gray-600 mb-0.5">{emergencyContact.phone}</p>
              <p className="text-sm text-gray-600">{emergencyContact.note}</p>
            </CardContent>
          </Card>

          {/* Lease Renewal */}
          <Card className="border bg-blue-50">
            <CardContent className="p-3">
              <p className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Lease Renewal</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">{leaseRenewal.daysRemaining} Days Remaining</p>
              <p className="text-sm text-gray-600 mb-2">Expires: {leaseRenewal.expiryDate}</p>
              <Button variant="outline" size="sm" className="w-full text-sm">
                Discuss Renewal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}