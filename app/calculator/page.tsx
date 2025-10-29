'use client';
import { motion } from 'framer-motion';
import { Calculator, Home, Building2, Sun, Zap, Battery, TrendingDown, Clock, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import Link from 'next/link';

interface Appliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
}

export default function CalculatorPage() {
  const { currencySymbol } = useLocation();
  const [config, setConfig] = useState({
    systemType: 'residential',
    gridType: 'hybrid',
    peakUsageTime: 'evening',
    outputVoltage: 220,
  });

  // Appliances Cart
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState('');
  
  // Panel Configuration
  const [panelConfig, setPanelConfig] = useState({
    brand: 'ja-solar',
    wattage: 550,
    quantity: 10,
  });

  // Battery Configuration
  const [batteryConfig, setBatteryConfig] = useState({
    type: 'lithium',
    voltage: 48,
    capacity: 200, // Ah
    quantity: 4,
  });

  // Inverter Configuration
  const [inverterConfig, setInverterConfig] = useState({
    type: 'hybrid',
    includeChargeController: true,
    includeMPPT: true,
  });

  const commonAppliances = [
    { name: 'Air Conditioner (1.5HP)', watts: 1500 },
    { name: 'Air Conditioner (2HP)', watts: 2000 },
    { name: 'Refrigerator', watts: 200 },
    { name: 'Freezer', watts: 300 },
    { name: 'LED TV (43")', watts: 60 },
    { name: 'LED TV (55")', watts: 100 },
    { name: 'Ceiling Fan', watts: 75 },
    { name: 'Standing Fan', watts: 60 },
    { name: 'LED Light Bulb', watts: 10 },
    { name: 'Laptop', watts: 65 },
    { name: 'Desktop Computer', watts: 250 },
    { name: 'Microwave', watts: 1200 },
    { name: 'Electric Kettle', watts: 2000 },
    { name: 'Washing Machine', watts: 500 },
    { name: 'Iron', watts: 1500 },
    { name: 'Water Pump', watts: 750 },
    { name: 'Security System', watts: 50 },
    { name: 'CCTV Camera (per unit)', watts: 10 },
    { name: 'Wi-Fi Router', watts: 20 },
    { name: 'Phone Charger', watts: 10 },
  ];

  const solarPanelBrands = [
    { id: 'ja-solar', name: 'JA Solar (Imported)', wattages: [450, 550, 590] },
    { id: 'longi', name: 'LONGi Solar (Imported)', wattages: [450, 530, 585] },
    { id: 'jinko', name: 'Jinko Solar (Imported)', wattages: [440, 550, 595] },
    { id: 'trina', name: 'Trina Solar (Imported)', wattages: [445, 550, 600] },
    { id: 'canadian', name: 'Canadian Solar (Imported)', wattages: [450, 540, 665] },
    { id: 'risen', name: 'Risen Energy (Imported)', wattages: [450, 550, 580] },
    { id: 'sunpower', name: 'SunPower (Premium Imported)', wattages: [400, 415, 435] },
    { id: 'lpvt', name: 'LPVT Solar (Imported)', wattages: [450, 545, 590] },
  ];

  const batteryTypes = [
    { id: 'lithium', name: 'Lithium-Ion (LiFePO4)', pricePerAh: 150, lifespan: '10-15 years', efficiency: 0.95 },
    { id: 'tubular', name: 'Tubular (Lead-Acid)', pricePerAh: 60, lifespan: '5-7 years', efficiency: 0.80 },
    { id: 'gel', name: 'Gel Battery', pricePerAh: 80, lifespan: '7-10 years', efficiency: 0.85 },
    { id: 'agm', name: 'AGM Battery', pricePerAh: 90, lifespan: '6-8 years', efficiency: 0.85 },
  ];

  const inverterTypes = [
    { id: 'hybrid', name: 'Hybrid Inverter (Grid + Solar + Battery)', pricePerKW: 400 },
    { id: 'off-grid', name: 'Off-Grid Inverter (Solar + Battery Only)', pricePerKW: 350 },
    { id: 'grid-tie', name: 'Grid-Tie Inverter (Solar + Grid)', pricePerKW: 300 },
  ];

  // Add appliance to cart
  const addAppliance = () => {
    if (!selectedAppliance) return;
    const appliance = commonAppliances.find(a => a.name === selectedAppliance);
    if (!appliance) return;

    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: appliance.name,
      watts: appliance.watts,
      quantity: 1,
      hoursPerDay: 8,
    };
    setAppliances([...appliances, newAppliance]);
    setSelectedAppliance('');
  };

  const updateAppliance = (id: string, field: keyof Appliance, value: any) => {
    setAppliances(appliances.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  // Calculations
  const calculateTotalDailyConsumption = () => {
    return appliances.reduce((total, app) => {
      return total + (app.watts * app.quantity * app.hoursPerDay);
    }, 0) / 1000; // Convert to kWh
  };

  const calculatePeakLoad = () => {
    return appliances.reduce((total, app) => {
      return total + (app.watts * app.quantity);
    }, 0) / 1000; // Convert to kW
  };

  const calculateRequiredKVA = () => {
    const peakLoad = calculatePeakLoad();
    return Math.ceil(peakLoad * 1.3 * 10) / 10; // 30% safety margin
  };

  const getOperatingVoltage = () => {
    const kva = calculateRequiredKVA();
    if (kva <= 2.5) return 24;
    return 48;
  };

  const calculateTotalPanelPower = () => {
    return (panelConfig.wattage * panelConfig.quantity) / 1000; // kW
  };

  const calculateTotalBatteryCapacity = () => {
    return (batteryConfig.capacity * batteryConfig.voltage * batteryConfig.quantity) / 1000; // kWh
  };

  const calculateSystemCost = () => {
    // Panel cost
    const panelPricePerWatt = 0.40; // Average price per watt
    const panelCost = panelConfig.wattage * panelConfig.quantity * panelPricePerWatt;

    // Battery cost
    const selectedBattery = batteryTypes.find(b => b.id === batteryConfig.type);
    const batteryCost = batteryConfig.capacity * batteryConfig.quantity * (selectedBattery?.pricePerAh || 100);

    // Inverter cost
    const kva = calculateRequiredKVA();
    const selectedInverter = inverterTypes.find(i => i.id === inverterConfig.type);
    const inverterCost = kva * (selectedInverter?.pricePerKW || 350);

    // Accessories
    let accessoriesCost = 0;
    if (inverterConfig.includeChargeController) accessoriesCost += 150;
    if (inverterConfig.includeMPPT) accessoriesCost += 250;

    // Installation (15% of hardware)
    const hardwareCost = panelCost + batteryCost + inverterCost + accessoriesCost;
    const installationCost = hardwareCost * 0.15;

    // Cables, mounting, etc (10% of hardware)
    const miscCost = hardwareCost * 0.10;

    return Math.round(hardwareCost + installationCost + miscCost);
  };

  const calculateAnnualSavings = () => {
    const dailyKWh = calculateTotalDailyConsumption();
    const annualKWh = dailyKWh * 365;
    const pricePerKWh = config.gridType === 'off-grid' ? 80 : 65; // Naira per kWh
    return Math.round(annualKWh * pricePerKWh);
  };

  const calculatePaybackPeriod = () => {
    const totalCost = calculateSystemCost();
    const annualSavings = calculateAnnualSavings();
    if (annualSavings === 0) return 0;
    return (totalCost / annualSavings).toFixed(1);
  };

  // Auto-calculate recommended operating voltage
  useEffect(() => {
    const recommendedVoltage = getOperatingVoltage();
    setBatteryConfig(prev => ({ ...prev, voltage: recommendedVoltage }));
  }, [appliances]);

  const totalCost = calculateSystemCost();
  const dailyConsumption = calculateTotalDailyConsumption();
  const peakLoad = calculatePeakLoad();
  const requiredKVA = calculateRequiredKVA();
  const annualSavings = calculateAnnualSavings();
  const paybackPeriod = calculatePaybackPeriod();
  const totalPanelPower = calculateTotalPanelPower();
  const totalBatteryCapacity = calculateTotalBatteryCapacity();
  const operatingVoltage = getOperatingVoltage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-8">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4">
              <Calculator className="w-8 h-8 text-blue-900" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Custom Solar System Builder
            </h1>
            <p className="text-base md:text-lg text-blue-100">
              Build your perfect solar system by selecting your appliances and preferences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration Form */}
            <div className="lg:col-span-2 space-y-4">
              {/* System Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">System Setup</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={config.systemType}
                      onChange={(e) => setConfig({ ...config, systemType: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grid Type
                    </label>
                    <select
                      value={config.gridType}
                      onChange={(e) => setConfig({ ...config, gridType: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hybrid">Hybrid (Grid + Solar)</option>
                      <option value="off-grid">Off-Grid (Solar Only)</option>
                      <option value="grid-tie">Grid-Tie (Solar + Grid)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peak Usage Time
                    </label>
                    <select
                      value={config.peakUsageTime}
                      onChange={(e) => setConfig({ ...config, peakUsageTime: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="morning">Morning (6am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-6pm)</option>
                      <option value="evening">Evening (6pm-12am)</option>
                      <option value="night">Night (12am-6am)</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Appliances Cart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Your Appliances</h2>
                </div>

                {/* Add Appliance */}
                <div className="flex gap-2 mb-4">
                  <select
                    value={selectedAppliance}
                    onChange={(e) => setSelectedAppliance(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an appliance...</option>
                    {commonAppliances.map((app, idx) => (
                      <option key={idx} value={app.name}>
                        {app.name} ({app.watts}W)
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addAppliance}
                    disabled={!selectedAppliance}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Appliances List */}
                {appliances.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No appliances added yet. Add appliances to calculate your power needs.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {appliances.map((app) => (
                      <div key={app.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">{app.name}</div>
                            <div className="text-xs text-gray-500">{app.watts}W per unit</div>
                          </div>
                          <button
                            onClick={() => removeAppliance(app.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Quantity</label>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateAppliance(app.id, 'quantity', Math.max(1, app.quantity - 1))}
                                className="w-7 h-7 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">{app.quantity}</span>
                              <button
                                onClick={() => updateAppliance(app.id, 'quantity', app.quantity + 1)}
                                className="w-7 h-7 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Hours/Day</label>
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hoursPerDay}
                              onChange={(e) => updateAppliance(app.id, 'hoursPerDay', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          Daily: {((app.watts * app.quantity * app.hoursPerDay) / 1000).toFixed(2)} kWh
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Solar Panels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Solar Panels</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Panel Brand
                    </label>
                    <select
                      value={panelConfig.brand}
                      onChange={(e) => {
                        const brand = solarPanelBrands.find(b => b.id === e.target.value);
                        setPanelConfig({ ...panelConfig, brand: e.target.value, wattage: brand?.wattages[0] || 550 });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {solarPanelBrands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Panel Wattage
                    </label>
                    <select
                      value={panelConfig.wattage}
                      onChange={(e) => setPanelConfig({ ...panelConfig, wattage: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {solarPanelBrands.find(b => b.id === panelConfig.brand)?.wattages.map((w) => (
                        <option key={w} value={w}>{w}W</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Panels
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={panelConfig.quantity}
                      onChange={(e) => setPanelConfig({ ...panelConfig, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  Total Panel Power: <span className="font-semibold">{totalPanelPower.toFixed(2)} kW</span>
                </div>
              </motion.div>

              {/* Battery Storage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Battery Storage</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Type
                    </label>
                    <select
                      value={batteryConfig.type}
                      onChange={(e) => setBatteryConfig({ ...batteryConfig, type: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {batteryTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-gray-500 mt-1">
                      Lifespan: {batteryTypes.find(b => b.id === batteryConfig.type)?.lifespan}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Voltage
                    </label>
                    <select
                      value={batteryConfig.voltage}
                      onChange={(e) => setBatteryConfig({ ...batteryConfig, voltage: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={12}>12V (1-1.5 KVA)</option>
                      <option value={24}>24V (1.5-2.5 KVA)</option>
                      <option value={48}>48V (2.5+ KVA)</option>
                    </select>
                    <div className="text-xs text-green-600 mt-1">
                      Recommended: {operatingVoltage}V (for {requiredKVA} KVA)
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity per Battery (Ah)
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="400"
                      step="50"
                      value={batteryConfig.capacity}
                      onChange={(e) => setBatteryConfig({ ...batteryConfig, capacity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Batteries
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={batteryConfig.quantity}
                      onChange={(e) => setBatteryConfig({ ...batteryConfig, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                  Total Storage: <span className="font-semibold">{totalBatteryCapacity.toFixed(2)} kWh</span>
                </div>
              </motion.div>

              {/* Inverter & Accessories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Inverter & Controls</h2>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inverter Type
                    </label>
                    <select
                      value={inverterConfig.type}
                      onChange={(e) => setInverterConfig({ ...inverterConfig, type: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {inverterTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={inverterConfig.includeChargeController}
                        onChange={(e) => setInverterConfig({ ...inverterConfig, includeChargeController: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Charge Controller</span>
                        <div className="text-xs text-gray-500">PWM controller included</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={inverterConfig.includeMPPT}
                        onChange={(e) => setInverterConfig({ ...inverterConfig, includeMPPT: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">MPPT Upgrade</span>
                        <div className="text-xs text-gray-500">Maximum power tracking</div>
                      </div>
                    </label>
                  </div>

                  <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded mt-2">
                    <div className="font-semibold mb-1">Output Voltage: {config.outputVoltage}V AC</div>
                    <div>Standard for Nigeria (matches grid voltage)</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Results Summary - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white sticky top-20"
              >
                <h2 className="text-xl font-bold mb-4">System Summary</h2>
                
                <div className="space-y-3">
                  {/* Power Requirements */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-blue-100 mb-1">Your Power Needs</div>
                    <div className="text-2xl font-bold">{requiredKVA} KVA</div>
                    <div className="text-xs text-blue-200 mt-1">
                      Peak Load: {peakLoad.toFixed(2)} kW<br/>
                      Daily: {dailyConsumption.toFixed(2)} kWh
                    </div>
                  </div>

                  {/* System Size */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-blue-100 mb-1">Solar System</div>
                    <div className="text-2xl font-bold">{totalPanelPower.toFixed(2)} kW</div>
                    <div className="text-xs text-blue-200 mt-1">
                      {panelConfig.quantity} × {panelConfig.wattage}W panels
                    </div>
                  </div>

                  {/* Battery Storage */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-blue-100 mb-1">Battery Storage</div>
                    <div className="text-2xl font-bold">{totalBatteryCapacity.toFixed(2)} kWh</div>
                    <div className="text-xs text-blue-200 mt-1">
                      {batteryConfig.quantity} × {batteryConfig.capacity}Ah @ {batteryConfig.voltage}V
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-blue-100 mb-1">Total Investment</div>
                    <div className="text-2xl font-bold">{currencySymbol}{totalCost.toLocaleString()}</div>
                    <div className="text-xs text-blue-200 mt-1">All-inclusive package</div>
                  </div>

                  {/* Annual Savings */}
                  {appliances.length > 0 && (
                    <>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-blue-100 mb-1">
                          <TrendingDown className="w-3 h-3" />
                          Annual Savings
                        </div>
                        <div className="text-2xl font-bold text-green-300">{currencySymbol}{annualSavings.toLocaleString()}</div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-blue-100 mb-1">
                          <Clock className="w-3 h-3" />
                          Payback Period
                        </div>
                        <div className="text-2xl font-bold text-yellow-300">{paybackPeriod} years</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <Link href="/contact">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm">
                      Get Free Quote
                    </button>
                  </Link>
                  <Link href="/projects">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-semibold transition-colors border border-white/30 text-sm">
                      View Projects
                    </button>
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs text-blue-100 space-y-1">
                    <p>✓ Free site assessment</p>
                    <p>✓ Professional installation</p>
                    <p>✓ 25-year panel warranty</p>
                    <p>✓ 2-year installation warranty</p>
                    <p>✓ Real-time monitoring system</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Ready to Power Your {config.systemType === 'residential' ? 'Home' : 'Business'}?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              All our solar panels are imported from leading international manufacturers. Get a personalized quote and professional installation with warranty coverage.
            </p>
            <Link href="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm">
                Schedule Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
