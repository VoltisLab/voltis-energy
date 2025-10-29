'use client';
import { motion } from 'framer-motion';
import { Home, Building2, Briefcase, Factory, Check, ArrowRight } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import Link from 'next/link';

export default function PackagesPage() {
  const { currencySymbol } = useLocation();

  const packages = [
    {
      name: 'Voltis Basic',
      icon: Home,
      target: '1–2 bedroom home',
      features: 'Solar + inverter + small battery',
      priceMin: 700000,
      priceMax: 1500000,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Perfect starter package for small homes and apartments',
      included: [
        '2-3kW solar panels (4-6 panels)',
        '2-3kVA hybrid inverter',
        '100-200Ah battery (Lithium or Tubular)',
        'Complete installation & wiring',
        'Smart monitoring system',
        '2-year installation warranty',
        '25-year panel warranty'
      ]
    },
    {
      name: 'Voltis Standard',
      icon: Building2,
      target: '3–4 bedroom / small business',
      features: '2–3kVA system + 2 batteries',
      priceMin: 1500000,
      priceMax: 3000000,
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Most popular choice for medium homes and small offices',
      included: [
        '4-6kW solar panels (8-12 panels)',
        '3-5kVA hybrid inverter',
        '2× 200Ah batteries (Lithium preferred)',
        'MPPT charge controller',
        'Complete installation & wiring',
        'Smart monitoring & WiFi',
        '2-year installation warranty',
        '25-year panel warranty'
      ],
      popular: true
    },
    {
      name: 'Voltis Premium',
      icon: Briefcase,
      target: 'Offices / large homes',
      features: '5kVA+ hybrid system',
      priceMin: 3000000,
      priceMax: 8000000,
      gradient: 'from-indigo-600 to-purple-600',
      description: 'Premium solution for high energy demands',
      included: [
        '8-15kW solar panels (16-30 panels)',
        '5-10kVA hybrid inverter',
        '4-8× 200Ah batteries (Lithium)',
        'Dual MPPT charge controllers',
        'Advanced monitoring system',
        'Generator auto-switch (optional)',
        '3-year installation warranty',
        '25-year panel warranty'
      ]
    },
    {
      name: 'Voltis Custom',
      icon: Factory,
      target: 'Hotels / estates / farms',
      features: 'Tailored assessment',
      priceMin: null,
      priceMax: null,
      gradient: 'from-purple-600 to-pink-600',
      description: 'Fully customized solutions for large-scale installations',
      included: [
        'Site assessment & energy audit',
        'Custom system design',
        'Industrial-grade components',
        'Multiple inverters & batteries',
        'Professional installation team',
        'Generator integration',
        'Remote monitoring & support',
        'Extended warranty options'
      ]
    }
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
              Solar Packages
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Pre-designed solar solutions for every need and budget
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 px-6 py-3 rounded-lg">
              <span className="text-2xl">💡</span>
              <span className="text-base">All packages include installation, warranty, and aftercare</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 ${
                  pkg.popular ? 'border-yellow-400' : 'border-gray-200'
                } overflow-hidden hover:-translate-y-2 transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-r ${pkg.gradient} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <pkg.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{pkg.name}</h2>
                      <p className="text-blue-100">{pkg.target}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-lg opacity-90">{pkg.features}</p>
                  </div>

                  <div className="text-3xl font-bold">
                    {pkg.priceMin ? (
                      <>
                        {currencySymbol}{(pkg.priceMin / 1000).toFixed(0)}k–{currencySymbol}{(pkg.priceMax! / 1000000).toFixed(1)}M
                      </>
                    ) : (
                      'Quote only'
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{pkg.description}</p>

                  <h3 className="font-bold text-gray-900 mb-4">What's Included:</h3>
                  <div className="space-y-3 mb-8">
                    {pkg.included.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link href="/calculator" className="flex-1">
                      <button className={`w-full bg-gradient-to-r ${pkg.gradient} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                        Build Custom System
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                        Get Quote
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Package Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Choose the right package for your needs
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Package</th>
                    <th className="px-6 py-4 text-left font-bold">Target</th>
                    <th className="px-6 py-4 text-left font-bold">Features</th>
                    <th className="px-6 py-4 text-left font-bold">Price Range</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        pkg.popular ? 'bg-yellow-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <pkg.icon className="w-6 h-6 text-blue-600" />
                          <span className="font-bold text-gray-900">{pkg.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{pkg.target}</td>
                      <td className="px-6 py-4 text-gray-700">{pkg.features}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">
                        {pkg.priceMin ? (
                          <>
                            {currencySymbol}{(pkg.priceMin / 1000).toFixed(0)}k–{currencySymbol}{(pkg.priceMax! / 1000000).toFixed(1)}M
                          </>
                        ) : (
                          'Quote only'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Not Sure Which Package to Choose?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our solar experts will help you find the perfect solution for your specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Build Your System
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border-2 border-white/30">
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

