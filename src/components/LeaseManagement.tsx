// LeaseManagement.tsx
'use client';

import { useState } from 'react';

interface Lease {
  id: string;
  tenant: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'Active' | 'Expiring Soon';
  daysLeft?: number;
}

const LeaseManagement = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expiring'>('all');
  const [formData, setFormData] = useState({
    tenant: '',
    property: '',
    unit: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: ''
  });

  const [leases, setLeases] = useState<Lease[]>([
    {
      id: '1',
      tenant: 'John Smith',
      property: 'Sunset Apartments',
      unit: 'Unit 101',
      startDate: 'Jan 15, 2023',
      endDate: 'Jan 14, 2024',
      monthlyRent: 1200,
      deposit: 2400,
      status: 'Active'
    },
    {
      id: '2',
      tenant: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: 'Unit 102',
      startDate: 'Mar 01, 2023',
      endDate: 'Feb 28, 2024',
      monthlyRent: 1200,
      deposit: 2400,
      status: 'Active'
    },
    {
      id: '3',
      tenant: 'Emma Davis',
      property: 'Green Valley Complex',
      unit: 'Unit 201',
      startDate: 'Jun 20, 2022',
      endDate: 'Dec 31, 2023',
      monthlyRent: 1300,
      deposit: 2600,
      status: 'Expiring Soon',
      daysLeft: 28
    },
    {
      id: '4',
      tenant: 'Robert Taylor',
      property: 'Sunset Apartments',
      unit: 'Unit 204',
      startDate: 'Apr 01, 2022',
      endDate: 'Nov 30, 2023',
      monthlyRent: 1350,
      deposit: 2700,
      status: 'Expiring Soon',
      daysLeft: 15
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLease: Lease = {
      id: String(leases.length + 1),
      tenant: formData.tenant,
      property: formData.property,
      unit: formData.unit,
      startDate: new Date(formData.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      endDate: new Date(formData.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      monthlyRent: Number(formData.monthlyRent),
      deposit: Number(formData.deposit),
      status: 'Active'
    };
    setLeases([...leases, newLease]);
    setShowDialog(false);
    setFormData({
      tenant: '',
      property: '',
      unit: '',
      startDate: '',
      endDate: '',
      monthlyRent: '',
      deposit: ''
    });
  };

  const filteredLeases = leases.filter(lease => {
    const matchesSearch = lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'active') return matchesSearch && lease.status === 'Active';
    if (activeTab === 'expiring') return matchesSearch && lease.status === 'Expiring Soon';
    return matchesSearch;
  });

  const totalLeases = leases.length;
  const activeLeases = leases.filter(l => l.status === 'Active').length;
  const expiringLeases = leases.filter(l => l.status === 'Expiring Soon').length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Lease Management</h1>
          <p className="text-gray-600 text-sm">Manage lease agreements and renewals</p>
        </div>
        <button 
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
        >
          + Create Lease
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6 flex-shrink-0">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Leases</p>
              <p className="text-3xl font-bold text-gray-900">{totalLeases}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Active Leases</p>
              <p className="text-3xl font-bold text-green-600">{activeLeases}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Expiring Soon</p>
              <p className="text-3xl font-bold text-orange-500">{expiringLeases}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 min-h-0">
        {/* Tabs */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              All Leases
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'active'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('expiring')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'expiring'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Expiring Soon
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">All Lease Agreements</h2>
          <input
            type="text"
            placeholder="Search leases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:border-blue-600 text-sm"
          />
        </div>

        {/* Table Container with Scroll */}
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property & Unit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lease Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Rent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deposit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeases.map((lease) => (
                <tr key={lease.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{lease.tenant}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">{lease.property}</div>
                        <div className="text-sm text-gray-600">{lease.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-900">{lease.startDate}</div>
                        <div className="text-sm text-gray-600">to {lease.endDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-semibold">$ {lease.monthlyRent}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">${lease.deposit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit ${
                        lease.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {lease.status}
                      </span>
                      {lease.daysLeft && (
                        <span className="text-xs text-gray-600">{lease.daysLeft} days left</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium text-sm hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Lease Dialog */}
      {showDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={() => setShowDialog(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-900">Create New Lease</h2>
              <button 
                onClick={() => setShowDialog(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Dialog Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5">
              <div className="space-y-4">
                {/* Tenant Name */}
                <div>
                  <label htmlFor="tenant" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tenant Name *
                  </label>
                  <input
                    type="text"
                    id="tenant"
                    name="tenant"
                    required
                    value={formData.tenant}
                    onChange={handleInputChange}
                    placeholder="Enter tenant name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                  />
                </div>

                {/* Property and Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Property *
                    </label>
                    <input
                      type="text"
                      id="property"
                      name="property"
                      required
                      value={formData.property}
                      onChange={handleInputChange}
                      placeholder="Property name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Unit *
                    </label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      required
                      value={formData.unit}
                      onChange={handleInputChange}
                      placeholder="Unit number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>

                {/* Start Date and End Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>

                {/* Monthly Rent and Deposit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Monthly Rent ($) *
                    </label>
                    <input
                      type="number"
                      id="monthlyRent"
                      name="monthlyRent"
                      required
                      value={formData.monthlyRent}
                      onChange={handleInputChange}
                      placeholder="1200"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Security Deposit ($) *
                    </label>
                    <input
                      type="number"
                      id="deposit"
                      name="deposit"
                      required
                      value={formData.deposit}
                      onChange={handleInputChange}
                      placeholder="2400"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Dialog Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Create Lease
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseManagement;