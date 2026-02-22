'use client';

import DiseaseDetection from '@/components/dashboard/DiseaseDetection';

export default function DiseasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disease Detection</h1>
        <p className="text-gray-600">Upload crop images to detect diseases and get treatment recommendations</p>
      </div>
      
      <DiseaseDetection />
    </div>
  );
}
