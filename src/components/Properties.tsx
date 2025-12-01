'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PropertyForm from './PropertyForm'
import { 
  Building2,
  MapPin,
  Users,
  Home,
  Search,
  Plus,
  ArrowLeft
} from 'lucide-react';

// Type definition - MUST MATCH PropertyForm.tsx
interface PropertyFormData {
  name: string;
  address: string;
  floors: string;
  floorUnits: { [key: number]: string };
  image: string;
}

// Type definitions
interface Unit {
  id: number;
  number: string;
  floor: number;
  rent: number;
  tenant?: string;
  status: 'occupied' | 'vacant' | 'maintenance';
  leaseStatus?: string | null;
}

interface Property {
  id: number;
  name: string;
  address: string;
  image: string;
  floors: number;
  units: number;
  occupied: number;
  tenants: number;
  vacant: number;
  units_list: Unit[];
}

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: 1,
    name: 'Sunset Apartments',
    address: '123 Main Street, Downtown',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    floors: 5,
    units: 20,
    occupied: 18,
    tenants: 18,
    vacant: 2,
    units_list: [
      { id: 101, number: 'Unit 101', floor: 1, rent: 1200, tenant: 'John Smith', status: 'occupied' },
      { id: 102, number: 'Unit 102', floor: 1, rent: 1200, tenant: 'Sarah Johnson', status: 'occupied' },
      { id: 103, number: 'Unit 103', floor: 1, rent: 1200, status: 'vacant' },
      { id: 104, number: 'Unit 104', floor: 1, rent: 1250, tenant: 'Mike Brown', status: 'occupied' },
      { id: 201, number: 'Unit 201', floor: 2, rent: 1300, tenant: 'Emma Davis', status: 'occupied'},
      { id: 202, number: 'Unit 202', floor: 2, rent: 1300, tenant: 'James Wilson', status: 'occupied'},
      { id: 203, number: 'Unit 203', floor: 2, rent: 1300, status: 'maintenance' },
      { id: 204, number: 'Unit 204', floor: 2, rent: 1350, tenant: 'Robert Taylor', status: 'occupied' },
    ]
  },
  {
    id: 2,
    name: 'Green Valley Complex',
    address: '456 Oak Avenue, Westside',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    floors: 8,
    units: 32,
    occupied: 30,
    tenants: 30,
    vacant: 2,
    units_list: [
       { id: 101, number: 'Unit 101', floor: 1, rent: 1200, tenant: 'John Smith', status: 'occupied' },
      { id: 102, number: 'Unit 102', floor: 1, rent: 1200, tenant: 'Sarah Johnson', status: 'occupied' },
      { id: 103, number: 'Unit 103', floor: 1, rent: 1200, status: 'vacant' },
      { id: 104, number: 'Unit 104', floor: 1, rent: 1250, tenant: 'Mike Brown', status: 'occupied' },
      { id: 201, number: 'Unit 201', floor: 2, rent: 1300, tenant: 'Emma Davis', status: 'occupied'},
      { id: 202, number: 'Unit 202', floor: 2, rent: 1300, tenant: 'James Wilson', status: 'occupied'},
      { id: 203, number: 'Unit 203', floor: 2, rent: 1300, status: 'maintenance' },
      { id: 204, number: 'Unit 204', floor: 2, rent: 1350, tenant: 'Robert Taylor', status: 'occupied' },
    ]
  },
  {
    id: 3,
    name: 'City View Towers',
    address: '789 Park Boulevard, Uptown',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    floors: 12,
    units: 48,
    occupied: 45,
    tenants: 45,
    vacant: 3,
    units_list: [
        { id: 101, number: 'Unit 101', floor: 1, rent: 1200, tenant: 'John Smith', status: 'occupied' },
      { id: 102, number: 'Unit 102', floor: 1, rent: 1200, tenant: 'Sarah Johnson', status: 'occupied' },
      { id: 103, number: 'Unit 103', floor: 1, rent: 1200, status: 'vacant' },
      { id: 104, number: 'Unit 104', floor: 1, rent: 1250, tenant: 'Mike Brown', status: 'occupied' },
      { id: 201, number: 'Unit 201', floor: 2, rent: 1300, tenant: 'Emma Davis', status: 'occupied'},
      { id: 202, number: 'Unit 202', floor: 2, rent: 1300, tenant: 'James Wilson', status: 'occupied'},
      { id: 203, number: 'Unit 203', floor: 2, rent: 1300, status: 'maintenance' },
      { id: 204, number: 'Unit 204', floor: 2, rent: 1350, tenant: 'Robert Taylor', status: 'occupied' },
    ]
  },
  {
    id: 4,
    name: 'Riverside Residences',
    address: '321 River Road, East District',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    floors: 6,
    units: 24,
    occupied: 22,
    tenants: 22,
    vacant: 2,
    units_list: [
        { id: 101, number: 'Unit 101', floor: 1, rent: 1200, tenant: 'John Smith', status: 'occupied' },
      { id: 102, number: 'Unit 102', floor: 1, rent: 1200, tenant: 'Sarah Johnson', status: 'occupied' },
      { id: 103, number: 'Unit 103', floor: 1, rent: 1200, status: 'vacant' },
      { id: 104, number: 'Unit 104', floor: 1, rent: 1250, tenant: 'Mike Brown', status: 'occupied' },
      { id: 201, number: 'Unit 201', floor: 2, rent: 1300, tenant: 'Emma Davis', status: 'occupied'},
      { id: 202, number: 'Unit 202', floor: 2, rent: 1300, tenant: 'James Wilson', status: 'occupied'},
      { id: 203, number: 'Unit 203', floor: 2, rent: 1300, status: 'maintenance' },
      { id: 204, number: 'Unit 204', floor: 2, rent: 1350, tenant: 'Robert Taylor', status: 'occupied' },
    ]
  }
];

