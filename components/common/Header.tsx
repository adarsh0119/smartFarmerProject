'use client';

import { useState, useEffect } from 'react';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Weather alert: Rain expected tomorrow', time: '2 hours ago' },
    { id: 2, message: 'Wheat prices increased by 5%', time: '1 day ago' },
    { id: 3, message: 'New government scheme announced', time: '2 days ago' },
  ]);

  const [user, setUser] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    // Function to check user data
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Check for weather location first (priority)
          const weatherLocation = localStorage.getItem('weatherLocation');
          if (weatherLocation) {
            try {
              const { name } = JSON.parse(weatherLocation);
              if (name && name !== 'Fetching location...') {
                setUserLocation(name);
                return;
              }
            } catch (err) {
              console.error('Error parsing weather location:', err);
            }
          }
          
          // Fallback to user state
          if (parsedUser.state) {
            const locationStr = parsedUser.country 
              ? `${parsedUser.state}, ${parsedUser.country}`
              : parsedUser.state;
            setUserLocation(locationStr);
          } else {
            setUserLocation('Location not set');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        setUser(null);
        setUserLocation('');
      }
    };

    // Check on mount
    checkUser();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUser);

    // Custom event for same-tab updates
    window.addEventListener('userChanged', checkUser);

    // Poll for location updates every 2 seconds for the first 10 seconds
    let pollCount = 0;
    const pollInterval = setInterval(() => {
      pollCount++;
      checkUser();
      if (pollCount >= 5) {
        clearInterval(pollInterval);
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userChanged', checkUser);
      clearInterval(pollInterval);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileOpen(false);
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">Smart Farmer Assistant</h1>
                <p className="text-sm text-emerald-100">Empowering farmers with technology</p>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              <span className="text-sm font-medium">हिंदी</span>
              <span className="text-xs">/</span>
              <span className="text-sm font-medium">English</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-emerald-700 transition-colors relative">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl z-50 hidden group-hover:block">
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  {notifications.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
                  )}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'Guest User'}</p>
                  <p className="text-xs text-emerald-100">
                    {user ? (userLocation || 'Loading location...') : 'Not logged in'}
                  </p>
                </div>
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name || 'Guest User'}</p>
                        <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
                        {user && (
                          <p className="text-xs text-gray-500 mt-1">
                            {user.farmSize && `${user.farmSize} acres`}
                            {userLocation && ` • ${userLocation}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
                      My Farm Details
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
                      Help & Support
                    </button>
                  </div>
                  
                  <div className="p-2 border-t">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded hover:bg-red-50 text-red-600 text-sm font-medium"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded hover:bg-emerald-50 text-emerald-600 text-sm font-medium"
                      >
                        <User size={16} />
                        <span>Login / Sign Up</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}