'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter, Download } from 'lucide-react';

export default function MandiPrices() {
  const [selectedState, setSelectedState] = useState('Haryana');
  const [selectedCrop, setSelectedCrop] = useState('All');
  
  const prices = [
    { crop: 'Wheat', market: 'Karnal', price: 2125, change: '+2.5%', trend: 'up', msp: 2125 },
    { crop: 'Rice', market: 'Ambala', price: 4000, change: '+1.8%', trend: 'up', msp: 2040 },
    { crop: 'Maize', market: 'Panipat', price: 1870, change: '-0.5%', trend: 'down', msp: 1870 },
    { crop: 'Sugarcane', market: 'Yamunanagar', price: 3150, change: '0%', trend: 'stable', msp: 3150 },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Mandi Prices
        </h2>
        <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
          <Download className="w-4 h-4 mr-1" />
          Export
        </button>
      </div>
      
      <div className="text-center p-8">
        <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Mandi Prices Component</h3>
        <p className="text-gray-600 mb-4">Real-time market prices and trends</p>
        <div className="space-y-2">
          {prices.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{item.crop}</span>
              <span className="font-bold">₹{item.price}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                item.trend === 'up' ? 'bg-green-100 text-green-800' :
                item.trend === 'down' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}