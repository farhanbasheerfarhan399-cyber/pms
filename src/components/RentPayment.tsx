// src/components/RentPayments.tsx
'use client';

import React, { useState } from 'react';

interface PaymentHistory {
  period: string;
  amount: string;
  paidDate: string;
  method: string;
  status: string;
}

export default function RentPayments() {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: '',
    paymentDate: '',
    receipt: null as File | null,
  });

  const paymentHistory: PaymentHistory[] = [
    { period: 'November 2024', amount: '$1,850', paidDate: 'Nov 1, 2024', method: 'Bank Transfer', status: 'Paid' },
    { period: 'October 2024', amount: '$1,850', paidDate: 'Oct 1, 2024', method: 'Cheque', status: 'Paid' },
    { period: 'September 2024', amount: '$1,850', paidDate: 'Sep 2, 2024', method: 'Cash', status: 'Paid' },
    { period: 'August 2024', amount: '$1,850', paidDate: 'Aug 1, 2024', method: 'Bank Transfer', status: 'Paid' },
    { period: 'July 2024', amount: '$1,850', paidDate: 'Jul 1, 2024', method: 'Bank Transfer', status: 'Paid' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    setShowDialog(false);
    setFormData({ paymentMethod: '', paymentDate: '', receipt: null });
  };

  const handleCancel = () => {
    setShowDialog(false);
    setFormData({ paymentMethod: '', paymentDate: '', receipt: null });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Rent & Payments</h1>
        <p className="text-gray-600 text-sm mt-1">Manage your rent payments and view history</p>
      </div>

      {/* Current Rent Due Card */}
      <div className="bg-blue-500 rounded-lg p-6 mb-6 text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm mb-2 opacity-90">Current Rent Due</p>
            <h2 className="text-3xl font-bold mb-4">$1,850</h2>
            <div className="flex items-center text-sm mb-4">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Due in 4 days
            </div>
            <p className="text-xs mb-4 opacity-90">Due Date: December 1, 2024</p>
            <button
              onClick={() => setShowDialog(true)}
              className="bg-white text-blue-500 px-4 py-2 rounded font-medium text-sm hover:bg-gray-50 transition"
            >
              Mark as Paid / Upload Proof
            </button>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Total Paid</p>
          <p className="text-xl font-semibold text-gray-900">$9,250</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Total Payments</p>
          <p className="text-xl font-semibold text-gray-900">5</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Security Deposit</p>
          <p className="text-xl font-semibold text-gray-900">$3,700</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Outstanding Balance</p>
          <p className="text-xl font-semibold text-gray-900">$0</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Period</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Paid Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Method</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{payment.period}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{payment.amount}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.paidDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center text-xs text-green-700">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 text-sm hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Instructions</h3>
        
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-900 mb-2">Bank Transfer</h4>
          <p className="text-sm text-gray-600">Account Name: Sunset Properties LLC</p>
          <p className="text-sm text-gray-600">Account Number: 123456790</p>
          <p className="text-sm text-gray-600">Routing Number: 987654321</p>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-900 mb-2">Cheque Payment</h4>
          <p className="text-sm text-gray-600">Make cheque payable to: Sunset Properties LLC</p>
          <p className="text-sm text-gray-600">Mail to: 1234 Oak Street, San Francisco, CA 94102</p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-2">Cash Payment</h4>
          <p className="text-sm text-gray-600">Visit our office during business hours (Mon-Fri, 9 AM - 5 PM)</p>
        </div>
      </div>

      {/* Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Mark as Paid / Upload Proof</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <select
                  required
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select payment method</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Receipt / Proof
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.receipt && (
                  <p className="text-xs text-gray-600 mt-1">{formData.receipt.name}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}