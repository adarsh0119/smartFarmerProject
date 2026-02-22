'use client';

import { Phone, Mail, MessageCircle, HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get assistance with your farming needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Options */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
              <Phone className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-600 mt-1">Call us 24/7</p>
                <p className="text-lg font-bold text-emerald-600 mt-2">1800-123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                <p className="text-lg font-bold text-blue-600 mt-2">support@smartfarmer.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-600 mt-1">Chat with our support team</p>
                <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <HelpCircle className="inline w-6 h-6 mr-2 text-emerald-600" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I add my farm details?</h3>
              <p className="text-sm text-gray-600">Go to Settings and fill in your farm information including location and size.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How accurate are the crop recommendations?</h3>
              <p className="text-sm text-gray-600">Our recommendations are based on soil type, weather data, and local farming practices.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I track multiple farms?</h3>
              <p className="text-sm text-gray-600">Currently, you can manage one farm per account. Contact support for multi-farm access.</p>
            </div>

            <div className="pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I report a bug?</h3>
              <p className="text-sm text-gray-600">Email us at support@smartfarmer.com with details about the issue you're experiencing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
