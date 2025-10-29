'use client';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { country, setCountry, countryName } = useLocation();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Projects', href: '/projects' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-bold text-blue-600">Voltis Energy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link 
                href={item.href} 
                key={index}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Location Selector */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-600 transition-colors"
              >
                <Globe size={18} className="text-blue-600" />
                <span className="text-sm font-medium">{countryName}</span>
              </button>
              
              {isLocationOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 overflow-hidden z-50">
                  {[
                    { code: 'UK' as const, name: 'United Kingdom', flag: '🇬🇧', currency: '£' },
                    { code: 'SA' as const, name: 'South Africa', flag: '🇿🇦', currency: 'R' },
                    { code: 'GH' as const, name: 'Ghana', flag: '🇬🇭', currency: '₵' },
                    { code: 'NG' as const, name: 'Nigeria', flag: '🇳🇬', currency: '₦' }
                  ].map((location) => (
                    <button
                      key={location.code}
                      onClick={() => {
                        setCountry(location.code);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors ${
                        country === location.code ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="text-2xl">{location.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-500">Currency: {location.currency}</div>
                      </div>
                      {country === location.code && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Get Free Quote
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/contact">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                Quote
              </button>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Location Selector */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                <Globe size={16} />
                <span>Select Location</span>
              </div>
              <div className="space-y-1">
                {[
                  { code: 'UK' as const, name: 'United Kingdom', flag: '🇬🇧' },
                  { code: 'SA' as const, name: 'South Africa', flag: '🇿🇦' },
                  { code: 'GH' as const, name: 'Ghana', flag: '🇬🇭' },
                  { code: 'NG' as const, name: 'Nigeria', flag: '🇳🇬' }
                ].map((location) => (
                  <button
                    key={location.code}
                    onClick={() => setCountry(location.code)}
                    className={`w-full flex items-center gap-2 p-2 rounded transition-colors ${
                      country === location.code ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span>{location.flag}</span>
                    <span className="text-sm font-medium">{location.name}</span>
                    {country === location.code && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                onClick={() => setIsMenuOpen(false)}
                className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

