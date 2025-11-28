import React, { useState } from 'react';

// Types
type MaintenanceStatus = 'In Progress' | 'Completed' | 'Pending';
type Priority = 'High Priority' | 'Medium Priority' | 'Low Priority';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: Priority;
  category: string;
  reportedDate: string;
  lastUpdated: string;
  assignedTo: string;
  notes: string;
}

interface NewRequestForm {
  title: string;
  description: string;
  priority: Priority;
  category: string;
  preferredDate: string;
  contactPhone: string;
  photos: File[];
}

// Mock Data
const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Air Conditioner Not Cooling',
    description: 'The AC in the bedroom is running but not cooling properly. Temperature remains high even after hours of operation.',
    status: 'In Progress',
    priority: 'High Priority',
    category: 'HVAC',
    reportedDate: 'Nov 15, 2024',
    lastUpdated: 'Nov 20, 2024',
    assignedTo: 'John Doe - HVAC Technician',
    notes: 'Technician scheduled for inspection on Nov 22'
  },
  {
    id: '2',
    title: 'Kitchen Sink Leak',
    description: 'Water is leaking from under the kitchen sink. Small but consistent drip.',
    status: 'Completed',
    priority: 'Medium Priority',
    category: 'Plumbing',
    reportedDate: 'Nov 10, 2024',
    lastUpdated: 'Nov 12, 2024',
    assignedTo: 'Mike Smith - Plumber',
    notes: 'Issue resolved. Pipe connection tightened.'
  },
  {
    id: '3',
    title: 'Bathroom Light Flickering',
    description: 'The main bathroom light flickers intermittently.',
    status: 'Pending',
    priority: 'Low Priority',
    category: 'Electrical',
    reportedDate: 'Nov 18, 2024',
    lastUpdated: 'Nov 19, 2024',
    assignedTo: 'Sarah Johnson - Electrician',
    notes: ''
  }
];

const categories = ['HVAC', 'Plumbing', 'Electrical', 'Appliances', 'Carpentry', 'Painting', 'Other'];
const priorities: Priority[] = ['High Priority', 'Medium Priority', 'Low Priority'];

// MaintenanceRequests Component
export default function MaintenanceRequests() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [formData, setFormData] = useState<NewRequestForm>({
    title: '',
    description: '',
    priority: 'Medium Priority',
    category: 'HVAC',
    preferredDate: '',
    contactPhone: '',
    photos: []
  });

  const getStatusCount = (status: MaintenanceStatus) => {
    return requests.filter(req => req.status === status).length;
  };

  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case 'In Progress':
        return 'text-purple-600 bg-purple-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High Priority':
        return 'text-orange-700 bg-orange-100';
      case 'Medium Priority':
        return 'text-yellow-700 bg-yellow-100';
      case 'Low Priority':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case 'In Progress':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Completed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Pending':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: MaintenanceRequest = {
      id: String(requests.length + 1),
      title: formData.title,
      description: formData.description,
      status: 'Pending',
      priority: formData.priority,
      category: formData.category,
      reportedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      assignedTo: 'Pending Assignment',
      notes: formData.preferredDate ? `Preferred inspection date: ${formData.preferredDate}` : ''
    };

    setRequests(prev => [newRequest, ...prev]);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'Medium Priority',
      category: 'HVAC',
      preferredDate: '',
      contactPhone: '',
      photos: []
    });
    
    setIsNewRequestOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
            <p className="text-gray-600 mt-1">Report issues and track their status</p>
          </div>
          <button
            onClick={() => setIsNewRequestOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Request
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-purple-600">{getStatusCount('In Progress')}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{getStatusCount('Completed')}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{getStatusCount('Pending')}</p>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Title and Icon */}
              <div className="flex items-start gap-3 mb-3">
                {getStatusIcon(request.status)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                  <p className="text-gray-600 mt-1">{request.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-100">
                  {request.category}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reported Date</p>
                  <p className="text-sm font-medium text-gray-900">{request.reportedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">{request.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assigned To</p>
                  <p className="text-sm font-medium text-gray-900">{request.assignedTo}</p>
                </div>
                {request.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Notes</p>
                    <p className="text-sm font-medium text-gray-900">{request.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Request Modal */}
      {isNewRequestOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">New Maintenance Request</h2>
              <button
                onClick={() => setIsNewRequestOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Issue Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of the issue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Please provide detailed information about the issue..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map(pri => (
                      <option key={pri} value={pri}>{pri}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Inspection Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                  Attach Photos (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="photos" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload files</span>
                        <input
                          id="photos"
                          name="photos"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {formData.photos.length > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        {formData.photos.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsNewRequestOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}