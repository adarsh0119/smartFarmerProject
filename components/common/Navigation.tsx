'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Cloud,
  Sprout,
  Bug,
  TrendingUp,
  Calendar,
  DollarSign,
  Store,
  Award,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
  { id: 'weather', label: 'Weather', icon: Cloud, href: '/weather' },
  { id: 'crops', label: 'Crop Recommendation', icon: Sprout, href: '/crops' },
  { id: 'diseases', label: 'Disease Detection', icon: Bug, href: '/diseases' },
  { id: 'prices', label: 'Mandi Prices', icon: TrendingUp, href: '/prices' },
  { id: 'calendar', label: 'Crop Calendar', icon: Calendar, href: '/calendar' },
  { id: 'expenses', label: 'Expense Tracker', icon: DollarSign, href: '/expenses' },
  { id: 'marketplace', label: 'Marketplace', icon: Store, href: '/marketplace' },
  { id: 'schemes', label: 'Govt Schemes', icon: Award, href: '/schemes' },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '/help' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center">
            <div className={`w-4 h-0.5 bg-gray-600 transition-transform ${isCollapsed ? '' : 'rotate-45 translate-y-0.5'}`} />
            <div className={`w-4 h-0.5 bg-gray-600 transition-opacity ${isCollapsed ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`w-4 h-0.5 bg-gray-600 transition-transform ${isCollapsed ? '' : '-rotate-45 -translate-y-0.5'}`} />
          </div>
          {!isCollapsed && (
            <span className="ml-2 text-sm text-gray-600">Collapse</span>
          )}
        </div>
      </button>

      {/* Main navigation items */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-6">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Main Menu
            </h2>
          )}
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                    }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Stats (only when expanded) */}
        {!isCollapsed && (
          <div className="px-3 mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Stats
            </h2>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700">Active Crops</p>
                <p className="text-lg font-semibold text-blue-900">3</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-700">This Month's Profit</p>
                <p className="text-lg font-semibold text-green-900">₹12,500</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-xs text-amber-700">Pending Tasks</p>
                <p className="text-lg font-semibold text-amber-900">2</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation items */}
      <div className="border-t border-gray-200 pt-4 pb-6">
        <div className="px-3">
          <ul className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User info (only when expanded) */}
        {!isCollapsed && (
          <div className="px-3 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Need help?</p>
              <p className="text-sm font-medium text-gray-900">Call: 1800-123-4567</p>
              <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}