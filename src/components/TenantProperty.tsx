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
          <div className="bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 p-12 text-center text-white">
            <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
              <Home className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold mb-2">{propertyData.unitNumber}</h2>
            <p className="text-xl text-blue-100">{propertyData.buildingName}</p>
          </div>

          {/* Property Details Grid */}
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Building */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <Building2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Building</p>
                  <p className="text-lg font-semibold text-gray-900">{propertyData.buildingName}</p>
                </div>
              </div>

              {/* Unit */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <Home className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unit</p>
                  <p className="text-lg font-semibold text-gray-900">{propertyData.unitNumber}</p>
                </div>
              </div>

              {/* Floor */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Floor</p>
                  <p className="text-lg font-semibold text-gray-900">{propertyData.floor}</p>
                </div>
              </div>

              {/* Size */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <Square className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Size</p>
                  <p className="text-lg font-semibold text-gray-900">{propertyData.size}</p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Address</h3>
              <p className="text-lg text-gray-900">{propertyData.address}</p>
              <p className="text-lg text-gray-900">{propertyData.city}</p>
            </div>

            {/* Property Type and Furnishing */}
            <div className="mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Property Type</h3>
                <p className="text-lg font-semibold text-gray-900">{propertyData.propertyType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Furnishing</h3>
                <p className="text-lg font-semibold text-gray-900">{propertyData.furnishing}</p>
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