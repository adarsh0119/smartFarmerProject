'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Users, Crop, DollarSign, Cloud, Sprout } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    activeCrops: 3,
    monthlyProfit: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    pendingTasks: 2,
    weatherAlerts: 1,
  });

  useEffect(() => {
    // Check if user is logged in or guest
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userData && token) {
          setUser(JSON.parse(userData));
        } else {
          // Redirect to landing page if not logged in
          router.push('/landing');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/landing');
      }
    };

    checkAuth();
    calculateMonthlyStats();
    
    // Listen for transaction updates
    const handleTransactionUpdate = () => {
      calculateMonthlyStats();
    };
    
    window.addEventListener('transactionsUpdated', handleTransactionUpdate);
    
    return () => {
      window.removeEventListener('transactionsUpdated', handleTransactionUpdate);
    };
  }, [router]);

  const calculateMonthlyStats = () => {
    try {
      const transactions = localStorage.getItem('farmTransactions');
      if (transactions) {
        const parsedTransactions = JSON.parse(transactions);
        
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Filter transactions for current month
        const monthlyTransactions = parsedTransactions.filter((t: any) => {
          const transactionDate = new Date(t.date);
          return transactionDate.getMonth() === currentMonth && 
                 transactionDate.getFullYear() === currentYear;
        });
        
        // Calculate income and expense
        const income = monthlyTransactions
          .filter((t: any) => t.type === 'income')
          .reduce((sum: number, t: any) => sum + t.amount, 0);
          
        const expense = monthlyTransactions
          .filter((t: any) => t.type === 'expense')
          .reduce((sum: number, t: any) => sum + t.amount, 0);
        
        const profit = income - expense;
        
        setStats(prev => ({
          ...prev,
          monthlyProfit: profit,
          monthlyIncome: income,
          monthlyExpense: expense
        }));
      }
    } catch (error) {
      console.error('Error calculating monthly stats:', error);
    }
  };

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
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to landing page
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">नमस्ते, {user.name || 'किसान'}! 👋</h1>
            <p className="text-emerald-100">
              आज आपके खेत के साथ क्या हो रहा है यहां देखें।
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-emerald-200">
              {user.email && <span>📧 {user.email}</span>}
              {user.state && <span>• 📍 {user.state}</span>}
              {user.district && <span>• {user.district}</span>}
              {user.farmSize && <span>• {user.farmSize} एकड़</span>}
            </div>
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
              <p className="text-sm text-gray-500">सक्रिय फसलें</p>
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
              <p className="text-sm text-gray-500">इस महीने का मुनाफा</p>
              <p className={`text-2xl font-bold ${stats.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(stats.monthlyProfit).toLocaleString()}
              </p>
              {stats.monthlyProfit < 0 && (
                <p className="text-xs text-red-500 mt-1">हानि</p>
              )}
              {stats.monthlyIncome > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  आय: ₹{stats.monthlyIncome.toLocaleString()} | खर्च: ₹{stats.monthlyExpense.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">लंबित कार्य</p>
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
              <p className="text-sm text-gray-500">मौसम अलर्ट</p>
              <p className="text-2xl font-bold text-gray-900">{stats.weatherAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => router.push('/weather')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-3">
              <Cloud className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">मौसम पूर्वानुमान</h3>
          </div>
          <p className="text-gray-600 text-sm">आज का मौसम और खेती सलाह देखें</p>
        </div>

        <div 
          onClick={() => router.push('/crops')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mr-3">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">फसल सुझाव</h3>
          </div>
          <p className="text-gray-600 text-sm">65+ फसलों की जानकारी देखें</p>
        </div>

        <div 
          onClick={() => router.push('/prices')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">मंडी भाव</h3>
          </div>
          <p className="text-gray-600 text-sm">आज के ताजा मंडी भाव देखें</p>
        </div>

        <div 
          onClick={() => router.push('/diseases')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mr-3">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">रोग पहचान</h3>
          </div>
          <p className="text-gray-600 text-sm">फसल रोग की जांच करें</p>
        </div>

        <div 
          onClick={() => router.push('/expenses')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mr-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">खर्च ट्रैकर</h3>
          </div>
          <p className="text-gray-600 text-sm">आय-व्यय का हिसाब रखें</p>
        </div>

        <div 
          onClick={() => router.push('/schemes')}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mr-3">
              <Crop className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">सरकारी योजनाएं</h3>
          </div>
          <p className="text-gray-600 text-sm">योजनाओं के लिए आवेदन करें</p>
        </div>
      </div>
    </div>
  );
}