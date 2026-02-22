'use client';

import { useState } from 'react';
import { Sprout, Filter, Search, Calendar, Droplets } from 'lucide-react';

const cropsData = [
  {
    id: 1,
    name: 'Wheat',
    hindiName: 'गेहूं',
    season: 'Rabi',
    soilType: ['Loamy', 'Clay'],
    duration: '120-140 days',
    yield: '40-50 quintals/acre',
    msp: 2125,
    suitability: 'High',
  },
  {
    id: 2,
    name: 'Rice',
    hindiName: 'धान',
    season: 'Kharif',
    soilType: ['Clay', 'Loamy'],
    duration: '90-120 days',
    yield: '25-30 quintals/acre',
    msp: 2040,
    suitability: 'Medium',
  },
  {
    id: 3,
    name: 'Maize',
    hindiName: 'मक्का',
    season: 'Kharif',
    soilType: ['Sandy', 'Loamy'],
    duration: '80-100 days',
    yield: '20-25 quintals/acre',
    msp: 1870,
    suitability: 'High',
  },
  {
    id: 4,
    name: 'Sugarcane',
    hindiName: 'गन्ना',
    season: 'Perennial',
    soilType: ['Black', 'Loamy'],
    duration: '10-12 months',
    yield: '700-800 quintals/acre',
    msp: 3150,
    suitability: 'Medium',
  },
];

const seasons = ['All', 'Kharif', 'Rabi', 'Zaid', 'Perennial'];
const soilTypes = ['All', 'Clay', 'Sandy', 'Loamy', 'Black'];

export default function CropRecommendation() {
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSoil, setSelectedSoil] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  const filteredCrops = cropsData.filter(crop => {
    const matchesSeason = selectedSeason === 'All' || crop.season === selectedSeason;
    const matchesSoil = selectedSoil === 'All' || crop.soilType.includes(selectedSoil);
    const matchesSearch = searchQuery === '' || 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.hindiName.includes(searchQuery);
    
    return matchesSeason && matchesSoil && matchesSearch;
  });

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Sprout className="w-5 h-5 mr-2 text-emerald-500" />
          Crop Recommendation
        </h2>
        <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
          View All
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedSeason === season
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {soilTypes.map(soil => (
            <button
              key={soil}
              onClick={() => setSelectedSoil(soil)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedSoil === soil
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {soil}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search crops by name (English/Hindi)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Crops List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedCrop === crop.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
            onClick={() => setSelectedCrop(crop.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{crop.name}</h3>
                  <span className="text-gray-600">({crop.hindiName})</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSuitabilityColor(crop.suitability)}`}>
                    {crop.suitability} Suitability
                  </span>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{crop.season}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-4 h-4 text-gray-500" />
                    <span>{crop.soilType.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Duration: </span>
                    <span className="font-medium">{crop.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Yield: </span>
                    <span className="font-medium">{crop.yield}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-emerald-700">
                  ₹{crop.msp}/quintal
                </div>
                <div className="text-xs text-gray-500">MSP</div>
              </div>
            </div>

            {selectedCrop === crop.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-emerald-600 text-emerald-600 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                    Add to Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Sprout className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No crops found matching your criteria.</p>
          <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* Recommendation Summary */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-1">Recommendation</h4>
        <p className="text-sm text-blue-700">
          Based on your location and current season ({selectedSeason}), {filteredCrops.length} crops are recommended.
          {filteredCrops.length > 0 && ' Consider planting soon for optimal yield.'}
        </p>
      </div>
    </div>
  );
}