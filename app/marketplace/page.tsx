'use client';

import Marketplace from '@/components/dashboard/Marketplace';

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600">Buy and sell farming products and equipment</p>
      </div>
      
      <Marketplace />
    </div>
  );
}
