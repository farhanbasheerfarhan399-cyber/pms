// TenantManagement.tsx
'use client';

import { useState } from 'react';

interface Tenant {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  moveInDate: string;
  leaseStatus: 'Active' | 'Expiring Soon';
  rentStatus: 'Paid' | 'Overdue';
}

const TenantManagement = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    moveInDate: '',
    leaseStatus: 'Active' as 'Active' | 'Expiring Soon',
    rentStatus: 'Paid' as 'Paid' | 'Overdue'
  });

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      initials: 'JS',
      email: 'john.smith@email.com',
      phone: '+1 234-567-8901',
      property: 'Sunset Apartments',
      unit: 'Unit 101',
      moveInDate: 'Jan 15, 2023',
      leaseStatus: 'Active',
      rentStatus: 'Paid'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      initials: 'SJ',
      email: 'sarah.j@email.com',
      phone: '+1 234-567-8902',
      property: 'Sunset Apartments',
      unit: 'Unit 102',
      moveInDate: 'Mar 01, 2023',
      leaseStatus: 'Active',
      rentStatus: 'Paid'
    },
    {
      id: '3',
      name: 'Mike Brown',
      initials: 'MB',
      email: 'mike.brown@email.com',
      phone: '+1 234-567-8903',
      property: 'Sunset Apartments',
      unit: 'Unit 104',
      moveInDate: 'Feb 10, 2023',
      leaseStatus: 'Active',
      rentStatus: 'Overdue'
    },
    {
      id: '4',
      name: 'Emma Davis',
      initials: 'ED',
      email: 'emma.d@email.com',
      phone: '+1 234-567-8904',
      property: 'Green Valley Complex',
      unit: 'Unit 201',
      moveInDate: 'Jun 20, 2022',
      leaseStatus: 'Expiring Soon',
      rentStatus: 'Paid'
    },
    {
      id: '5',
      name: 'James Wilson',
      initials: 'JW',
      email: 'james.w@email.com',
      phone: '+1 234-567-8905',
      property: 'Green Valley Complex',
      unit: 'Unit 202',
      moveInDate: 'Apr 15, 2023',
      leaseStatus: 'Active',
      rentStatus: 'Paid'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant: Tenant = {
      id: String(tenants.length + 1),
      name: formData.name,
      initials: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      email: formData.email,
      phone: formData.phone,
      property: formData.property,
      unit: formData.unit,
      moveInDate: new Date(formData.moveInDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      leaseStatus: formData.leaseStatus,
      rentStatus: formData.rentStatus
    };
    setTenants([...tenants, newTenant]);
    setShowDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      property: '',
      unit: '',
      moveInDate: '',
      leaseStatus: 'Active',
      rentStatus: 'Paid'
    });
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Tenant Management</h1>
          <p className="text-gray-600 text-sm">Manage your tenants and their information</p>
        </div>
        <button 
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
        >
          + Add Tenant
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 min-h-0">
        {/* Section Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">All Tenants</h2>
          </div>
          <input
            type="text"
            placeholder="Search tenants..."
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Property & Unit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Move-In Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Lease Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Rent Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                        {tenant.initials}
                      </div>
                      <span className="font-medium text-gray-900 whitespace-nowrap">{tenant.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <path d="m2 7 10 7 10-7"></path>
                        </svg>
                        <span className="whitespace-nowrap">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span className="whitespace-nowrap">{tenant.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900 whitespace-nowrap">{tenant.property}</div>
                        <div className="text-sm text-gray-600 whitespace-nowrap">{tenant.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700 whitespace-nowrap">{tenant.moveInDate}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      tenant.leaseStatus === 'Active' 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tenant.leaseStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      tenant.rentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tenant.rentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-blue-600 font-medium text-sm hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tenant Dialog */}
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
              <h2 className="text-xl font-semibold text-gray-900">Add New Tenant</h2>
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
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter tenant name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tenant@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234-567-8900"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
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

                {/* Move-In Date */}
                <div>
                  <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Move-In Date *
                  </label>
                  <input
                    type="date"
                    id="moveInDate"
                    name="moveInDate"
                    required
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                  />
                </div>

                {/* Lease Status and Rent Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="leaseStatus" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Lease Status *
                    </label>
                    <select
                      id="leaseStatus"
                      name="leaseStatus"
                      required
                      value={formData.leaseStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Expiring Soon">Expiring Soon</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rentStatus" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Rent Status *
                    </label>
                    <select
                      id="rentStatus"
                      name="rentStatus"
                      required
                      value={formData.rentStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
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
                  Add Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantManagement;