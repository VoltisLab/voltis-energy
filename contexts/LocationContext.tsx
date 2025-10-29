'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Country = 'UK' | 'SA' | 'GH' | 'NG';

interface LocationContextType {
  country: Country;
  setCountry: (country: Country) => void;
  currency: string;
  currencySymbol: string;
  countryName: string;
  exchangeRates: Record<string, number>;
  convertPrice: (priceInGBP: number) => number;
  formatPrice: (priceInGBP: number) => string;
  isLoading: boolean;
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
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    GBP: 1,
    ZAR: 23.5,  // Default fallback rates
    GHS: 19.8,
    NGN: 1950
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch exchange rates from API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        // Using open.er-api.com - free, no API key required
        const response = await fetch('https://open.er-api.com/v6/latest/GBP');
        const data = await response.json();
        
        if (data.rates) {
          setExchangeRates({
            GBP: 1,
            ZAR: data.rates.ZAR || 23.5,
            GHS: data.rates.GHS || 19.8,
            NGN: data.rates.NGN || 1950
          });
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Keep default rates if API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
    
    // Refresh rates every 24 hours
    const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Convert price from GBP to selected currency
  const convertPrice = (priceInGBP: number): number => {
    const currencyCode = currencyMap[country].code;
    const rate = exchangeRates[currencyCode] || 1;
    return priceInGBP * rate;
  };

  // Format price with currency symbol
  const formatPrice = (priceInGBP: number): string => {
    const converted = convertPrice(priceInGBP);
    const symbol = currencyMap[country].symbol;
    
    // Format based on currency (no decimals for NGN, ZAR, GHS)
    if (country === 'UK') {
      return `${symbol}${converted.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
  };

  const value: LocationContextType = {
    country,
    setCountry,
    currency: currencyMap[country].code,
    currencySymbol: currencyMap[country].symbol,
    countryName: currencyMap[country].name,
    exchangeRates,
    convertPrice,
    formatPrice,
    isLoading
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

// Helper function to format currency (deprecated - use formatPrice from context)
export function formatCurrency(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${amount.toLocaleString()}`;
}

