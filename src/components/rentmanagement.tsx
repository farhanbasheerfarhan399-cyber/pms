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

  // Status Badge Component for reuse in Mobile and Desktop views
  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-xl md:text-2xl font-normal text-gray-700 mb-6 md:mb-8">Track and manage rent payments</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Collected This Month */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-2">Collected This Month</p>
                <p className="text-3xl md:text-4xl font-bold text-green-500 mb-2">$3,700</p>
                <p className="text-green-500 text-sm flex items-center">
                  <span className="mr-1">↗</span>
                  +8.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Pending Payment */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-2">Pending Payment</p>
                <p className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">$1,300</p>
                <p className="text-gray-500 text-sm">1 tenants</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Overdue Amount */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-2">Overdue Amount</p>
                <p className="text-3xl md:text-4xl font-bold text-red-500 mb-2">$1,250</p>
                <p className="text-gray-500 text-sm">1 tenants</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-t-lg shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.name} {tab.count !== null && `(${tab.count})`}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-6">All Rent Records</h2>
            
            {/* MOBILE VIEW: Cards (Visible on small screens only) */}
            <div className="block md:hidden space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{payment.tenant}</h3>
                      <p className="text-sm text-gray-500">{payment.property} - {payment.unit}</p>
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
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

                  <div className="pt-3 border-t border-gray-50">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
                      {payment.status === 'Paid' ? 'View Receipt' : 'Mark as Paid'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW: Table (Hidden on small screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tenant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Property & Unit</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Due Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paid Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-800">{payment.tenant}</td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-800">{payment.property}</div>
                        <div className="text-sm text-gray-500">{payment.unit}</div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-800">${payment.amount}</td>
                      <td className="py-4 px-4 text-sm text-gray-800">{payment.dueDate}</td>
                      <td className="py-4 px-4 text-sm text-gray-800">{payment.paidDate || '-'}</td>
                      <td className="py-4 px-4 text-sm text-gray-800">{payment.paymentMethod || '-'}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="py-4 px-4">
                        <button
                          className="text-sm text-gray-700 hover:text-blue-600 font-medium"
                        >
                          {payment.status === 'Paid' ? 'View Receipt' : 'Mark as Paid'}
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