'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeatherCard from '@/components/dashboard/WeatherCard';
import CropRecommendation from '@/components/dashboard/CropRecommendation';
import DiseaseDetection from '@/components/dashboard/DiseaseDetection';
import MandiPrices from '@/components/dashboard/MandiPrices';
import CropCalendar from '@/components/dashboard/CropCalendar';
import ExpenseTracker from '@/components/dashboard/ExpenseTracker';
import Marketplace from '@/components/dashboard/Marketplace';
import Schemes from '@/components/dashboard/Schemes';
import { TrendingUp, Users, Crop, DollarSign, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    activeCrops: 3,
    monthlyProfit: 12500,
    pendingTasks: 2,
    weatherAlerts: 1,
  });

  useEffect(() => {
    // Check if user is logged in or guest
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userData) {
          setUser(JSON.parse(userData));
        }
        // Don't redirect - allow guest access
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Show guest dashboard
    return (
      <div className="space-y-6">
        {/* Welcome Section for Guest */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to Smart Farmer! 👋</h1>
              <p className="text-emerald-100">
                Explore farming insights and tools. Sign up to save your farm data and get personalized recommendations.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button 
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Sign Up Free
              </button>
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Guest Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherCard />
          <CropRecommendation />
          <DiseaseDetection />
          <MandiPrices />
          <CropCalendar />
          <ExpenseTracker />
          <Marketplace />
          <Schemes />
        </div>

        {/* Guest Benefits */}
        <div className="card hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Why Sign Up?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save Your Farm Data</h3>
              <p className="text-sm text-gray-600">Store crop details, expenses, and farm information securely</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalized Insights</h3>
              <p className="text-sm text-gray-600">Get crop recommendations based on your location and farm size</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-lg border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor expenses, yields, and profits over time</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name || 'Farmer'}! 👋</h1>
            <p className="text-emerald-100">
              Here's what's happening with your farm today. Stay updated with the latest insights.
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-emerald-200">
              {user.email && <span>📧 {user.email}</span>}
              {user.state && <span>• 📍 {user.state}</span>}
              {user.district && <span>• {user.district}</span>}
              {user.farmSize && <span>• {user.farmSize} acres</span>}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
              View Farm Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg">
              <Crop className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Crops</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCrops}</p>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Monthly Profit</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Weather Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.weatherAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherCard />
        <CropRecommendation />
        <DiseaseDetection />
        <MandiPrices />
        <CropCalendar />
        <ExpenseTracker />
        <Marketplace />
        <Schemes />
      </div>

      {/* Quick Actions */}
      <div className="card hover:shadow-lg transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-lg hover:from-emerald-100 hover:to-emerald-50 transition-all duration-300 text-center border border-emerald-100">
            <div className="text-emerald-600 font-semibold">Add Expense</div>
            <p className="text-sm text-gray-600 mt-1">Record farm expense</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg hover:from-blue-100 hover:to-blue-50 transition-all duration-300 text-center border border-blue-100">
            <div className="text-blue-600 font-semibold">Check Prices</div>
            <p className="text-sm text-gray-600 mt-1">View mandi rates</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-lg hover:from-amber-100 hover:to-amber-50 transition-all duration-300 text-center border border-amber-100">
            <div className="text-amber-600 font-semibold">Upload Image</div>
            <p className="text-sm text-gray-600 mt-1">Detect crop disease</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg hover:from-purple-100 hover:to-purple-50 transition-all duration-300 text-center border border-purple-100">
            <div className="text-purple-600 font-semibold">Get Advice</div>
            <p className="text-sm text-gray-600 mt-1">Talk to expert</p>
          </button>
        </div>
      </div>
    </div>
  );
}