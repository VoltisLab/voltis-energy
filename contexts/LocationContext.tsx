'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Country = 'UK' | 'SA' | 'GH' | 'NG';

interface LocationContextType {
  country: Country;
  setCountry: (country: Country) => void;
  currency: string;
  currencySymbol: string;
  countryName: string;
}

const currencyMap = {
  UK: { symbol: '£', code: 'GBP', name: 'United Kingdom' },
  SA: { symbol: 'R', code: 'ZAR', name: 'South Africa' },
  GH: { symbol: '₵', code: 'GHS', name: 'Ghana' },
  NG: { symbol: '₦', code: 'NGN', name: 'Nigeria' }
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country>('UK');

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry') as Country;
    if (savedCountry && currencyMap[savedCountry]) {
      setCountryState(savedCountry);
    }
  }, []);

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    localStorage.setItem('selectedCountry', newCountry);
  };

  const value: LocationContextType = {
    country,
    setCountry,
    currency: currencyMap[country].code,
    currencySymbol: currencyMap[country].symbol,
    countryName: currencyMap[country].name
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

// Helper function to format currency
export function formatCurrency(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${amount.toLocaleString()}`;
}

