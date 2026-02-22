'use client';

import MandiPrices from '@/components/dashboard/MandiPrices';

export default function PricesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mandi Prices</h1>
        <p className="text-gray-600">Check real-time market prices for your crops</p>
      </div>
      
      <MandiPrices />
    </div>
  );
}
