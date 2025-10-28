'use client';
import { motion, useInView } from 'framer-motion';
import { Sun, Zap, Battery, Check, Award, Shield } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const ProductsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const solarPanels = [
    {
      brand: 'SunPower Maxeon',
      model: 'Maxeon 3',
      power: '400W - 415W',
      efficiency: '22.6%',
      warranty: '25 years',
      features: ['Highest efficiency available', 'Superior low-light performance', 'Copper foundation for durability', 'Sleek all-black design'],
      price: 'Premium',
      badge: 'Best Performance'
    },
    {
      brand: 'LG Solar',
      model: 'NeON R',
      power: '365W - 380W',
      efficiency: '21.4%',
      warranty: '25 years',
      features: ['Advanced cell technology', 'Excellent temperature coefficient', 'High power output', 'Proven reliability'],
      price: 'Premium',
      badge: 'Top Rated'
    },
    {
      brand: 'Canadian Solar',
      model: 'HiKu6',
      power: '540W - 665W',
      efficiency: '21.0%',
      warranty: '25 years',
      features: ['High power density', 'Excellent value', 'Tier 1 manufacturer', 'Proven track record'],
      price: 'Mid-Range',
      badge: 'Best Value'
    }
  ];

  const inverters = [
    {
      brand: 'Enphase',
      model: 'IQ8 Plus',
      type: 'Microinverter',
      power: '300W',
      efficiency: '97.5%',
      warranty: '25 years',
      features: ['Panel-level optimization', 'Grid-independent operation', 'Superior reliability', 'Easy expansion'],
      badge: 'Most Reliable'
    },
    {
      brand: 'SolarEdge',
      model: 'HD-Wave',
      type: 'String Inverter',
      power: '3-10kW',
      efficiency: '99%',
      warranty: '12 years',
      features: ['Industry-leading efficiency', 'Built-in monitoring', 'Module-level MPPT', 'Compact design'],
      badge: 'Best Efficiency'
    },
    {
      brand: 'Fronius',
      model: 'Primo GEN24',
      type: 'Hybrid Inverter',
      power: '3-6kW',
      efficiency: '98%',
      warranty: '10 years',
      features: ['Battery-ready', 'Full backup capability', 'Smart energy management', 'Premium quality'],
      badge: 'Future-Ready'
    }
  ];

  const batteries = [
    {
      brand: 'Tesla',
      model: 'Powerwall 2',
      capacity: '13.5 kWh',
      power: '5kW continuous',
      warranty: '10 years',
      features: ['Sleek wall-mount design', 'Integrated inverter', 'Weather-resistant', 'App control'],
      price: '£8,500',
      badge: 'Most Popular'
    },
    {
      brand: 'LG Chem',
      model: 'RESU10H',
      capacity: '9.8 kWh',
      power: '5kW continuous',
      warranty: '10 years',
      features: ['Compact footprint', 'High efficiency', 'Proven reliability', 'Expandable'],
      price: '£6,800',
      badge: 'Great Value'
    },
    {
      brand: 'Sonnen',
      model: 'eco 10',
      capacity: '10 kWh',
      power: '4.6kW continuous',
      warranty: '10 years',
      features: ['German engineering', 'Smart energy management', 'Virtual power plant ready', 'Premium quality'],
      price: '£9,500',
      badge: 'Premium Choice'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Solar Products
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              We partner with the world's leading manufacturers to bring you the most reliable and efficient solar technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solar Panels Section */}
      <section className="py-24 bg-white" ref={ref}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Solar Panels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-efficiency photovoltaic panels from world-class manufacturers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {solarPanels.map((panel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                {panel.badge && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 text-center font-semibold text-sm">
                    {panel.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{panel.brand}</h3>
                  <p className="text-gray-600 mb-6">{panel.model}</p>

                  <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power Output:</span>
                      <span className="font-semibold text-gray-900">{panel.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-semibold text-gray-900">{panel.efficiency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-semibold text-gray-900">{panel.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-blue-600">{panel.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {panel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Get Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inverters Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Inverters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convert solar DC power to AC with industry-leading efficiency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {inverters.map((inverter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-cyan-300 transition-all duration-300 overflow-hidden"
              >
                {inverter.badge && (
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-800 text-white py-2 px-4 text-center font-semibold text-sm">
                    {inverter.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{inverter.brand}</h3>
                  <p className="text-gray-600 mb-2">{inverter.model}</p>
                  <p className="text-sm text-blue-600 font-semibold mb-6">{inverter.type}</p>

                  <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power:</span>
                      <span className="font-semibold text-gray-900">{inverter.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-semibold text-gray-900">{inverter.efficiency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-semibold text-gray-900">{inverter.warranty}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {inverter.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Get Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Battery Storage Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
              <Battery className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Battery Storage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Store solar energy for use anytime, day or night
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {batteries.map((battery, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-green-300 transition-all duration-300 overflow-hidden"
              >
                {battery.badge && (
                  <div className="bg-gradient-to-r from-green-600 to-emerald-800 text-white py-2 px-4 text-center font-semibold text-sm">
                    {battery.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{battery.brand}</h3>
                  <p className="text-gray-600 mb-6">{battery.model}</p>

                  <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold text-gray-900">{battery.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power:</span>
                      <span className="font-semibold text-gray-900">{battery.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-semibold text-gray-900">{battery.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-green-600">{battery.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {battery.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Get Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certified & Approved
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All our products meet or exceed international standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {['IEC Certified', 'UL Listed', 'ISO 9001', 'TÜV Approved', 'CE Marked'].map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our solar experts will help you select the perfect products for your needs
            </p>
            <Link href="/contact">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Speak with an Expert
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

