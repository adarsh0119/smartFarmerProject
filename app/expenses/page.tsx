'use client';

import ExpenseTracker from '@/components/dashboard/ExpenseTracker';

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
        <p className="text-gray-600">Track and manage your farming expenses</p>
      </div>
      
      <ExpenseTracker />
    </div>
  );
}
