'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Download, FileText } from 'lucide-react';

// Mock data - replace with actual data from props or API
const leaseData = {
  status: 'Active',
  startDate: 'July 1, 2024',
  endDate: 'June 30, 2025',
  monthlyRent: '$1,850',
  securityDeposit: '$3,700',
  leaseDuration: '12 months',
  rentPaymentCycle: 'Monthly',
  paymentDueDate: '1st of every month',
  paymentSchedule: [
    { period: 'December 2024', dueDate: 'Dec 1, 2024', amount: '$1,850', status: 'upcoming' },
    { period: 'November 2024', dueDate: 'Nov 1, 2024', amount: '$1,850', status: 'paid' },
    { period: 'October 2024', dueDate: 'Oct 1, 2024', amount: '$1,850', status: 'paid' },
    { period: 'September 2024', dueDate: 'Sep 1, 2024', amount: '$1,850', status: 'paid' },
  ],
  keyTerms: [
    'Rent is due on the 1st of each month',
    'Late payment fee of $50 applies after 5 days',
    'Security deposit will be refunded within 30 days of move-out',
    'Tenant is responsible for minor repairs under $100',
    'Smoking is not permitted inside the unit',
    'Pets are not allowed without prior written consent',
    '30 days notice required for lease termination',
    'Owner reserves right for quarterly property inspections with 48-hour notice'
  ]
};

export default function TenantLease() {
  const handleDownload = () => {
    // Implement download functionality
    console.log('Download lease agreement');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'upcoming') {
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Upcoming</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lease Agreement</h1>
          <p className="text-gray-600 mt-1">Your lease details and terms</p>
        </div>

        {/* Lease Status Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Lease Status</h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-xl font-semibold text-green-600">Active</span>
                </div>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Agreement
              </Button>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Start Date */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">{leaseData.startDate}</p>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">End Date</p>
                  <p className="text-lg font-semibold text-gray-900">{leaseData.endDate}</p>
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Rent</p>
                  <p className="text-lg font-semibold text-gray-900">{leaseData.monthlyRent}</p>
                </div>
              </div>

              {/* Security Deposit */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
                  <p className="text-lg font-semibold text-gray-900">{leaseData.securityDeposit}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Lease Duration</h3>
                <p className="text-lg font-semibold text-gray-900">{leaseData.leaseDuration}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Rent Payment Cycle</h3>
                <p className="text-lg font-semibold text-gray-900">{leaseData.rentPaymentCycle}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Payment Due Date</h3>
              <p className="text-lg font-semibold text-gray-900">{leaseData.paymentDueDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Schedule</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Period</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Due Date</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Amount</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaseData.paymentSchedule.map((payment, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-900">{payment.period}</td>
                      <td className="py-4 px-4 text-gray-900">{payment.dueDate}</td>
                      <td className="py-4 px-4 text-gray-900">{payment.amount}</td>
                      <td className="py-4 px-4">{getStatusBadge(payment.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Terms & Conditions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">Key Terms & Conditions</h2>
            </div>
            
            <div className="space-y-4">
              {leaseData.keyTerms.map((term, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 shrink-0" />
                  <p className="text-gray-700 text-base leading-relaxed">{term}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}