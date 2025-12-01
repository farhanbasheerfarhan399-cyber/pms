'use client';
import React, { useState } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface Payment {
  id: number;
  tenant: string;
  property: string;
  unit: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  paymentMethod: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
}

const RentPaymentTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Payments');

  const payments: Payment[] = [
    {
      id: 1,
      tenant: 'John Smith',
      property: 'Sunset Apartments',
      unit: 'Unit 101',
      amount: 1200,
      dueDate: 'Nov 01, 2023',
      paidDate: 'Nov 01, 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid'
    },
    {
      id: 2,
      tenant: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: 'Unit 102',
      amount: 1200,
      dueDate: 'Nov 01, 2023',
      paidDate: 'Oct 30, 2023',
      paymentMethod: 'Cash',
      status: 'Paid'
    },
    {
      id: 3,
      tenant: 'Mike Brown',
      property: 'Sunset Apartments',
      unit: 'Unit 104',
      amount: 1250,
      dueDate: 'Nov 01, 2023',
      paidDate: null,
      paymentMethod: null,
      status: 'Overdue'
    },
    {
      id: 4,
      tenant: 'Emma Davis',
      property: 'Green Valley Complex',
      unit: 'Unit 201',
      amount: 1300,
      dueDate: 'Nov 05, 2023',
      paidDate: null,
      paymentMethod: null,
      status: 'Pending'
    },
    {
      id: 5,
      tenant: 'James Wilson',
      property: 'Green Valley Complex',
      unit: 'Unit 202',
      amount: 1300,
      dueDate: 'Nov 01, 2023',
      paidDate: 'Nov 02, 2023',
      paymentMethod: 'Cheque',
      status: 'Paid'
    }
  ];

  const tabs = [
    { name: 'All Payments', count: null },
    { name: 'Paid', count: 3 },
    { name: 'Pending', count: 1 },
    { name: 'Overdue', count: 1 }
  ];

  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'All Payments') return true;
    return payment.status === activeTab;
  });

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
        status === 'Paid'
          ? 'bg-green-100 text-green-700'
          : status === 'Pending'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-700 mb-6 md:mb-8">
          Track and manage rent payments
        </h1>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Collected This Month */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-2">Collected This Month</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-500 mb-2">$3,700</p>
                <p className="text-green-500 text-xs md:text-sm flex items-center">
                  <span className="mr-1">↗</span>
                  +8.2% from last month
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Pending Payment */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-2">Pending Payment</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 mb-2">$1,300</p>
                <p className="text-gray-500 text-xs md:text-sm">1 tenants</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Overdue Amount */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-2">Overdue Amount</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 mb-2">$1,250</p>
                <p className="text-gray-500 text-xs md:text-sm">1 tenants</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-t-lg shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 md:px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.name} {tab.count !== null && <span className="text-xs ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{tab.count}</span>}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-6">All Rent Records</h2>
            
            {/* MOBILE VIEW: Cards (Visible on screens smaller than md) */}
            <div className="block md:hidden space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{payment.tenant}</h3>
                      <p className="text-sm text-gray-500 truncate">{payment.property} - {payment.unit}</p>
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium text-gray-900">${payment.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>{payment.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paid Date:</span>
                      <span>{payment.paidDate || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span>{payment.paymentMethod || '-'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button className="w-full text-center text-sm bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 font-medium py-2.5 rounded-lg transition-colors">
                      {payment.status === 'Paid' ? 'View Receipt' : 'Mark as Paid'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW: Table (Hidden on small screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {payment.tenant}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-800 whitespace-nowrap">{payment.property}</div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{payment.unit}</div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${payment.amount}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-800 whitespace-nowrap">Due: {payment.dueDate}</div>
                        {payment.paidDate && (
                          <div className="text-xs text-green-600 whitespace-nowrap">Paid: {payment.paidDate}</div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                        {payment.paymentMethod || '-'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          {payment.status === 'Paid' ? 'Receipt' : 'Mark Paid'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPaymentTracker;