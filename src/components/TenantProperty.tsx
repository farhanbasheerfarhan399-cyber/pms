'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Home, MapPin, Square } from 'lucide-react';

// Mock data - replace with actual data from props or API
const propertyData = {
  unitNumber: 'Unit 304',
  buildingName: 'Sunset Towers',
  floor: '3rd Floor',
  size: '1,200 sq ft',
  address: '1234 Oak Street, Downtown',
  city: 'San Francisco, CA 94102',
  propertyType: '2 BHK Apartment',
  furnishing: 'Semi-Furnished',
  unitAmenities: [
    '2 Bedrooms',
    '2 Bathrooms',
    'Living Room',
    'Kitchen',
    'Balcony',
    'Parking Space (1)',
    'Storage Unit'
  ],
  buildingAmenities: [
    '24/7 Security',
    'Elevator',
    'Gym',
    'Swimming Pool',
    'Community Hall',
    'Power Backup',
    'Water Supply',
    'Waste Management'
  ]
};

export default function TenantProperty() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Property</h1>
          <p className="text-gray-600 mt-1">Details of your assigned property</p>
        </div>

        {/* Hero Card */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 p-6 text-center text-white">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-2">
              <Home className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-1">{propertyData.unitNumber}</h2>
            <p className="text-base text-blue-100">{propertyData.buildingName}</p>
          </div>

          {/* Property Details Grid */}
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Building */}
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                  <Building2 className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Building</p>
                  <p className="text-sm font-semibold text-gray-900">{propertyData.buildingName}</p>
                </div>
              </div>

              {/* Unit */}
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                  <Home className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Unit</p>
                  <p className="text-sm font-semibold text-gray-900">{propertyData.unitNumber}</p>
                </div>
              </div>

              {/* Floor */}
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Floor</p>
                  <p className="text-sm font-semibold text-gray-900">{propertyData.floor}</p>
                </div>
              </div>

              {/* Size */}
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                  <Square className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Size</p>
                  <p className="text-sm font-semibold text-gray-900">{propertyData.size}</p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-xs font-medium text-gray-600 mb-1">Address</h3>
              <p className="text-sm text-gray-900">{propertyData.address}</p>
              <p className="text-sm text-gray-900">{propertyData.city}</p>
            </div>

            {/* Property Type and Furnishing */}
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-medium text-gray-600 mb-1">Property Type</h3>
                <p className="text-sm font-semibold text-gray-900">{propertyData.propertyType}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-600 mb-1">Furnishing</h3>
                <p className="text-sm font-semibold text-gray-900">{propertyData.furnishing}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Amenities */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propertyData.unitAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />
                  <span className="text-gray-900">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Building Amenities */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propertyData.buildingAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full shrink-0" />
                  <span className="text-gray-900">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}