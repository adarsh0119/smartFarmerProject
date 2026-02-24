'use client';

import { useState, useEffect } from 'react';
import { Cloud, Thermometer, Droplets, Wind, Sun, CloudRain, MapPin, RefreshCw, Navigation, Search } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setError('');
      
      // First, always get the location name using a free geocoding service
      let locationName = '';
      try {
        // Use BigDataCloud for reverse geocoding - it's free and doesn't have CORS issues
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=hi`
        );
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          const city = geoData.city || geoData.locality || geoData.principalSubdivision;
          const country = geoData.countryCode || 'IN';
          locationName = city ? `${city}, ${country}` : `${country}`;
          
          setLocation(locationName);
          
          // Save location to localStorage
          localStorage.setItem('weatherLocation', JSON.stringify({
            name: locationName,
            lat,
            lon
          }));
          
          // Update user's location in localStorage if user is logged in
          const userData = localStorage.getItem('user');
          if (userData) {
            try {
              const user = JSON.parse(userData);
              user.state = city;
              user.country = country;
              localStorage.setItem('user', JSON.stringify(user));
              // Trigger event to update header
              window.dispatchEvent(new Event('userChanged'));
            } catch (err) {
              console.error('Error updating user location:', err);
            }
          }
        } else {
          // Fallback to coordinates display
          locationName = `Location: ${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
          setLocation(locationName);
        }
      } catch (geoErr) {
        console.error('Geocoding error:', geoErr);
        locationName = `Location: ${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
        setLocation(locationName);
      }
      
      // Now try to fetch weather data
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '8a2e073e54f5f7a2e3d8c4b6f1e9a0d7';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      setWeather({
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000),
      });
      
      // If we got weather data, update location with weather API's name (more accurate)
      if (data.name) {
        const weatherLocationName = `${data.name}, ${data.sys.country}`;
        setLocation(weatherLocationName);
        
        localStorage.setItem('weatherLocation', JSON.stringify({
          name: weatherLocationName,
          lat,
          lon
        }));
        
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            user.state = data.name;
            user.country = data.sys.country;
            localStorage.setItem('user', JSON.stringify(user));
            window.dispatchEvent(new Event('userChanged'));
          } catch (err) {
            console.error('Error updating user location:', err);
          }
        }
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(`Sorry, there was an issue fetching weather data for this location. Please check your API key or try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '8a2e073e54f5f7a2e3d8c4b6f1e9a0d7';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      
      setWeather({
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000),
      });
      
      setLocation(`${data.name}, ${data.sys.country}`);
      
      // Save location to localStorage
      localStorage.setItem('weatherLocation', JSON.stringify({
        name: `${data.name}, ${data.sys.country}`,
        lat: data.coord.lat,
        lon: data.coord.lon
      }));
      
      setShowLocationModal(false);
      setSearchCity('');
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('City not found. Please try another city.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '8a2e073e54f5f7a2e3d8c4b6f1e9a0d7';
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
    searchCities(value);
  };

  const handleCitySelect = (city: any) => {
    fetchWeatherByCoords(city.lat, city.lon);
    setSearchResults([]);
    setSearchCity('');
    setShowLocationModal(false);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('आपका ब्राउज़र स्थान सेवा का समर्थन नहीं करता। कृपया मैन्युअल रूप से शहर चुनें।');
      setLocation('स्थान समर्थित नहीं');
      setIsLoading(false);
      setShowLocationModal(true);
      return;
    }

    setShowLocationModal(false);
    setIsLoading(true);
    setError('');
    setLocation('आपका स्थान पता लगाया जा रहा है...');
    
    console.log('Requesting device location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location obtained:', position.coords.latitude, position.coords.longitude);
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLoading(false);
        
        let errorMessage = '';
        let shouldShowModal = true;
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'स्थान एक्सेस अस्वीकृत। कृपया अपनी ब्राउज़र सेटिंग्स में स्थान एक्सेस की अनुमति दें:\n\n';
          errorMessage += '1. ब्राउज़र के एड्रेस बार में ताला/जानकारी आइकन पर क्लिक करें\n';
          errorMessage += '2. "स्थान" या "Location" सेटिंग खोजें\n';
          errorMessage += '3. "अनुमति दें" या "Allow" चुनें\n';
          errorMessage += '4. पेज को रीफ्रेश करें\n\n';
          errorMessage += 'या मैन्युअल रूप से शहर चुनें।';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'स्थान जानकारी उपलब्ध नहीं है। कृपया सुनिश्चित करें कि:\n\n';
          errorMessage += '1. आपका डिवाइस GPS/स्थान सेवा चालू है\n';
          errorMessage += '2. आप इंटरनेट से कनेक्टेड हैं\n';
          errorMessage += '3. ब्राउज़र को स्थान एक्सेस की अनुमति है\n\n';
          errorMessage += 'या मैन्युअल रूप से शहर चुनें।';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'स्थान प्राप्त करने में समय समाप्त हो गया। कृपया:\n\n';
          errorMessage += '1. अपना इंटरनेट कनेक्शन जांचें\n';
          errorMessage += '2. पुनः प्रयास करें\n';
          errorMessage += '3. या मैन्युअल रूप से शहर चुनें';
        } else {
          errorMessage = 'स्थान प्राप्त करने में त्रुटि। कृपया मैन्युअल रूप से शहर चुनें।';
        }
        
        setError(errorMessage);
        setLocation('स्थान उपलब्ध नहीं');
        if (shouldShowModal) {
          setShowLocationModal(true);
        }
      },
      {
        enableHighAccuracy: true, // Use GPS for better accuracy
        timeout: 15000, // 15 seconds timeout
        maximumAge: 0 // Don't use cached location, get fresh location
      }
    );
  };

  useEffect(() => {
    // Check if there's a saved location
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
      try {
        const { lat, lon } = JSON.parse(savedLocation);
        fetchWeatherByCoords(lat, lon);
      } catch {
        useCurrentLocation();
      }
    } else {
      // First time - get current location
      useCurrentLocation();
    }
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-amber-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  const getFarmingAdvice = () => {
    if (!weather) return '';
    
    const temp = weather.temperature;
    const humidity = weather.humidity;
    const condition = weather.condition.toLowerCase();

    if (condition.includes('rain')) {
      return 'आज सिंचाई से बचें। बारिश आधारित फसलों की बुवाई के लिए अच्छा समय है।';
    }
    if (temp > 35) {
      return 'उच्च तापमान चेतावनी! सुबह जल्दी या शाम को देर से फसलों को पानी दें।';
    }
    if (temp < 10) {
      return 'कम तापमान। संवेदनशील फसलों को कवर से सुरक्षित रखें।';
    }
    if (humidity > 80) {
      return 'उच्च आर्द्रता। फफूंद रोगों के लिए सावधान रहें। निवारक फफूंदनाशक लगाएं।';
    }
    return 'सामान्य मौसम की स्थिति। नियमित खेती गतिविधियां जारी रखें।';
  };

  if (isLoading && !location) {
    return (
      <div className="card">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
            <p className="text-gray-600 font-medium">आपका स्थान पता लगाया जा रहा है...</p>
            <p className="text-sm text-gray-500 mt-2">इसमें कुछ सेकंड लग सकते हैं</p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-sm mx-auto">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">💡 सुझाव:</span> यदि ब्राउज़र स्थान अनुमति मांगे, तो कृपया "अनुमति दें" पर क्लिक करें। 
                यह आपके क्षेत्र के लिए सटीक मौसम जानकारी प्रदान करेगा।
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center text-gray-900">
            <Cloud className="w-5 h-5 mr-2 text-blue-500" />
            मौसम पूर्वानुमान
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowLocationModal(true)}
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center"
            >
              <MapPin className="w-4 h-4 mr-1" />
              बदलें
            </button>
            <button
              onClick={useCurrentLocation}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              रीफ्रेश करें
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 mb-2">स्थान प्राप्त नहीं हो सका</p>
                <div className="text-sm text-red-700 whitespace-pre-line">{error}</div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={useCurrentLocation}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    पुनः प्रयास करें
                  </button>
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="px-4 py-2 bg-white border border-red-300 text-red-700 text-sm rounded-lg hover:bg-red-50 transition-colors"
                  >
                    शहर चुनें
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show location box - always visible when we have location */}
        {location && location !== 'आपका स्थान पता लगाया जा रहा है...' && (
          <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500">आपका स्थान</p>
                  <p className="font-semibold text-gray-900 text-lg">{location}</p>
                </div>
              </div>
              {!error && isLoading && (
                <RefreshCw className="w-5 h-5 text-emerald-600 animate-spin" />
              )}
            </div>
          </div>
        )}

        {weather ? (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <p className="text-sm">मौसम डेटा</p>
                  </div>
                  <p className="font-semibold text-gray-900">{location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2">
                    {getWeatherIcon(weather.condition)}
                  </div>
                  <div className="text-4xl font-bold text-gray-900">{weather.temperature}°C</div>
                  <p className="text-sm text-gray-600 capitalize">{weather.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">महसूस होता है</p>
                    <p className="font-semibold text-gray-900">{weather.feelsLike}°C</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">आर्द्रता</p>
                    <p className="font-semibold text-gray-900">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">हवा</p>
                    <p className="font-semibold text-gray-900">{weather.windSpeed} किमी/घंटा</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">दबाव</p>
                <p className="font-semibold text-gray-900">{weather.pressure} hPa</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">दृश्यता</p>
                <p className="font-semibold text-gray-900">{weather.visibility} किमी</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center">
                <Sun className="w-4 h-4 mr-2" />
                खेती सलाह
              </h4>
              <p className="text-sm text-emerald-700">{getFarmingAdvice()}</p>
            </div>

            {weather.temperature > 35 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">मौसम चेतावनी</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    1 सक्रिय
                  </span>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    ⚠️ उच्च तापमान चेतावनी! अपनी फसलों के लिए सावधानी बरतें।
                  </p>
                </div>
              </div>
            )}
          </>
        ) : error ? (
          <div className="text-center py-8">
            <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">मौसम डेटा वर्तमान में उपलब्ध नहीं है</p>
            <p className="text-sm text-gray-500">कृपया ऊपर दिए गए त्रुटि संदेश की जांच करें</p>
          </div>
        ) : null}
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">स्थान चुनें</h3>
            
            <div className="space-y-4">
              {/* Current Location Button */}
              <button
                onClick={useCurrentLocation}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <Navigation className="w-5 h-5" />
                <span>वर्तमान स्थान का उपयोग करें</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">या शहर खोजें</span>
                </div>
              </div>

              {/* City Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={handleCitySearch}
                  placeholder="शहर खोजें..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder:text-gray-500"
                  autoFocus
                />
                
                {/* Search Results Dropdown */}
                {searchCity.length >= 2 && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
                    {isSearching ? (
                      <div className="text-center py-4">
                        <RefreshCw className="w-5 h-5 text-emerald-600 animate-spin mx-auto" />
                        <p className="text-sm text-gray-600 mt-2">खोज रहे हैं...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((city, index) => (
                        <button
                          key={index}
                          onClick={() => handleCitySelect(city)}
                          className="w-full text-left px-4 py-3 hover:bg-emerald-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <p className="font-medium text-gray-900">
                            {city.name}, {city.country}
                          </p>
                          {city.state && (
                            <p className="text-sm text-gray-500">{city.state}</p>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        कोई शहर नहीं मिला। कोई अन्य खोज आज़माएं।
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setShowLocationModal(false);
                setSearchCity('');
                setSearchResults([]);
              }}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              रद्द करें
            </button>
          </div>
        </div>
      )}
    </>
  );
}