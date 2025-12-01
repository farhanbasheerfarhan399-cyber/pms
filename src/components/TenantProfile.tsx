'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Briefcase, Building2, MapPin, Calendar, FileText, DollarSign, Edit, Save, X } from 'lucide-react';

// Mock data - replace with actual data from props or API
const initialProfileData = {
  name: 'Sarah Johnson',
  unit: 'Unit 304, Sunset Towers',
  status: 'Active Tenant',
  tenantId: 'TEN-2024-0304',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  alternatePhone: '+1 (555) 987-6543',
  occupation: 'Software Engineer',
  company: 'Tech Corp Inc.',
  emergencyContact: {
    name: 'John Johnson',
    phone: '+1 (555) 456-7890'
  },
  lease: {
    property: 'Unit 304, Sunset Towers',
    moveInDate: 'July 1, 2024',
    leaseEndDate: 'June 30, 2025',
    monthlyRent: '$1,850/month',
    securityDeposit: '$3,700'
  },
  documents: [
    { name: 'Lease Agreement', uploadDate: 'Jul 1, 2024', verified: true },
    { name: 'ID Proof (Driver License)', uploadDate: 'Jun 28, 2024', verified: true },
    { name: 'Employment Letter', uploadDate: 'Jun 28, 2024', verified: true }
  ]
};

export default function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const handleSave = () => {
    // Add your save logic here (API call, etc.)
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(initialProfileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header - Responsive Layout */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card - Compact */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-sm text-gray-600 mt-0.5">{profileData.unit}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {profileData.status}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Tenant ID: {profileData.tenantId}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-600 mb-2">Full Name</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.name}</p>
                  </div>
                ) : (
                  <Input
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Email Address</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.email}</p>
                  </div>
                ) : (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Phone Number</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.phone}</p>
                  </div>
                ) : (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Alternate Phone</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.alternatePhone}</p>
                  </div>
                ) : (
                  <Input
                    value={profileData.alternatePhone}
                    onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Occupation</Label>
                {!isEditing ? (
                  <p className="text-gray-900 font-medium mt-2">{profileData.occupation}</p>
                ) : (
                  <Input
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Company</Label>
                {!isEditing ? (
                  <p className="text-gray-900 font-medium mt-2">{profileData.company}</p>
                ) : (
                  <Input
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-600 mb-2">Contact Name</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.emergencyContact.name}</p>
                  </div>
                ) : (
                  <Input
                    value={profileData.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2">Contact Phone</Label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 font-medium">{profileData.emergencyContact.phone}</p>
                  </div>
                ) : (
                  <Input
                    value={profileData.emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lease Information */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lease Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Property</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 font-medium">{profileData.lease.property}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Move-In Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 font-medium">{profileData.lease.moveInDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Lease End Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 font-medium">{profileData.lease.leaseEndDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Monthly Rent</p>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 font-medium">{profileData.lease.monthlyRent}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Security Deposit</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 font-medium">{profileData.lease.securityDeposit}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
            <div className="space-y-4">
              {profileData.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                    </div>
                  </div>
                  {doc.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}