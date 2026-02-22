'use client';

import Schemes from '@/components/dashboard/Schemes';

export default function SchemesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Schemes</h1>
        <p className="text-gray-600">Explore government schemes and subsidies for farmers</p>
      </div>
      
      <Schemes />
    </div>
  );
}
