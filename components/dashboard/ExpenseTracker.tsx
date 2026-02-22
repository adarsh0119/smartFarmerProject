'use client';

import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function ExpenseTracker() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
          Expense Tracker
        </h2>
        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
          Add Expense
        </button>
      </div>
      
      <div className="text-center p-8">
        <DollarSign className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Expense Tracker</h3>
        <p className="text-gray-600 mb-4">Track farm income and expenses</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">₹12,500</div>
            <div className="text-sm text-green-600">Monthly Income</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-700">₹8,200</div>
            <div className="text-sm text-red-600">Monthly Expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
}