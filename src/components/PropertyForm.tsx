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
  floorUnits: { [key: number]: string };
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
    floorUnits: {},
    image: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        floors: initialData.floors.toString(),
        floorUnits: {},
        image: initialData.image
      });
      setImagePreview(initialData.image);
    } else {
      setFormData({
        name: '',
        address: '',
        floors: '',
        floorUnits: {},
        image: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
    setImageError('');
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'floors') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        floorUnits: {} // Reset floor units when floors change
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFloorUnitChange = (floorIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      floorUnits: {
        ...prev.floorUnits,
        [floorIndex]: value
      }
    }));
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImageError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImageError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate image is uploaded
    if (!formData.image) {
      setImageError('Property image is required');
      return;
    }
    
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      address: '',
      floors: '',
      floorUnits: {},
      image: ''
    });
    setImagePreview('');
    setImageFile(null);
    setImageError('');
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
            </div>

            {/* Dynamic Floor Unit Inputs */}
            {formData.floors && parseInt(formData.floors) > 0 && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Units per Floor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: parseInt(formData.floors) }, (_, i) => (
                    <div key={i}>
                      <Label htmlFor={`floor-${i}`}>
                        {i === 0 ? 'Ground Floor' : `Floor ${i}`} Units *
                      </Label>
                      <Input
                        id={`floor-${i}`}
                        type="number"
                        value={formData.floorUnits[i] || ''}
                        onChange={(e) => handleFloorUnitChange(i, e.target.value)}
                        placeholder="e.g., 4"
                        required
                        min="1"
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label>Property Image *</Label>
              <div
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
                className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer ${
                  imageError ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 mb-2">
                      <svg
                        className="mx-auto h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Drag and drop an image here, or
                    </p>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        browse to upload
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
              {imageError && (
                <p className="text-sm text-red-600 mt-1">{imageError}</p>
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