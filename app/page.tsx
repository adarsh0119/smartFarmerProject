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
          <p className="text-gray-600">डैशबोर्ड लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Show guest home page with introduction
    return (
      <div className="space-y-6">
        {/* Hero Section - Website Introduction */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🌾 स्मार्ट किसान सहायक में आपका स्वागत है
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-6">
              आधुनिक तकनीक से खेती को बनाएं आसान और लाभदायक
            </p>
            <p className="text-lg text-emerald-50 mb-8 max-w-3xl mx-auto">
              मौसम की जानकारी, फसल सुझाव, मंडी भाव, रोग पहचान, खर्च प्रबंधन और सरकारी योजनाओं की जानकारी - सब एक जगह!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                मुफ्त में शुरू करें →
              </button>
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                लॉगिन करें
              </button>
            </div>
          </div>
        </div>

        {/* Main Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Card Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">मौसम पूर्वानुमान</h3>
                <p className="text-sm text-gray-500">वास्तविक समय मौसम</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              अपने क्षेत्र का सटीक मौसम पूर्वानुमान और खेती के लिए विशेष सलाह प्राप्त करें।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>अभी देखें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Crop Recommendation Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mr-4">
                <Sprout className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">फसल सुझाव</h3>
                <p className="text-sm text-gray-500">65+ फसलों की जानकारी</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              मौसम, मिट्टी और क्षेत्र के अनुसार सबसे उपयुक्त फसलों की सिफारिश पाएं।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>फसलें देखें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Mandi Prices Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">मंडी भाव</h3>
                <p className="text-sm text-gray-500">700+ जिलों के भाव</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              अपने जिले की ताजा मंडी भाव और MSP की जानकारी तुरंत प्राप्त करें।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>भाव देखें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Disease Detection Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">रोग पहचान</h3>
                <p className="text-sm text-gray-500">AI आधारित पहचान</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              फसल की फोटो अपलोड करें और तुरंत रोग की पहचान और उपचार पाएं।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>जांच करें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Expense Tracker Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">खर्च ट्रैकर</h3>
                <p className="text-sm text-gray-500">आय-व्यय प्रबंधन</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              अपनी खेती की आय और खर्च का हिसाब रखें और मुनाफा बढ़ाएं।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>शुरू करें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Government Schemes Preview */}
          <div className="card hover:shadow-xl transition-all duration-300 border-2 border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mr-4">
                <Crop className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">सरकारी योजनाएं</h3>
                <p className="text-sm text-gray-500">10+ योजनाएं</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              किसानों के लिए सरकारी योजनाओं की जानकारी और सीधे आवेदन करें।
            </p>
            <div className="flex items-center text-emerald-600 font-medium">
              <span>योजनाएं देखें</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="card bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-emerald-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">हमें क्यों चुनें?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">100% मुफ्त</h3>
              <p className="text-gray-600">सभी सुविधाएं बिल्कुल मुफ्त। कोई छिपा हुआ शुल्क नहीं।</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">आसान उपयोग</h3>
              <p className="text-gray-600">सरल हिंदी इंटरफेस। कोई तकनीकी ज्ञान की जरूरत नहीं।</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">तेज और सटीक</h3>
              <p className="text-gray-600">वास्तविक समय डेटा और AI आधारित सुझाव।</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-emerald-600 to-green-700 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">आज ही शुरू करें!</h2>
          <p className="text-xl text-emerald-100 mb-6">
            हजारों किसान पहले से ही स्मार्ट किसान सहायक का उपयोग कर रहे हैं
          </p>
          <button
            onClick={() => router.push('/auth/signup')}
            className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            अभी साइन अप करें - यह मुफ्त है! →
          </button>
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