export default function PropertyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const handleAddProperty = (data: PropertyFormData) => {
    // Calculate total units from floorUnits
    const totalUnits = Object.values(data.floorUnits).reduce(
      (sum, units) => sum + parseInt(units || '0'), 
      0
    );

    if (editingProperty) {
      // Edit existing property
      const updatedProperties = properties.map(prop => 
        prop.id === editingProperty.id 
          ? {
              ...prop,
              name: data.name,
              address: data.address,
              image: data.image || prop.image,
              floors: parseInt(data.floors),
              units: totalUnits,
            }
          : prop
      );
      setProperties(updatedProperties);
      
      // Update selectedProperty if it's the one being edited
      if (selectedProperty?.id === editingProperty.id) {
        setSelectedProperty({
          ...selectedProperty,
          name: data.name,
          address: data.address,
          image: data.image || selectedProperty.image,
          floors: parseInt(data.floors),
          units: totalUnits,
        });
      }
    } else {
      // Add new property
      const newProperty: Property = {
        id: properties.length + 1,
        name: data.name,
        address: data.address,
        image: data.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        floors: parseInt(data.floors),
        units: totalUnits,
        occupied: 0,
        tenants: 0,
        vacant: totalUnits,
        units_list: []
      };
      setProperties([...properties, newProperty]);
    }
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Unit['status']): string => {
    switch(status) {
      case 'occupied': return 'bg-green-100 text-green-700 border-green-200';
      case 'vacant': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'maintenance': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Unit['status']): string => {
    switch(status) {
      case 'occupied': return '✓';
      case 'vacant': return '🔓';
      case 'maintenance': return '⚠';
      default: return '';
    }
  };

  if (selectedProperty) {
    const property = selectedProperty;
    const floors = [...new Set(property.units_list.map((u: Unit) => u.floor))].sort();
    
    const filteredUnits = selectedFloor === 'all' 
      ? property.units_list 
      : property.units_list.filter((u: Unit) => u.floor === parseInt(selectedFloor));

    return (
      <div className="space-y-6">
        {/* Property Form Modal */}
        <PropertyForm 
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProperty(null);
          }}
          onSubmit={handleAddProperty}
          initialData={editingProperty}
          isEdit={!!editingProperty}
        />

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedProperty(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>

        {/* Property Header */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={property.image}
              alt={property.name}
              className="w-full md:w-40 h-40 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.name}</h1>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                  </p>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setEditingProperty(property);
                    setIsFormOpen(true);
                  }}
                >
                  Edit Property
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">Total Floors</p>
                  <p className="text-2xl font-bold text-blue-600">{property.floors}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Units</p>
                  <p className="text-2xl font-bold text-blue-600">{property.units}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Occupancy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((property.occupied / property.units) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Tabs */}
        <div className="bg-white rounded-lg border">
          <div className="flex gap-2 p-4 border-b overflow-x-auto">
            <button
              onClick={() => setSelectedFloor('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedFloor === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Units
            </button>
            {floors.map((floor: number) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor.toString())}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedFloor === floor.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>

          {/* Units Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredUnits.map((unit: Unit) => (
                <Card key={unit.id} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg">{unit.number}</h3>
                      <Badge className={`${getStatusColor(unit.status)} border`}>
                        {getStatusIcon(unit.status)} {unit.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor</span>
                        <span className="font-medium">{unit.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rent</span>
                        <span className="font-medium">${unit.rent}/mo</span>
                      </div>
                      {unit.tenant && (
                        <>
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 font-medium">{unit.tenant}</span>
                          </div>

                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Property Form Modal */}
      <PropertyForm 
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProperty(null);
        }}
        onSubmit={handleAddProperty}
        initialData={editingProperty}
        isEdit={!!editingProperty}
      />

     {/* Header with Add Property Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Property Management</h1>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 w-fit"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Button>
      </div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map(property => (
          <Card 
            key={property.id} 
            className="border hover:shadow-lg transition-shadow cursor-pointer overflow-hidden p-0"
            onClick={() => setSelectedProperty(property)}
          >
            {/* Property Image */}
            <div className="h-48 w-full">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              {/* Property Title and Address with Icon */}
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{property.name}</h2>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
                <MapPin className="w-4 h-4" />
                {property.address}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-0.5">{property.floors}</p>
                  <p className="text-xs text-gray-600">Floors</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-0.5">{property.units}</p>
                  <p className="text-xs text-gray-600">Units</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600 mb-0.5">{property.occupied}</p>
                  <p className="text-xs text-gray-600">Occupied</p>
                </div>
              </div>

              {/* Footer - Tenants, Vacant and View Details */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{property.tenants} Tenants</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 text-xs">
                    {property.vacant} Vacant
                  </Badge>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProperty(property);
                  }}
                >
                  View Details →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}