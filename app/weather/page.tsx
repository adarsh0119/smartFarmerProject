'use client';

import WeatherCard from '@/components/dashboard/WeatherCard';

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Forecast</h1>
        <p className="text-gray-600">Get detailed weather information and farming advice</p>
      </div>
      
      <WeatherCard />
    </div>
  );
}
