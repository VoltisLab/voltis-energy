'use client';
import { motion, useInView } from 'framer-motion';
import { Sun, Zap, Battery, ShoppingCart, Check } from 'lucide-react';
import { useRef } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import Link from 'next/link';

const ProductsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { currencySymbol } = useLocation();

  const solarPanels = [
    {
      brand: 'JA Solar',
      model: 'JAM72S30 550W',
      power: '550W',
      efficiency: '21.2%',
      warranty: '25 years',
      price: 220,
      inStock: true,
      image: '🔆',
      features: ['Monocrystalline', 'High efficiency', 'Low degradation', 'Weather resistant']
    },
    {
      brand: 'LONGi Solar',
      model: 'LR5-72HPH 530W',
      power: '530W',
      efficiency: '20.9%',
      warranty: '25 years',
      price: 210,
      inStock: true,
      image: '🔆',
      features: ['PERC technology', 'Low-light performance', 'Durable frame', 'Tier 1 module']
    },
    {
      brand: 'Jinko Solar',
      model: 'Tiger Pro 595W',
      power: '595W',
      efficiency: '22.3%',
      warranty: '25 years',
      price: 250,
      inStock: true,
      image: '🔆',
      features: ['N-type cells', 'Bifacial', 'High power output', 'Premium quality']
    },
    {
      brand: 'Trina Solar',
      model: 'Vertex S 600W',
      power: '600W',
      efficiency: '21.8%',
      warranty: '25 years',
      price: 260,
      inStock: true,
      image: '🔆',
      features: ['Multi-busbar', 'Half-cut cells', 'Ultra-high power', 'Excellent performance']
    },
    {
      brand: 'Canadian Solar',
      model: 'HiKu6 540W',
      power: '540W',
      efficiency: '21.0%',
      warranty: '25 years',
      price: 205,
      inStock: true,
      image: '🔆',
      features: ['PERC cells', 'Low PID', 'High load capacity', 'Great value']
    },
    {
      brand: 'SunPower',
      model: 'Maxeon 3 415W',
      power: '415W',
      efficiency: '22.6%',
      warranty: '25 years',
      price: 300,
      inStock: true,
      image: '🔆',
      features: ['Maxeon Gen 3', 'Best efficiency', 'All-black design', 'Premium panel']
    },
  ];

  const inverters = [
    {
      brand: 'Deye',
      model: 'SUN-3.6K-SG04LP3',
      power: '3.6kW',
      type: 'Hybrid Inverter',
      voltage: '48V',
      price: 800,
      inStock: true,
      image: '⚡',
      features: ['MPPT controller', 'Battery ready', 'WiFi monitoring', 'Grid-tie capability']
    },
    {
      brand: 'Victron Energy',
      model: 'MultiPlus 5000VA',
      power: '5kVA',
      type: 'Inverter/Charger',
      voltage: '48V',
      price: 1500,
      inStock: true,
      image: '⚡',
      features: ['Pure sine wave', 'PowerAssist', 'Peak power 9000W', 'Proven reliability']
    },
    {
      brand: 'Growatt',
      model: 'SPF 5000ES',
      power: '5kW',
      type: 'Off-grid Inverter',
      voltage: '48V',
      price: 950,
      inStock: true,
      image: '⚡',
      features: ['Built-in MPPT', '80A charger', 'LCD display', 'Auto restart']
    },
    {
      brand: 'Must Solar',
      model: 'PH1800 5.5kW',
      power: '5.5kW',
      type: 'Hybrid Inverter',
      voltage: '48V',
      price: 1100,
      inStock: true,
      image: '⚡',
      features: ['WiFi & GPRS', 'Parallel capable', '145A MPPT', 'LCD touchscreen']
    },
    {
      brand: 'Sunsynk',
      model: '8kW Hybrid',
      power: '8kW',
      type: 'Hybrid Inverter',
      voltage: '48V',
      price: 1800,
      inStock: true,
      image: '⚡',
      features: ['Dual MPPT', 'Smart load', '2× AC inputs', 'Generator ready']
    },
    {
      brand: 'Goodwe',
      model: 'GW10K-MS',
      power: '10kW',
      type: 'Hybrid Inverter',
      voltage: '48V',
      price: 2200,
      inStock: true,
      image: '⚡',
      features: ['Dual MPPT', 'Smart meter', 'Emergency power', 'WiFi included']
    },
  ];

  const batteries = [
    {
      brand: 'Felicity Solar',
      model: 'Lithium 5.12kWh',
      capacity: '5.12kWh',
      voltage: '48V',
      type: 'Lithium (LiFePO4)',
      price: 1400,
      inStock: true,
      image: '🔋',
      features: ['5000+ cycles', 'BMS included', 'Wall-mountable', 'Parallel capable']
    },
    {
      brand: 'Pylon Tech',
      model: 'US3000C 3.55kWh',
      capacity: '3.55kWh',
      voltage: '48V',
      type: 'Lithium (LiFePO4)',
      price: 1100,
      inStock: true,
      image: '🔋',
      features: ['Stackable', 'LCD display', '6000+ cycles', 'Compact design']
    },
    {
      brand: 'Huawei',
      model: 'LUNA2000 10kWh',
      capacity: '10kWh',
      voltage: '48V',
      type: 'Lithium (LiFePO4)',
      price: 3200,
      inStock: true,
      image: '🔋',
      features: ['Modular design', 'Smart BMS', 'Active cooling', 'App control']
    },
    {
      brand: 'BlueNova',
      model: 'BN52V-340-11k',
      capacity: '11kWh',
      voltage: '52V',
      type: 'Lithium (LiFePO4)',
      price: 3500,
      inStock: true,
      image: '🔋',
      features: ['340Ah', '8000+ cycles', 'IP65 rated', 'Premium quality']
    },
    {
      brand: 'Tubular',
      model: 'Lead-Acid 200Ah',
      capacity: '9.6kWh',
      voltage: '48V (4×12V)',
      type: 'Tubular Lead-Acid',
      price: 800,
      inStock: true,
      image: '🔋',
      features: ['Deep cycle', '5-7 year life', 'Proven technology', 'Budget friendly']
    },
    {
      brand: 'Gel Battery',
      model: 'AGM 200Ah',
      capacity: '9.6kWh',
      voltage: '48V (4×12V)',
      type: 'Gel',
      price: 1000,
      inStock: true,
      image: '🔋',
      features: ['Sealed design', 'No maintenance', '7-10 year life', 'Deep discharge']
    },
  ];

  const accessories = [
    {
      name: 'MC4 Connectors (Pair)',
      category: 'Cables & Connectors',
      price: 5,
      inStock: true,
      image: '🔌',
      features: ['IP67 rated', 'For solar panels', 'Male & female', 'High quality copper']
    },
    {
      name: 'Solar Cable 6mm² (per meter)',
      category: 'Cables & Connectors',
      price: 3,
      inStock: true,
      image: '🔌',
      features: ['UV resistant', 'Double insulated', 'TÜV certified', 'Red or black']
    },
    {
      name: 'MPPT Charge Controller 60A',
      category: 'Charge Controllers',
      price: 250,
      inStock: true,
      image: '🎛️',
      features: ['12/24/48V auto', 'LCD display', '150V input', 'High efficiency']
    },
    {
      name: 'PWM Charge Controller 30A',
      category: 'Charge Controllers',
      price: 80,
      inStock: true,
      image: '🎛️',
      features: ['12/24V', 'LCD screen', 'USB ports', 'Temperature sensor']
    },
    {
      name: 'Solar Panel Mounting Rails (per meter)',
      category: 'Mounting Systems',
      price: 15,
      inStock: true,
      image: '🔧',
      features: ['Aluminum', 'Anodized finish', 'Universal fit', 'Durable']
    },
    {
      name: 'Roof Mounting Kit (4 panels)',
      category: 'Mounting Systems',
      price: 200,
      inStock: true,
      image: '🔧',
      features: ['Complete kit', 'All hardware', 'Tile/metal roof', 'Easy install']
    },
    {
      name: 'Ground Mount Kit (4 panels)',
      category: 'Mounting Systems',
      price: 280,
      inStock: true,
      image: '🔧',
      features: ['Galvanized steel', 'Adjustable angle', 'Concrete base', 'Wind resistant']
    },
    {
      name: 'Circuit Breakers DC (Set)',
      category: 'Electrical',
      price: 45,
      inStock: true,
      image: '⚙️',
      features: ['16A/32A/63A', 'DC rated', 'DIN rail mount', 'Safety certified']
    },
    {
      name: 'Battery Terminal Cables',
      category: 'Electrical',
      price: 25,
      inStock: true,
      image: '⚙️',
      features: ['Heavy duty', 'Tinned copper', 'Various lengths', 'Pre-terminated']
    },
    {
      name: 'WiFi Monitoring Dongle',
      category: 'Monitoring',
      price: 60,
      inStock: true,
      image: '📱',
      features: ['Real-time data', 'App control', 'Cloud storage', 'Easy setup']
    },
    {
      name: 'Smart Energy Meter',
      category: 'Monitoring',
      price: 150,
      inStock: true,
      image: '📱',
      features: ['CT clamps', 'WiFi enabled', 'Export monitoring', 'App dashboard']
    },
    {
      name: 'Surge Protector DC',
      category: 'Protection',
      price: 120,
      inStock: true,
      image: '🛡️',
      features: ['Type 1+2', 'Lightning protection', 'DIN rail', '1000V DC']
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solar Components Store
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Premium solar panels, inverters, batteries, and all components for your solar system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solar Panels */}
      <section className="py-16 bg-white" ref={ref}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Sun className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Solar Panels</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solarPanels.map((panel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 text-center">{panel.image}</div>
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">{panel.brand}</div>
                  <h3 className="text-lg font-bold text-gray-900">{panel.model}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-blue-600">{currencySymbol}{panel.price}</span>
                    <span className="text-sm text-gray-500">per panel</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Power:</span>
                    <span className="font-semibold">{panel.power}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className="font-semibold">{panel.efficiency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Warranty:</span>
                    <span className="font-semibold">{panel.warranty}</span>
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  {panel.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inverters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Inverters</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inverters.map((inverter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 text-center">{inverter.image}</div>
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">{inverter.brand}</div>
                  <h3 className="text-lg font-bold text-gray-900">{inverter.model}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-blue-600">{currencySymbol}{inverter.price}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Power:</span>
                    <span className="font-semibold">{inverter.power}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{inverter.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Voltage:</span>
                    <span className="font-semibold">{inverter.voltage}</span>
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  {inverter.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batteries */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Battery className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Battery Storage</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batteries.map((battery, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 text-center">{battery.image}</div>
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">{battery.brand}</div>
                  <h3 className="text-lg font-bold text-gray-900">{battery.model}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-blue-600">{currencySymbol}{battery.price}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold">{battery.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Voltage:</span>
                    <span className="font-semibold">{battery.voltage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-xs">{battery.type}</span>
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  {battery.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Accessories & Components</h2>
            <p className="text-gray-600">Everything else you need for a complete solar installation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 text-center">{item.image}</div>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-bold text-blue-600">{currencySymbol}{item.price}</span>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  {item.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Need Help Choosing Components?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our solar experts can help you select the right components for your specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                  Build Your System
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border-2 border-white/30">
                  Contact an Expert
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
