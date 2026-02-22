'use client';

import CropRecommendation from '@/components/dashboard/CropRecommendation';

export default function CropsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Recommendations</h1>
        <p className="text-gray-600">Get personalized crop suggestions based on your location and soil type</p>
      </div>
      
      <CropRecommendation />
    </div>
  );
}
