import React, { useState } from 'react';

// Types
type PhotoCategory = 'Living Room' | 'Bedroom 1' | 'Bedroom 2' | 'Kitchen' | 'Bathroom 1' | 'Bathroom 2' | 'Dining Room' | 'Balcony';

interface UploadedPhoto {
  id: string;
  category: PhotoCategory;
  imageUrl: string;
  uploadedDate: string;
  file: File;
}

interface UploadFormData {
  category: PhotoCategory | '';
  photos: File[];
}

const categories: PhotoCategory[] = [
  'Living Room',
  'Bedroom 1',
  'Bedroom 2',
  'Kitchen',
  'Bathroom 1',
  'Bathroom 2',
  'Dining Room',
  'Balcony'
];

// Mock data for Move-In photos
const mockMoveInPhotos: UploadedPhoto[] = [
  {
    id: '1',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    uploadedDate: 'Jul 1, 2024',
    file: new File([], 'living-room.jpg')
  },
  {
    id: '2',
    category: 'Bedroom 1',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
    uploadedDate: 'Jul 1, 2024',
    file: new File([], 'bedroom.jpg')
  },
  {
    id: '3',
    category: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
    uploadedDate: 'Jul 1, 2024',
    file: new File([], 'kitchen.jpg')
  },
  {
    id: '4',
    category: 'Bathroom 1',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500',
    uploadedDate: 'Jul 1, 2024',
    file: new File([], 'bathroom.jpg')
  }
];

export default function MoveInOutPhotos() {
  const [activeTab, setActiveTab] = useState<'move-in' | 'move-out'>('move-in');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [moveInPhotos, setMoveInPhotos] = useState<UploadedPhoto[]>(mockMoveInPhotos);
  const [moveOutPhotos, setMoveOutPhotos] = useState<UploadedPhoto[]>([]);
  const [formData, setFormData] = useState<UploadFormData>({
    category: '',
    photos: []
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const currentPhotos = activeTab === 'move-in' ? moveInPhotos : moveOutPhotos;
  const totalAreas = categories.length;
  const documentedAreas = new Set(currentPhotos.map(p => p.category)).size;
  const progressPercentage = Math.round((documentedAreas / totalAreas) * 100);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: files
      }));

      // Create preview URLs
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value as PhotoCategory
    }));
  };

  const handleUpload = () => {
    if (!formData.category || formData.photos.length === 0) {
      alert('Please select a category and upload at least one photo');
      return;
    }

    const newPhotos: UploadedPhoto[] = formData.photos.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      category: formData.category as PhotoCategory,
      imageUrl: previewUrls[index],
      uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      file
    }));

    if (activeTab === 'move-in') {
      setMoveInPhotos(prev => [...prev, ...newPhotos]);
    } else {
      setMoveOutPhotos(prev => [...prev, ...newPhotos]);
    }

    // Reset form
    setFormData({ category: '', photos: [] });
    setPreviewUrls([]);
    setIsUploadModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({ category: '', photos: [] });
    setPreviewUrls([]);
    setIsUploadModalOpen(false);
  };

  const groupedPhotos = currentPhotos.reduce((acc, photo) => {
    if (!acc[photo.category]) {
      acc[photo.category] = [];
    }
    acc[photo.category].push(photo);
    return acc;
  }, {} as Record<PhotoCategory, UploadedPhoto[]>);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Move-In/Out Photos</h1>
          <p className="text-gray-600 mt-1">Document the condition of your property</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-blue-900 font-medium">
              Please upload clear photos of each area of your property. These photos will be used for comparison during move-out.
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Tip: Take photos from multiple angles and ensure good lighting for accurate documentation.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('move-in')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'move-in'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Move-In Photos
          </button>
          <button
            onClick={() => setActiveTab('move-out')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'move-out'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Move-Out Photos
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <p className="text-sm text-gray-600">{documentedAreas} of {totalAreas} areas documented</p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Photos
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progressPercentage}% Complete</p>
        </div>

        {/* Photos Grid or Empty State */}
        {currentPhotos.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <svg className="mx-auto h-24 w-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos uploaded yet</h3>
              <p className="text-gray-600 mb-6">
                Upload photos of each area during {activeTab === 'move-in' ? 'move-in' : 'move-out'} for comparison
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Photos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedPhotos).map(([category, photos]) => (
              <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={photos[0].imageUrl}
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                  {photos.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      +{photos.length - 1} more
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Uploaded: {photos[0].uploadedDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Upload {activeTab === 'move-in' ? 'Move-In' : 'Move-Out'} Photos
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Category Selector */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Area/Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Upload Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photos <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-2 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <div className="text-gray-600">
                      <label htmlFor="photos" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span className="text-base">Click to upload or drag and drop</span>
                        <input
                          id="photos"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">PNG, JPG (max. 10MB each)</p>
                    {formData.photos.length > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-3">
                        ✓ {formData.photos.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Images */}
              {previewUrls.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {previewUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-900">
                  Take photos from multiple angles and ensure good lighting
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!formData.category || formData.photos.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}