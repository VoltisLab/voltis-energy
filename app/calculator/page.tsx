'use client';
import { motion } from 'framer-motion';
import { Calculator, Home, Building2, Sun, Zap, Battery, TrendingDown, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import Link from 'next/link';

export default function CalculatorPage() {
  const { currencySymbol } = useLocation();
  const [config, setConfig] = useState({
    // Property Details
    propertyType: 'residential',
    roofSize: 100,
    roofOrientation: 'south',
    roofPitch: 30,
    shadingLevel: 'none',
    
    // Energy Details
    monthlyBill: 150,
    dailyConsumption: 15,
    peakUsageTime: 'evening',
    
    // System Preferences
    panelType: 'monocrystalline',
    panelCount: 16,
    inverterType: 'string',
    
    // Battery Storage
    includeBattery: false,
    batteryCapacity: 10,
  });

  const handleChange = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  // Calculations
  const calculateSystemSize = () => {
    const panelWattage = config.panelType === 'monocrystalline' ? 400 : 350;
    return (config.panelCount * panelWattage) / 1000;
  };

  const calculateSystemCost = () => {
    const systemSize = calculateSystemSize();
    
    const panelCostPerKW = config.panelType === 'monocrystalline' ? 650 : 550;
    const panelCost = systemSize * panelCostPerKW;
    
    const inverterCostMap = {
      'string': systemSize * 200,
      'microinverter': config.panelCount * 150,
      'hybrid': systemSize * 300,
    };
    const inverterCost = inverterCostMap[config.inverterType as keyof typeof inverterCostMap];
    
    const installationCost = systemSize * 300;
    const batteryCost = config.includeBattery ? config.batteryCapacity * 850 : 0;
    
    return Math.round(panelCost + inverterCost + installationCost + batteryCost);
  };

  const calculateAnnualSavings = () => {
    const annualBill = config.monthlyBill * 12;
    const savingsRate = config.includeBattery ? 0.75 : 0.65;
    return Math.round(annualBill * savingsRate);
  };

  const calculatePaybackPeriod = () => {
    const totalCost = calculateSystemCost();
    const annualSavings = calculateAnnualSavings();
    return (totalCost / annualSavings).toFixed(1);
  };

  const calculate25YearSavings = () => {
    const annualSavings = calculateAnnualSavings();
    return Math.round(annualSavings * 25);
  };

  const systemSize = calculateSystemSize();
  const totalCost = calculateSystemCost();
  const annualSavings = calculateAnnualSavings();
  const paybackPeriod = calculatePaybackPeriod();
  const lifetimeSavings = calculate25YearSavings();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-6">
              <Calculator className="w-8 h-8 text-blue-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solar System Builder
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Configure your perfect solar system and get instant cost & savings estimates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={config.propertyType}
                      onChange={(e) => handleChange('propertyType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Roof Size (m²)
                    </label>
                    <input
                      type="number"
                      value={config.roofSize}
                      onChange={(e) => handleChange('roofSize', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roof Orientation
                    </label>
                    <select
                      value={config.roofOrientation}
                      onChange={(e) => handleChange('roofOrientation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="south">South (Best)</option>
                      <option value="south-east">South-East</option>
                      <option value="south-west">South-West</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shading Level
                    </label>
                    <select
                      value={config.shadingLevel}
                      onChange={(e) => handleChange('shadingLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">No Shade (Optimal)</option>
                      <option value="partial">Partial Shade</option>
                      <option value="significant">Significant Shade</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Energy Usage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Energy Usage</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Electric Bill ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={config.monthlyBill}
                      onChange={(e) => handleChange('monthlyBill', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Consumption (kWh)
                    </label>
                    <input
                      type="number"
                      value={config.dailyConsumption}
                      onChange={(e) => handleChange('dailyConsumption', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peak Usage Time
                    </label>
                    <select
                      value={config.peakUsageTime}
                      onChange={(e) => handleChange('peakUsageTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="morning">Morning (6am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-6pm)</option>
                      <option value="evening">Evening (6pm-12am)</option>
                      <option value="night">Night (12am-6am)</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* System Configuration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">System Configuration</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Panel Type
                    </label>
                    <select
                      value={config.panelType}
                      onChange={(e) => handleChange('panelType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="monocrystalline">Monocrystalline (High Efficiency - 400W)</option>
                      <option value="polycrystalline">Polycrystalline (Standard - 350W)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Panels
                    </label>
                    <input
                      type="number"
                      min="4"
                      max="50"
                      value={config.panelCount}
                      onChange={(e) => handleChange('panelCount', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">System Size: {systemSize.toFixed(1)} kW</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inverter Type
                    </label>
                    <select
                      value={config.inverterType}
                      onChange={(e) => handleChange('inverterType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="string">String Inverter (Most Cost-Effective)</option>
                      <option value="microinverter">Microinverters (Best Performance)</option>
                      <option value="hybrid">Hybrid Inverter (Battery Ready)</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Battery Storage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Battery Storage (Optional)</h2>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.includeBattery}
                      onChange={(e) => handleChange('includeBattery', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Include Battery Storage</span>
                  </label>

                  {config.includeBattery && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Battery Capacity (kWh)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="30"
                        value={config.batteryCapacity}
                        onChange={(e) => handleChange('batteryCapacity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: 10-15 kWh for most homes</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Results Summary - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white sticky top-24"
              >
                <h2 className="text-2xl font-bold mb-6">Your Solar System</h2>
                
                <div className="space-y-4">
                  {/* System Size */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-blue-100 mb-1">System Size</div>
                    <div className="text-3xl font-bold">{systemSize.toFixed(1)} kW</div>
                    <div className="text-xs text-blue-200 mt-1">{config.panelCount} × {config.panelType === 'monocrystalline' ? '400W' : '350W'} panels</div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-blue-100 mb-1">Total Investment</div>
                    <div className="text-3xl font-bold">{currencySymbol}{totalCost.toLocaleString()}</div>
                    <div className="text-xs text-blue-200 mt-1">Installation included</div>
                  </div>

                  {/* Annual Savings */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
                      <TrendingDown className="w-4 h-4" />
                      Annual Savings
                    </div>
                    <div className="text-3xl font-bold text-green-300">{currencySymbol}{annualSavings.toLocaleString()}/year</div>
                  </div>

                  {/* Payback Period */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
                      <Clock className="w-4 h-4" />
                      Payback Period
                    </div>
                    <div className="text-3xl font-bold text-yellow-300">{paybackPeriod} years</div>
                  </div>

                  {/* Lifetime Savings */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-blue-100 mb-1">25-Year Savings</div>
                    <div className="text-3xl font-bold text-green-300">{currencySymbol}{lifetimeSavings.toLocaleString()}</div>
                  </div>

                  {/* Battery Info */}
                  {config.includeBattery && (
                    <div className="bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30">
                      <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                        <Battery className="w-4 h-4" />
                        Battery Included
                      </div>
                      <div className="text-sm">{config.batteryCapacity} kWh storage capacity</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/contact">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Get Free Quote
                    </button>
                  </Link>
                  <Link href="/projects">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-colors border border-white/30">
                      View Projects
                    </button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-xs text-blue-100 space-y-2">
                    <p>✓ Free consultation included</p>
                    <p>✓ 25-year panel warranty</p>
                    <p>✓ Professional installation</p>
                    <p>✓ Real-time monitoring</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Go Solar?
            </h2>
            <p className="text-gray-600 mb-6">
              These are estimated figures based on average conditions. Get in touch for a personalized assessment and accurate quote tailored to your specific property and needs.
            </p>
            <Link href="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
