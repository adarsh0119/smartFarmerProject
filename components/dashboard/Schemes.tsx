'use client';

import { Award, CheckCircle } from 'lucide-react';

export default function Schemes() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          Government Schemes
        </h2>
        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
          View All
        </button>
      </div>
      
      <div className="text-center p-8">
        <Award className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Government Schemes</h3>
        <p className="text-gray-600 mb-4">Subsidies and support programs</p>
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>PM-KISAN Scheme</span>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>PM Fasal Bima Yojana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}