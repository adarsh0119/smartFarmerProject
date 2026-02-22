'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Shield, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const features = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: 'Smart Crop Recommendations',
      description: 'Get AI-powered crop suggestions based on soil, weather, and market conditions.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Disease Detection',
      description: 'Upload crop images to detect diseases early and get treatment recommendations.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Market Insights',
      description: 'Real-time mandi prices and market trends to maximize your profits.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Connect with other farmers and agricultural experts for guidance.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Smart Farmer</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering Farmers with
            <span className="text-gradient ml-2">Smart Technology</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Your all-in-one digital companion for modern farming. Get crop recommendations, 
            disease detection, market prices, and expert advice in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/auth/login"
              className="btn-outline px-8 py-3 text-lg"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Smart Farming
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with agricultural expertise 
            to help you make better farming decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${feature.bgColor} w-fit mb-4`}>
                <div className={feature.color}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-emerald-100">Farmers Empowered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-emerald-100">Crop Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹2.5Cr+</div>
              <div className="text-emerald-100">Profit Increased</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of farmers who are already using Smart Farmer to 
              increase their yields and profits.
            </p>
            <Link
              href="/auth/signup"
              className="btn-primary px-8 py-3 text-lg inline-flex items-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Smart Farmer</span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Smart Farmer Assistant. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}