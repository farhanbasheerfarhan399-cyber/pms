'use client';

import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';

type Priority = 'Low' | 'Medium' | 'High Priority';
type Status = 'Open' | 'In Progress' | 'Completed';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  tenant: string;
  unit: string;
  priority: Priority;
  status: Status;
  createdDate: string;
  assignedTo: string;
}

const MaintenanceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'inProgress' | 'completed'>('all');

  const requests: MaintenanceRequest[] = [
    {
      id: '1',
      title: 'Leaking Faucet',
      description: 'Kitchen faucet is dripping constantly',
      tenant: 'John Smith',
      unit: 'Sunset Apartments - Unit 101',
      priority: 'Low',
      status: 'In Progress',
      createdDate: 'Nov 10, 2023',
      assignedTo: 'Mike Technician'
    },
    {
      id: '2',
      title: 'Broken AC Unit',
      description: 'Air conditioning not working',
      tenant: 'Sarah Johnson',
      unit: 'Sunset Apartments - Unit 102',
      priority: 'High Priority',
      status: 'Open',
      createdDate: 'Nov 12, 2023',
      assignedTo: 'Unassigned'
    },
    {
      id: '3',
      title: 'Water Heater Issue',
      description: 'No hot water in bathroom',
      tenant: 'Lisa Anderson',
      unit: 'Sunset Apartments - Unit 203',
      priority: 'High Priority',
      status: 'In Progress',
      createdDate: 'Nov 11, 2023',
      assignedTo: 'Tom Plumber'
    },
    {
      id: '4',
      title: 'Door Lock Repair',
      description: 'Front door lock is jammed',
      tenant: 'Emma Davis',
      unit: 'Green Valley Complex - Unit 201',
      priority: 'Medium',
      status: 'Completed',
      createdDate: 'Nov 08, 2023',
      assignedTo: 'John Locksmith'
    },
    {
      id: '5',
      title: 'Window Crack',
      description: 'Living room window has a crack',
      tenant: 'James Wilson',
      unit: 'Green Valley Complex - Unit 202',
      priority: 'Medium',
      status: 'Open',
      createdDate: 'Nov 13, 2023',
      assignedTo: 'Unassigned'
    }
  ];

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'open') return request.status === 'Open';
    if (activeTab === 'inProgress') return request.status === 'In Progress';
    if (activeTab === 'completed') return request.status === 'Completed';
    return true;
  });

  const openCount = requests.filter(r => r.status === 'Open').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-700';
      case 'Medium': return 'bg-orange-500 text-white';
      case 'High Priority': return 'bg-red-500 text-white';
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1 text-gray-700">
            <AlertCircle className="w-4 h-4" />
            Open
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
            <Wrench className="w-3 h-3" />
            <span className="whitespace-nowrap">In Progress</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive Flex */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <h1 className="text-xl text-gray-600 font-medium">Manage maintenance requests and repairs</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center md:justify-start transition-colors">
            <span className="text-xl">+</span>
            Create Request
          </button>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-500 text-sm mb-2">Total Requests</div>
                <div className="text-3xl font-bold text-gray-800">{requests.length}</div>
              </div>
              <Wrench className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-500 text-sm mb-2">Open</div>
                <div className="text-3xl font-bold text-orange-500">{openCount}</div>
              </div>
              <Clock className="w-12 h-12 text-orange-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-500 text-sm mb-2">In Progress</div>
                <div className="text-3xl font-bold text-blue-500">{inProgressCount}</div>
              </div>
              <Wrench className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-500 text-sm mb-2">Completed</div>
                <div className="text-3xl font-bold text-green-500">{completedCount}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>

        {/* Tabs - Horizontal Scroll on Mobile */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 md:gap-8 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap px-2 ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-gray-900 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All Requests
              </button>
              <button
                onClick={() => setActiveTab('open')}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap px-2 ${
                  activeTab === 'open'
                    ? 'border-blue-500 text-gray-900 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Open ({openCount})
              </button>
              <button
                onClick={() => setActiveTab('inProgress')}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap px-2 ${
                  activeTab === 'inProgress'
                    ? 'border-blue-500 text-gray-900 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                In Progress ({inProgressCount})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap px-2 ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-gray-900 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {/* All Requests View */}
            {activeTab === 'all' && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">All Maintenance Requests</h2>
                
                {/* Mobile View: Cards */}
                <div className="block lg:hidden space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <div className="font-medium text-gray-900">{request.title}</div>
                         <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                         </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{request.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Unit:</span>
                          <span className="text-right">{request.unit}</span>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-gray-500">Tenant:</span>
                          <span>{request.tenant}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Status:</span>
                          <div>{getStatusBadge(request.status)}</div>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-gray-500">Assigned:</span>
                          <span>{request.assignedTo}</span>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-gray-500">Date:</span>
                          <span>{request.createdDate}</span>
                        </div>
                      </div>
                      <button className="w-full text-center text-blue-600 font-medium py-2 border-t border-gray-100 mt-2">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Request</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tenant & Unit</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Priority</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Created Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Assigned To</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{request.title}</div>
                            <div className="text-sm text-gray-500">{request.description}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{request.tenant}</div>
                            <div className="text-sm text-gray-500">{request.unit}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                          <td className="py-4 px-4 text-gray-700">{request.createdDate}</td>
                          <td className="py-4 px-4 text-gray-700">{request.assignedTo}</td>
                          <td className="py-4 px-4">
                            <button className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Open Requests View - Responsive Stack */}
            {activeTab === 'open' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl md:text-2xl font-bold">Open Requests - Needs Assignment</h2>
                </div>
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow bg-white">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                        <div className="flex-1 w-full md:w-auto">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{request.title}</h3>
                          <p className="text-gray-600 mb-3">{request.description}</p>
                          <p className="text-gray-600 mb-4">{request.tenant} - {request.unit}</p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center transition-colors">
                              Assign Technician
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-center transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:items-end items-center mt-4 md:mt-0">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm md:mb-2 ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                          <div className="text-gray-500 text-sm">{request.createdDate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In Progress View */}
            {activeTab === 'inProgress' && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">Requests In Progress</h2>
                
                 {/* Mobile View: Cards */}
                 <div className="block lg:hidden space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <div className="font-medium text-gray-900">{request.title}</div>
                         <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                         </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{request.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                         <div className="flex justify-between">
                          <span className="text-gray-500">Unit:</span>
                          <span className="text-right">{request.unit}</span>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-gray-500">Assigned To:</span>
                          <span>{request.assignedTo}</span>
                        </div>
                      </div>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-colors">
                        Mark Complete
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Request</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tenant & Unit</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Priority</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Assigned To</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{request.title}</div>
                            <div className="text-sm text-gray-500">{request.description}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-700">{request.tenant} - {request.unit}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{request.assignedTo}</td>
                          <td className="py-4 px-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-colors">
                              Mark Complete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Completed View */}
            {activeTab === 'completed' && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">Completed Requests</h2>
                
                {/* Mobile View: Cards */}
                <div className="block lg:hidden space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <div className="font-medium text-gray-900">{request.title}</div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{request.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                         <div className="flex justify-between">
                          <span className="text-gray-500">Unit:</span>
                          <span className="text-right">{request.unit}</span>
                        </div>
                         <div className="flex justify-between">
                          <span className="text-gray-500">Completed By:</span>
                          <span>{request.assignedTo}</span>
                        </div>
                      </div>
                      <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2 border-t border-gray-100 mt-2">
                        View Report
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Request</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tenant & Unit</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Completed By</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{request.title}</div>
                            <div className="text-sm text-gray-500">{request.description}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-700">{request.tenant} - {request.unit}</div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{request.assignedTo}</td>
                          <td className="py-4 px-4">
                            <button className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;