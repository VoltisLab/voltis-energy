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
  const [applianceSearch, setApplianceSearch] = useState('');
  
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
    // Air Conditioning & Climate Control
    { name: 'Window AC (0.75HP)', watts: 900, category: 'Cooling' },
    { name: 'Window AC (1HP)', watts: 1200, category: 'Cooling' },
    { name: 'Split AC (1HP)', watts: 1200, category: 'Cooling' },
    { name: 'Split AC (1.5HP)', watts: 1500, category: 'Cooling' },
    { name: 'Split AC (2HP)', watts: 2000, category: 'Cooling' },
    { name: 'Split AC (2.5HP)', watts: 2500, category: 'Cooling' },
    { name: 'Split AC (3HP)', watts: 3000, category: 'Cooling' },
    { name: 'Central AC (5HP)', watts: 5000, category: 'Cooling' },
    { name: 'Portable AC Unit', watts: 1400, category: 'Cooling' },
    { name: 'Air Cooler/Swamp Cooler', watts: 200, category: 'Cooling' },
    { name: 'Dehumidifier', watts: 300, category: 'Cooling' },
    { name: 'Space Heater (Small)', watts: 1000, category: 'Heating' },
    { name: 'Space Heater (Large)', watts: 1500, category: 'Heating' },
    
    // Refrigeration
    { name: 'Mini Fridge', watts: 100, category: 'Refrigeration' },
    { name: 'Refrigerator (Small)', watts: 150, category: 'Refrigeration' },
    { name: 'Refrigerator (Medium)', watts: 200, category: 'Refrigeration' },
    { name: 'Refrigerator (Large)', watts: 300, category: 'Refrigeration' },
    { name: 'Double Door Refrigerator', watts: 400, category: 'Refrigeration' },
    { name: 'Side-by-Side Refrigerator', watts: 500, category: 'Refrigeration' },
    { name: 'Chest Freezer (Small)', watts: 200, category: 'Refrigeration' },
    { name: 'Chest Freezer (Large)', watts: 300, category: 'Refrigeration' },
    { name: 'Deep Freezer', watts: 400, category: 'Refrigeration' },
    { name: 'Upright Freezer', watts: 350, category: 'Refrigeration' },
    { name: 'Wine Cooler', watts: 100, category: 'Refrigeration' },
    { name: 'Commercial Display Fridge', watts: 600, category: 'Refrigeration' },
    
    // Entertainment
    { name: 'LED TV (24")', watts: 30, category: 'Entertainment' },
    { name: 'LED TV (32")', watts: 45, category: 'Entertainment' },
    { name: 'LED TV (43")', watts: 60, category: 'Entertainment' },
    { name: 'LED TV (50")', watts: 80, category: 'Entertainment' },
    { name: 'LED TV (55")', watts: 100, category: 'Entertainment' },
    { name: 'LED TV (65")', watts: 120, category: 'Entertainment' },
    { name: 'LED TV (75")', watts: 150, category: 'Entertainment' },
    { name: 'Plasma TV (50")', watts: 300, category: 'Entertainment' },
    { name: 'Projector (Home)', watts: 250, category: 'Entertainment' },
    { name: 'Projector (Commercial)', watts: 400, category: 'Entertainment' },
    { name: 'Sound System (Home Theater)', watts: 300, category: 'Entertainment' },
    { name: 'Soundbar', watts: 80, category: 'Entertainment' },
    { name: 'Gaming Console (PS5/Xbox)', watts: 200, category: 'Entertainment' },
    { name: 'DVD/Blu-ray Player', watts: 30, category: 'Entertainment' },
    { name: 'Cable/Satellite Box', watts: 30, category: 'Entertainment' },
    { name: 'Stereo System', watts: 100, category: 'Entertainment' },
    
    // Fans & Ventilation
    { name: 'Ceiling Fan (Small)', watts: 60, category: 'Fans' },
    { name: 'Ceiling Fan (Medium)', watts: 75, category: 'Fans' },
    { name: 'Ceiling Fan (Large)', watts: 90, category: 'Fans' },
    { name: 'Standing Fan (12")', watts: 50, category: 'Fans' },
    { name: 'Standing Fan (16")', watts: 60, category: 'Fans' },
    { name: 'Standing Fan (18")', watts: 75, category: 'Fans' },
    { name: 'Table Fan', watts: 40, category: 'Fans' },
    { name: 'Wall Fan', watts: 70, category: 'Fans' },
    { name: 'Exhaust Fan (Kitchen)', watts: 150, category: 'Fans' },
    { name: 'Exhaust Fan (Bathroom)', watts: 50, category: 'Fans' },
    { name: 'Industrial Fan', watts: 200, category: 'Fans' },
    { name: 'Box Fan', watts: 100, category: 'Fans' },
    
    // Lighting
    { name: 'LED Bulb (5W)', watts: 5, category: 'Lighting' },
    { name: 'LED Bulb (7W)', watts: 7, category: 'Lighting' },
    { name: 'LED Bulb (10W)', watts: 10, category: 'Lighting' },
    { name: 'LED Bulb (15W)', watts: 15, category: 'Lighting' },
    { name: 'LED Bulb (20W)', watts: 20, category: 'Lighting' },
    { name: 'CFL Bulb (15W)', watts: 15, category: 'Lighting' },
    { name: 'CFL Bulb (23W)', watts: 23, category: 'Lighting' },
    { name: 'Incandescent Bulb (60W)', watts: 60, category: 'Lighting' },
    { name: 'Incandescent Bulb (100W)', watts: 100, category: 'Lighting' },
    { name: 'LED Tube Light (18W)', watts: 18, category: 'Lighting' },
    { name: 'LED Tube Light (36W)', watts: 36, category: 'Lighting' },
    { name: 'Fluorescent Tube (40W)', watts: 40, category: 'Lighting' },
    { name: 'Outdoor Security Light', watts: 30, category: 'Lighting' },
    { name: 'LED Strip Lights (per meter)', watts: 10, category: 'Lighting' },
    { name: 'Chandelier (LED)', watts: 100, category: 'Lighting' },
    { name: 'Chandelier (Traditional)', watts: 300, category: 'Lighting' },
    
    // Computing & Office
    { name: 'Laptop (Standard)', watts: 65, category: 'Computing' },
    { name: 'Laptop (Gaming)', watts: 180, category: 'Computing' },
    { name: 'Desktop Computer (Basic)', watts: 150, category: 'Computing' },
    { name: 'Desktop Computer (Standard)', watts: 250, category: 'Computing' },
    { name: 'Desktop Computer (Gaming)', watts: 450, category: 'Computing' },
    { name: 'iMac/All-in-One PC', watts: 200, category: 'Computing' },
    { name: 'Computer Monitor (19")', watts: 30, category: 'Computing' },
    { name: 'Computer Monitor (24")', watts: 40, category: 'Computing' },
    { name: 'Computer Monitor (27")', watts: 60, category: 'Computing' },
    { name: 'Printer (Inkjet)', watts: 50, category: 'Computing' },
    { name: 'Printer (Laser)', watts: 600, category: 'Computing' },
    { name: 'Scanner', watts: 30, category: 'Computing' },
    { name: 'Photocopier', watts: 1500, category: 'Computing' },
    { name: 'Tablet Charger', watts: 12, category: 'Computing' },
    { name: 'External Hard Drive', watts: 10, category: 'Computing' },
    
    // Kitchen Appliances
    { name: 'Microwave (Small)', watts: 800, category: 'Kitchen' },
    { name: 'Microwave (Medium)', watts: 1200, category: 'Kitchen' },
    { name: 'Microwave (Large)', watts: 1500, category: 'Kitchen' },
    { name: 'Electric Kettle (1.5L)', watts: 1500, category: 'Kitchen' },
    { name: 'Electric Kettle (1.8L)', watts: 2000, category: 'Kitchen' },
    { name: 'Toaster (2-Slice)', watts: 800, category: 'Kitchen' },
    { name: 'Toaster (4-Slice)', watts: 1500, category: 'Kitchen' },
    { name: 'Blender', watts: 400, category: 'Kitchen' },
    { name: 'Food Processor', watts: 600, category: 'Kitchen' },
    { name: 'Coffee Maker', watts: 1000, category: 'Kitchen' },
    { name: 'Espresso Machine', watts: 1500, category: 'Kitchen' },
    { name: 'Rice Cooker (Small)', watts: 400, category: 'Kitchen' },
    { name: 'Rice Cooker (Large)', watts: 700, category: 'Kitchen' },
    { name: 'Slow Cooker', watts: 200, category: 'Kitchen' },
    { name: 'Pressure Cooker (Electric)', watts: 1000, category: 'Kitchen' },
    { name: 'Air Fryer', watts: 1500, category: 'Kitchen' },
    { name: 'Dishwasher', watts: 1800, category: 'Kitchen' },
    { name: 'Electric Stove (Single)', watts: 1500, category: 'Kitchen' },
    { name: 'Electric Stove (Double)', watts: 3000, category: 'Kitchen' },
    { name: 'Electric Oven', watts: 2400, category: 'Kitchen' },
    { name: 'Induction Cooker (Single)', watts: 2000, category: 'Kitchen' },
    { name: 'Induction Cooker (Double)', watts: 3500, category: 'Kitchen' },
    { name: 'Deep Fryer', watts: 1800, category: 'Kitchen' },
    { name: 'Sandwich Maker', watts: 800, category: 'Kitchen' },
    { name: 'Waffle Maker', watts: 1000, category: 'Kitchen' },
    { name: 'Juicer', watts: 500, category: 'Kitchen' },
    { name: 'Mixer/Hand Mixer', watts: 200, category: 'Kitchen' },
    { name: 'Garbage Disposal', watts: 500, category: 'Kitchen' },
    
    // Laundry
    { name: 'Washing Machine (Top Load)', watts: 500, category: 'Laundry' },
    { name: 'Washing Machine (Front Load)', watts: 600, category: 'Laundry' },
    { name: 'Washing Machine (Commercial)', watts: 1500, category: 'Laundry' },
    { name: 'Dryer (Electric)', watts: 3000, category: 'Laundry' },
    { name: 'Washer-Dryer Combo', watts: 2000, category: 'Laundry' },
    { name: 'Iron (Standard)', watts: 1200, category: 'Laundry' },
    { name: 'Iron (Steam)', watts: 1500, category: 'Laundry' },
    { name: 'Iron (Industrial)', watts: 2000, category: 'Laundry' },
    { name: 'Steamer (Clothes)', watts: 1500, category: 'Laundry' },
    
    // Water Systems
    { name: 'Water Pump (0.5HP)', watts: 450, category: 'Water' },
    { name: 'Water Pump (0.75HP)', watts: 600, category: 'Water' },
    { name: 'Water Pump (1HP)', watts: 750, category: 'Water' },
    { name: 'Water Pump (1.5HP)', watts: 1100, category: 'Water' },
    { name: 'Water Pump (2HP)', watts: 1500, category: 'Water' },
    { name: 'Submersible Pump', watts: 1000, category: 'Water' },
    { name: 'Pressure Pump', watts: 800, category: 'Water' },
    { name: 'Water Dispenser (Cold Only)', watts: 70, category: 'Water' },
    { name: 'Water Dispenser (Hot & Cold)', watts: 500, category: 'Water' },
    { name: 'Water Heater (Instant)', watts: 3000, category: 'Water' },
    { name: 'Water Heater (Tank - Small)', watts: 1500, category: 'Water' },
    { name: 'Water Heater (Tank - Large)', watts: 3000, category: 'Water' },
    { name: 'Aquarium Pump', watts: 50, category: 'Water' },
    { name: 'Pool Pump', watts: 2000, category: 'Water' },
    
    // Security & Communication
    { name: 'CCTV Camera (Analog)', watts: 5, category: 'Security' },
    { name: 'CCTV Camera (IP)', watts: 10, category: 'Security' },
    { name: 'CCTV Camera (PTZ)', watts: 40, category: 'Security' },
    { name: 'DVR/NVR (4 Channel)', watts: 30, category: 'Security' },
    { name: 'DVR/NVR (8 Channel)', watts: 50, category: 'Security' },
    { name: 'DVR/NVR (16 Channel)', watts: 80, category: 'Security' },
    { name: 'Security System Panel', watts: 30, category: 'Security' },
    { name: 'Motion Sensor', watts: 5, category: 'Security' },
    { name: 'Door Bell Camera', watts: 10, category: 'Security' },
    { name: 'Intercom System', watts: 20, category: 'Security' },
    { name: 'Electric Gate Motor', watts: 300, category: 'Security' },
    { name: 'Electric Door Lock', watts: 15, category: 'Security' },
    { name: 'Wi-Fi Router (Standard)', watts: 15, category: 'Communication' },
    { name: 'Wi-Fi Router (High-Power)', watts: 25, category: 'Communication' },
    { name: 'Network Switch (8-port)', watts: 10, category: 'Communication' },
    { name: 'Network Switch (24-port)', watts: 30, category: 'Communication' },
    { name: 'Modem', watts: 10, category: 'Communication' },
    { name: 'Cordless Phone Base', watts: 5, category: 'Communication' },
    
    // Personal Care
    { name: 'Hair Dryer', watts: 1500, category: 'Personal Care' },
    { name: 'Hair Straightener', watts: 200, category: 'Personal Care' },
    { name: 'Curling Iron', watts: 150, category: 'Personal Care' },
    { name: 'Electric Shaver', watts: 15, category: 'Personal Care' },
    { name: 'Electric Toothbrush Charger', watts: 5, category: 'Personal Care' },
    { name: 'Vacuum Cleaner (Upright)', watts: 1200, category: 'Personal Care' },
    { name: 'Vacuum Cleaner (Handheld)', watts: 500, category: 'Personal Care' },
    { name: 'Robot Vacuum', watts: 50, category: 'Personal Care' },
    { name: 'Sewing Machine', watts: 100, category: 'Personal Care' },
    
    // Charging & Mobile
    { name: 'Phone Charger (5W)', watts: 5, category: 'Charging' },
    { name: 'Phone Charger (Fast - 18W)', watts: 18, category: 'Charging' },
    { name: 'Phone Charger (Super Fast - 33W)', watts: 33, category: 'Charging' },
    { name: 'Wireless Charger', watts: 15, category: 'Charging' },
    { name: 'Power Bank Charger', watts: 10, category: 'Charging' },
    { name: 'Multi-Device Charging Station', watts: 60, category: 'Charging' },
    
    // Commercial Equipment
    { name: 'Electric Generator (Backup)', watts: 5000, category: 'Commercial' },
    { name: 'Welding Machine', watts: 5000, category: 'Commercial' },
    { name: 'Compressor (Small)', watts: 1500, category: 'Commercial' },
    { name: 'Compressor (Large)', watts: 3000, category: 'Commercial' },
    { name: 'Shop Vac', watts: 1400, category: 'Commercial' },
    { name: 'Power Tools (Drill)', watts: 800, category: 'Commercial' },
    { name: 'Power Tools (Saw)', watts: 1200, category: 'Commercial' },
    { name: 'Vending Machine', watts: 400, category: 'Commercial' },
    { name: 'POS Machine', watts: 20, category: 'Commercial' },
    { name: 'Cash Register', watts: 50, category: 'Commercial' },
    { name: 'Electric Shutter/Roll-up Door', watts: 500, category: 'Commercial' },
    
    // Medical Equipment
    { name: 'CPAP Machine', watts: 60, category: 'Medical' },
    { name: 'Oxygen Concentrator', watts: 350, category: 'Medical' },
    { name: 'Nebulizer', watts: 100, category: 'Medical' },
    { name: 'Electric Wheelchair Charger', watts: 200, category: 'Medical' },
    
    // Miscellaneous
    { name: 'Electric Fan Heater', watts: 2000, category: 'Miscellaneous' },
    { name: 'Humidifier', watts: 50, category: 'Miscellaneous' },
    { name: 'Air Purifier', watts: 80, category: 'Miscellaneous' },
    { name: 'Bug Zapper', watts: 20, category: 'Miscellaneous' },
    { name: 'Electric Blanket', watts: 200, category: 'Miscellaneous' },
    { name: 'Aquarium Heater', watts: 100, category: 'Miscellaneous' },
    { name: 'Electric Clock', watts: 2, category: 'Miscellaneous' },
    { name: 'Digital Photo Frame', watts: 10, category: 'Miscellaneous' },
    { name: 'Night Light', watts: 5, category: 'Miscellaneous' },
  ].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

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

  // Filter appliances based on search
  const filteredAppliances = commonAppliances.filter(app =>
    app.name.toLowerCase().includes(applianceSearch.toLowerCase()) ||
    app.category.toLowerCase().includes(applianceSearch.toLowerCase())
  );

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
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build Your Solar System
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Configure your perfect solar system by selecting your appliances and preferences
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">System Setup</h2>
                </div>
                
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Your Appliances</h2>
                </div>

                {/* Add Appliance */}
                <div className="space-y-2 mb-4">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search appliances (e.g., 'AC', 'fridge', 'laptop')..."
                    value={applianceSearch}
                    onChange={(e) => setApplianceSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Appliance Dropdown */}
                  <div className="flex gap-2">
                    <select
                      value={selectedAppliance}
                      onChange={(e) => setSelectedAppliance(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      size={applianceSearch ? Math.min(filteredAppliances.length + 1, 8) : 1}
                    >
                      <option value="">
                        {applianceSearch 
                          ? `${filteredAppliances.length} appliance${filteredAppliances.length !== 1 ? 's' : ''} found` 
                          : 'Select an appliance...'}
                      </option>
                      {filteredAppliances.map((app, idx) => (
                        <option key={idx} value={app.name}>
                          {app.name} ({app.watts}W) - {app.category}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addAppliance}
                      disabled={!selectedAppliance}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                  
                  {/* Results count */}
                  {applianceSearch && (
                    <div className="text-xs text-gray-500">
                      Showing {filteredAppliances.length} of {commonAppliances.length} appliances
                    </div>
                  )}
                </div>

                {/* Appliances List */}
                {appliances.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No appliances added yet. Add appliances to calculate your power needs.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {appliances.map((app) => (
                      <div key={app.id} className="bg-white rounded-lg p-4 border-2 border-blue-100 hover:border-blue-300 transition-colors">
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Solar Panels</h2>
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
                <div className="text-sm text-gray-900 bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg border border-blue-200 mt-3">
                  <span className="text-gray-700">Total Panel Power:</span> <span className="font-bold text-blue-700">{totalPanelPower.toFixed(2)} kW</span>
                </div>
              </motion.div>

              {/* Battery Storage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Battery className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Battery Storage</h2>
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
                <div className="text-sm text-gray-900 bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg border border-blue-200">
                  <span className="text-gray-700">Total Storage:</span> <span className="font-bold text-blue-700">{totalBatteryCapacity.toFixed(2)} kWh</span>
                </div>
              </motion.div>

              {/* Inverter & Accessories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Inverter & Controls</h2>
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

                  <div className="text-sm text-gray-900 bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200 mt-3">
                    <div className="font-bold text-blue-700 mb-1">⚡ Output Voltage: {config.outputVoltage}V AC</div>
                    <div className="text-xs text-gray-600">Standard for Nigeria (matches grid voltage)</div>
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
