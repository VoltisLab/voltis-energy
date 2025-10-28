'use client';
import { motion, useInView } from 'framer-motion';
import { Battery, Sun, Zap, Check } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const SolarProducts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const products = [
    {
      icon: Sun,
      name: 'Solar Panels',
      tagline: 'Premium Photovoltaic Systems',
      description: 'High-efficiency monocrystalline and polycrystalline solar panels from world-leading manufacturers.',
      features: [
        'Up to 22% efficiency rating',
        '25-year performance warranty',
        'Weather-resistant construction',
        'Low degradation rate (0.5%/year)'
      ],
      brands: ['SunPower', 'LG Solar', 'Canadian Solar', 'Panasonic'],
      gradient: 'from-yellow-400 to-orange-500',
      specs: {
        power: '300-450W per panel',
        size: '65" x 39"',
        warranty: '25 years'
      }
    },
    {
      icon: Zap,
      name: 'Inverters',
      tagline: 'Smart Energy Conversion',
      description: 'Convert DC power from panels to AC power for your home with industry-leading efficiency.',
      features: [
        'Up to 98% conversion efficiency',
        'Real-time monitoring',
        'Smart grid connectivity',
        '10-year standard warranty'
      ],
      brands: ['Enphase', 'SolarEdge', 'Fronius', 'SMA'],
      gradient: 'from-blue-500 to-cyan-500',
      specs: {
        power: '3-10kW capacity',
        efficiency: '97-98%',
        warranty: '10-25 years'
      }
    },
    {
      icon: Battery,
      name: 'Energy Storage',
      tagline: 'Power When You Need It',
      description: 'Store excess solar energy for use during nighttime or power outages with advanced battery systems.',
      features: [
        '10-20kWh storage capacity',
        'Seamless backup power',
        'Smart energy management',
        'Expandable systems'
      ],
      brands: ['Tesla Powerwall', 'LG Chem', 'Sonnen', 'Enphase'],
      gradient: 'from-green-500 to-emerald-600',
      specs: {
        power: '10-20kWh capacity',
        backup: 'Full home backup',
        warranty: '10 years'
      }
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium Solar Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We partner with the world's leading manufacturers to bring you the most reliable and efficient solar technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${product.gradient} p-8 text-white`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <product.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-white/90 text-sm">{product.tagline}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Trusted Brands
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.brands.map((brand, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/products">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Certified & Approved
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              All our products meet or exceed industry standards and come with comprehensive warranties
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {['IEC Certified', 'UL Listed', 'ISO 9001', 'TÜV Approved', 'CE Marked'].map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-3 rounded-lg border border-blue-200"
                >
                  <span className="text-blue-900 font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarProducts;

