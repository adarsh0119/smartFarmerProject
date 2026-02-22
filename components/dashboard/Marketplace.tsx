'use client';

import { Store, ShoppingCart } from 'lucide-react';

export default function Marketplace() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Store className="w-5 h-5 mr-2 text-orange-500" />
          Marketplace
        </h2>
        <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">
          View All
        </button>
      </div>
      
      <div className="text-center p-8">
        <Store className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Marketplace</h3>
        <p className="text-gray-600 mb-4">Buy and sell agricultural products</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-orange-500 mr-2" />
              <span>Wheat for Sale</span>
            </div>
            <span className="font-bold">₹2,100/qtl</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-orange-500 mr-2" />
              <span>Fertilizer Available</span>
            </div>
            <span className="font-bold">₹500/bag</span>
          </div>
        </div>
      </div>
    </div>
  );
}