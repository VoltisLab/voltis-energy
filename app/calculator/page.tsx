'use client';
import { motion } from 'framer-motion';
import { Calculator, Home, Building2, Sun, Zap, Battery, ArrowRight, Check, Info } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [systemType, setSystemType] = useState<'residential' | 'commercial' | null>(null);
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
    panelBrand: 'tier1',
    inverterType: 'string',
    
    // Battery Storage
    includeBattery: false,
    batteryCapacity: 10,
    
    // Budget & Goals
    budget: 10000,
    primaryGoal: 'cost-savings',
    installationTimeline: '1-3months',
  });

  const handleChange = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  // Calculations
  const calculateSystemSize = () => {
    const baseSize = (config.monthlyBill * 12 / 1200) * 10;
    const shadingMultiplier = config.shadingLevel === 'none' ? 1 : config.shadingLevel === 'partial' ? 1.2 : 1.5;
    return Math.ceil(baseSize * shadingMultiplier * 10) / 10;
  };

  const calculatePanelCount = () => {
    const systemSize = calculateSystemSize();
    const panelWattage = config.panelType === 'monocrystalline' ? 400 : 350;
    return Math.ceil((systemSize * 1000) / panelWattage);
  };

  const calculateInverterSize = () => {
    const systemSize = calculateSystemSize();
    return Math.ceil(systemSize * 1.2 * 10) / 10; // 20% oversizing
  };

  const calculateSystemCost = () => {
    const systemSize = calculateSystemSize();
    const panelCount = calculatePanelCount();
    
    // Panel costs
    const panelCostPerWatt = config.panelBrand === 'premium' ? 0.65 : config.panelBrand === 'tier1' ? 0.55 : 0.45;
    const panelCost = systemSize * 1000 * panelCostPerWatt;
    
    // Inverter costs
    const inverterCostMap = {
      'string': systemSize * 200,
      'microinverter': panelCount * 150,
      'hybrid': systemSize * 300,
    };
    const inverterCost = inverterCostMap[config.inverterType as keyof typeof inverterCostMap];
    
    // Installation
    const installationCost = systemSize * 300;
    
    // Battery (if included)
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

  const panelTypes = [
    {
      id: 'monocrystalline',
      name: 'Monocrystalline',
      efficiency: '20-22%',
      lifespan: '25-30 years',
      cost: '£££',
      description: 'Highest efficiency, best for limited space',
    },
    {
      id: 'polycrystalline',
      name: 'Polycrystalline',
      efficiency: '15-17%',
      lifespan: '25 years',
      cost: '££',
      description: 'Good value, suitable for larger roofs',
    },
    {
      id: 'thin-film',
      name: 'Thin-Film',
      efficiency: '10-12%',
      lifespan: '20-25 years',
      cost: '£',
      description: 'Flexible, good for curved surfaces',
    },
  ];

  const inverterTypes = [
    {
      id: 'string',
      name: 'String Inverter',
      efficiency: '97-98%',
      cost: '££',
      description: 'Single inverter for entire system, most economical',
      pros: ['Lower upfront cost', 'Proven technology', 'Easy maintenance'],
      cons: ['System-wide MPPT', 'Shading affects all panels'],
    },
    {
      id: 'microinverter',
      name: 'Microinverters',
      efficiency: '96-97%',
      cost: '£££',
      description: 'Individual inverter per panel, maximum flexibility',
      pros: ['Panel-level optimization', 'Better shading tolerance', 'Easy expansion'],
      cons: ['Higher upfront cost', 'More components'],
    },
    {
      id: 'hybrid',
      name: 'Hybrid Inverter',
      efficiency: '97-98%',
      cost: '£££',
      description: 'Battery-ready inverter for future storage',
      pros: ['Battery compatible', 'Backup power ready', 'Future-proof'],
      cons: ['Higher cost', 'May need battery upgrade'],
    },
  ];

  const batteryOptions = [
    { capacity: 5, name: '5 kWh - Small', backup: '4-6 hours', cost: 4250 },
    { capacity: 10, name: '10 kWh - Medium', backup: '8-12 hours', cost: 8500 },
    { capacity: 13.5, name: '13.5 kWh - Large (Powerwall)', backup: '12-18 hours', cost: 11475 },
    { capacity: 20, name: '20 kWh - Extra Large', backup: '24+ hours', cost: 17000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6">
              <Calculator className="w-10 h-10 text-blue-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solar System Builder
            </h1>
            <p className="text-xl text-blue-100">
              Design your perfect solar system - Configure everything from panels to inverters to batteries
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Property Type Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What type of property is this for?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setSystemType('residential');
                  handleChange('propertyType', 'residential');
                  setStep(2);
                }}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Home className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Residential</h3>
                  <p className="text-gray-600 mb-4">
                    Home solar systems for houses, apartments, and residential properties
                  </p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div>• 3-10 kW typical size</div>
                    <div>• £5,000 - £15,000 range</div>
                    <div>• Roof-mounted systems</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSystemType('commercial');
                  handleChange('propertyType', 'commercial');
                  setStep(2);
                }}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Commercial</h3>
                  <p className="text-gray-600 mb-4">
                    Business solar systems for offices, warehouses, and commercial buildings
                  </p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div>• 10kW - 1MW+ size</div>
                    <div>• £15,000+ investment</div>
                    <div>• Roof or ground-mounted</div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Property & Energy Details</h2>
              <p className="text-gray-600">Tell us about your property and current energy usage</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-8">
              {/* Monthly Bill */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <span className="mr-2">💷</span> Average Monthly Electricity Bill
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={config.monthlyBill}
                    onChange={(e) => handleChange('monthlyBill', Number(e.target.value))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-32 bg-blue-50 rounded-lg p-4 text-center">
                    <span className="text-3xl font-bold text-blue-600">£{config.monthlyBill}</span>
                  </div>
                </div>
              </div>

              {/* Roof Size */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Sun className="w-5 h-5 mr-2 text-blue-600" />
                  Available Roof Space (m²)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={config.roofSize}
                    onChange={(e) => handleChange('roofSize', Number(e.target.value))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-32 bg-blue-50 rounded-lg p-4 text-center">
                    <span className="text-3xl font-bold text-blue-600">{config.roofSize}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Average panel needs ~2m² • Typical home roof: 40-100m²
                </p>
              </div>

              {/* Roof Orientation */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Roof Orientation
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['south', 'east', 'west', 'north'].map((dir) => (
                    <button
                      key={dir}
                      onClick={() => handleChange('roofOrientation', dir)}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        config.roofOrientation === dir
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {dir.charAt(0).toUpperCase() + dir.slice(1)}
                      {dir === 'south' && ' ⭐'}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  South-facing is optimal • East/West are good • North produces 50-60% less
                </p>
              </div>

              {/* Shading Level */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Shading Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'none', label: 'No Shade', emoji: '☀️' },
                    { id: 'partial', label: 'Partial Shade', emoji: '⛅' },
                    { id: 'heavy', label: 'Heavy Shade', emoji: '🌳' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleChange('shadingLevel', option.id)}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        config.shadingLevel === option.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.emoji}</div>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Peak Usage Time */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  When do you use most energy?
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'morning', label: 'Morning (6am-12pm)' },
                    { id: 'afternoon', label: 'Afternoon (12pm-6pm)' },
                    { id: 'evening', label: 'Evening (6pm-12am)' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleChange('peakUsageTime', option.id)}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        config.peakUsageTime === option.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This helps determine if battery storage would benefit you
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
                >
                  Continue to Panel Selection
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Panel Selection */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Solar Panels</h2>
              <p className="text-gray-600">Select the panel type that best fits your needs and budget</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {panelTypes.map((panel) => (
                <button
                  key={panel.id}
                  onClick={() => handleChange('panelType', panel.id)}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all text-left ${
                    config.panelType === panel.id
                      ? 'border-blue-600 ring-4 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{panel.name}</h3>
                    {config.panelType === panel.id && (
                      <Check className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{panel.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-semibold">{panel.efficiency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifespan:</span>
                      <span className="font-semibold">{panel.lifespan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-semibold">{panel.cost}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Panel Brand Quality */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Panel Brand Quality
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'budget', label: 'Budget', desc: 'Good quality, lower cost' },
                  { id: 'tier1', label: 'Tier 1', desc: 'Proven brands, best value' },
                  { id: 'premium', label: 'Premium', desc: 'Top performance, highest cost' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleChange('panelBrand', option.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.panelBrand === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
              >
                Continue to Inverter Selection
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Inverter Selection */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Inverter Type</h2>
              <p className="text-gray-600">The inverter converts DC power from panels to AC power for your home</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {inverterTypes.map((inverter) => (
                <button
                  key={inverter.id}
                  onClick={() => handleChange('inverterType', inverter.id)}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all text-left ${
                    config.inverterType === inverter.id
                      ? 'border-blue-600 ring-4 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{inverter.name}</h3>
                      <p className="text-sm text-gray-600">{inverter.cost}</p>
                    </div>
                    {config.inverterType === inverter.id && (
                      <Check className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{inverter.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Efficiency: {inverter.efficiency}</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-green-600 mb-1">Pros:</div>
                      {inverter.pros.map((pro, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          {pro}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-orange-600 mb-1">Cons:</div>
                      {inverter.cons.map((con, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-orange-500 mr-1">−</span>
                          {con}
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
              >
                Continue to Battery Storage
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Battery Storage */}
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Battery Storage? (Optional)</h2>
              <p className="text-gray-600">Store excess solar energy for use at night or during power outages</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Why Add Battery Storage?</h3>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Use solar energy at night when panels aren't producing</li>
                    <li>• Backup power during grid outages</li>
                    <li>• Maximize self-consumption and reduce grid reliance</li>
                    <li>• Time-of-use rate optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <button
                onClick={() => handleChange('includeBattery', !config.includeBattery)}
                className={`w-full p-6 rounded-2xl border-2 transition-all ${
                  config.includeBattery
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Battery className={`w-8 h-8 ${config.includeBattery ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className="font-bold text-lg">
                        {config.includeBattery ? 'Battery Storage Included' : 'Add Battery Storage'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {config.includeBattery ? 'Click to remove' : 'Click to add'}
                      </div>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    config.includeBattery ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
              </button>
            </div>

            {config.includeBattery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Select Battery Capacity</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {batteryOptions.map((battery) => (
                      <button
                        key={battery.capacity}
                        onClick={() => handleChange('batteryCapacity', battery.capacity)}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          config.batteryCapacity === battery.capacity
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">{battery.name}</h4>
                          {config.batteryCapacity === battery.capacity && (
                            <Check className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Backup Duration:</span>
                            <span className="font-semibold">{battery.backup}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Additional Cost:</span>
                            <span className="font-semibold text-green-600">+£{battery.cost.toLocaleString()}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
              >
                View Your System Summary
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 6: Summary & Results */}
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Your Custom Solar System</h2>
              <p className="text-xl text-gray-600">Here's your complete system configuration and estimated costs</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* System Configuration */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Sun className="w-6 h-6 mr-2 text-blue-600" />
                    System Configuration
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">System Size</div>
                      <div className="text-3xl font-bold text-blue-600">{calculateSystemSize()} kW</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Solar Panels</div>
                        <div className="text-xl font-bold">{calculatePanelCount()} panels</div>
                        <div className="text-xs text-gray-500 capitalize">{config.panelType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Inverter</div>
                        <div className="text-xl font-bold">{calculateInverterSize()} kW</div>
                        <div className="text-xs text-gray-500 capitalize">{config.inverterType}</div>
                      </div>
                    </div>

                    {config.includeBattery && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Battery Storage</div>
                        <div className="text-xl font-bold text-green-600">{config.batteryCapacity} kWh</div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Roof Details</div>
                      <div className="space-y-1 text-sm">
                        <div>• {config.roofSize}m² available space</div>
                        <div>• {config.roofOrientation.charAt(0).toUpperCase() + config.roofOrientation.slice(1)}-facing</div>
                        <div className="capitalize">• {config.shadingLevel === 'none' ? 'No' : config.shadingLevel} shading</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Impact</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">CO₂ Offset per Year</div>
                      <div className="text-3xl font-bold text-green-600">{(calculateSystemSize() * 1.2).toFixed(1)} tons</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Equivalent to planting {Math.round(calculateSystemSize() * 60)} trees per year
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Financial Summary</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-blue-200 text-sm mb-1">Total System Cost</div>
                      <div className="text-4xl font-bold">£{calculateSystemCost().toLocaleString()}</div>
                      <div className="text-sm text-blue-200 mt-1">Before incentives and rebates</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
                      <div>
                        <div className="text-blue-200 text-sm mb-1">Annual Savings</div>
                        <div className="text-2xl font-bold text-yellow-400">£{calculateAnnualSavings().toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-blue-200 text-sm mb-1">Payback Period</div>
                        <div className="text-2xl font-bold text-yellow-400">{calculatePaybackPeriod()} years</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-blue-400">
                      <div className="text-blue-200 text-sm mb-1">25-Year Savings</div>
                      <div className="text-3xl font-bold text-yellow-400">
                        £{(calculateAnnualSavings() * 25).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</div>
                      <div className="text-gray-700">Free site survey and detailed quote</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</div>
                      <div className="text-gray-700">Review financing options and incentives</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</div>
                      <div className="text-gray-700">Professional installation (1-3 days)</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</div>
                      <div className="text-gray-700">Start saving and earning with solar!</div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-lg font-semibold text-lg transition-all">
                      Get Your Free Quote
                    </button>
                  </Link>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Start Over
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      {step < 6 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full ${
                  s === step ? 'bg-blue-600' : s < step ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
