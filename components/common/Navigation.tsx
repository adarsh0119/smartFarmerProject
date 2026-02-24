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
  Beef,
  Video,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'होम', icon: Home, href: '/' },
  { id: 'weather', label: 'मौसम', icon: Cloud, href: '/weather' },
  { id: 'crops', label: 'फसल सुझाव', icon: Sprout, href: '/crops' },
  { id: 'diseases', label: 'रोग पहचान', icon: Bug, href: '/diseases' },
  { id: 'prices', label: 'मंडी भाव', icon: TrendingUp, href: '/prices' },
  { id: 'calendar', label: 'फसल कैलेंडर', icon: Calendar, href: '/calendar' },
  { id: 'expenses', label: 'खर्च ट्रैकर', icon: DollarSign, href: '/expenses' },
  { id: 'livestock', label: 'पशुपालन', icon: Beef, href: '/livestock' },
  { id: 'videos', label: 'वीडियो ट्यूटोरियल', icon: Video, href: '/videos' },
  { id: 'marketplace', label: 'बाजार', icon: Store, href: '/marketplace' },
  { id: 'schemes', label: 'सरकारी योजनाएं', icon: Award, href: '/schemes' },
];

const bottomItems = [
  { id: 'settings', label: 'सेटिंग्स', icon: Settings, href: '/settings' },
  { id: 'help', label: 'मदद और सहायता', icon: HelpCircle, href: '/help' },
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
            <span className="ml-2 text-sm text-gray-600">छोटा करें</span>
          )}
        </div>
      </button>

      {/* Main navigation items */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-6">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              मुख्य मेनू
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

        {/* Quick Stats (only when expanded) - REMOVED */}
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
              <p className="text-xs text-gray-500">मदद चाहिए?</p>
              <p className="text-sm font-medium text-gray-900">कॉल करें: 1800-123-4567</p>
              <p className="text-xs text-gray-500 mt-1">24/7 उपलब्ध</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}