'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface PropertyFormData {
  name: string;
  address: string;
  floors: string;
  units: string;
  image: string;
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
}

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
  initialData?: Property | null;
  isEdit?: boolean;
}

export default function PropertyForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  isEdit = false 
}: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    address: '',
    floors: '',
    units: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        floors: initialData.floors.toString(),
        units: initialData.units.toString(),
        image: initialData.image
      });
    } else {
      setFormData({
        name: '',
        address: '',
        floors: '',
        units: '',
        image: ''
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      address: '',
      floors: '',
      units: '',
      image: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Property' : 'Add New Property'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Property Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Sunset Apartments"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                required
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="floors">Number of Floors *</Label>
                <Input
                  id="floors"
                  name="floors"
                  type="number"
                  value={formData.floors}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  required
                  min="1"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="units">Total Units *</Label>
                <Input
                  id="units"
                  name="units"
                  type="number"
                  value={formData.units}
                  onChange={handleInputChange}
                  placeholder="e.g., 20"
                  required
                  min="1"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Property Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isEdit ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}