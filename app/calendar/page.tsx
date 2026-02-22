'use client';

import CropCalendar from '@/components/dashboard/CropCalendar';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Calendar</h1>
        <p className="text-gray-600">Plan your farming activities with our interactive calendar</p>
      </div>
      
      <CropCalendar />
    </div>
  );
}
