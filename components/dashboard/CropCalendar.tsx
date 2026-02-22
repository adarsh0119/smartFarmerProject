'use client';

import { Calendar, CheckCircle, Clock } from 'lucide-react';

export default function CropCalendar() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Crop Calendar
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View Full Calendar
        </button>
      </div>
      
      <div className="text-center p-8">
        <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Crop Calendar</h3>
        <p className="text-gray-600 mb-4">Sowing and harvesting schedules</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Wheat - Sowing</span>
            </div>
            <span className="text-sm text-gray-600">Nov 15</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-amber-500 mr-2" />
              <span>Rice - Harvesting</span>
            </div>
            <span className="text-sm text-gray-600">Oct 30</span>
          </div>
        </div>
      </div>
    </div>
  );
}