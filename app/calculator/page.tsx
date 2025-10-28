'use client';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Zap, Home, DollarSign, Leaf } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const CalculatorPage = () => {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [homeSize, setHomeSize] = useState(1500);
  const [sunlight, setSunlight] = useState(4);
  
  // Calculations
  const annualBill = monthlyBill * 12;
  const systemSize = Math.ceil((monthlyBill * 12 / 1200) * 10) / 10; // Rough estimate in kW
  const estimatedCost = systemSize * 1300; // £1,300 per kW average
  const annualSavings = annualBill * 0.65; // 65% average savings
  const paybackYears = (estimatedCost / annualSavings).toFixed(1);
  const twentyFiveSavings = (annualSavings * 25).toFixed(0);
  const co2Offset = (systemSize * 1.2).toFixed(1); // Tons per year

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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6">
              <Calculator className="w-10 h-10 text-blue-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solar Savings Calculator
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Discover how much you could save by switching to solar energy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Enter Your Details
              </h2>

              {/* Monthly Bill */}
              <div className="mb-8">
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Average Monthly Electricity Bill
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-blue-600">£{monthlyBill}</span>
                  </div>
                </div>
              </div>

              {/* Home Size */}
              <div className="mb-8">
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Home className="w-5 h-5 mr-2 text-blue-600" />
                  Home Size (sq ft)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="800"
                    max="5000"
                    step="100"
                    value={homeSize}
                    onChange={(e) => setHomeSize(Number(e.target.value))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-blue-600">{homeSize.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sunlight Hours */}
              <div className="mb-8">
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Average Daily Sunlight Hours
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="7"
                    step="0.5"
                    value={sunlight}
                    onChange={(e) => setSunlight(Number(e.target.value))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-blue-600">{sunlight}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  UK average: 3-4 hours
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  💡 <strong>Note:</strong> This calculator provides estimates based on average UK solar conditions. Actual savings may vary based on your location, roof orientation, and energy consumption patterns.
                </p>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Your Estimated Savings</h3>
                
                <div className="space-y-6">
                  {/* System Size */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 mr-2" />
                      <span className="text-blue-200">Recommended System Size</span>
                    </div>
                    <div className="text-4xl font-bold">{systemSize} kW</div>
                  </div>

                  {/* Estimated Cost */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="text-blue-200">Estimated System Cost</span>
                    </div>
                    <div className="text-4xl font-bold">£{estimatedCost.toLocaleString()}</div>
                    <p className="text-sm text-blue-200 mt-2">Before incentives and rebates</p>
                  </div>

                  {/* Annual Savings */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      <span className="text-blue-200">Annual Savings</span>
                    </div>
                    <div className="text-4xl font-bold text-yellow-400">£{annualSavings.toLocaleString()}</div>
                    <p className="text-sm text-blue-200 mt-2">Average 65% bill reduction</p>
                  </div>

                  {/* Payback Period */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <Calculator className="w-5 h-5 mr-2" />
                      <span className="text-blue-200">Payback Period</span>
                    </div>
                    <div className="text-4xl font-bold">{paybackYears} years</div>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <Leaf className="w-10 h-10 text-green-600 mb-3" />
                  <div className="text-3xl font-bold text-green-700">{co2Offset} tons</div>
                  <div className="text-sm text-green-600">CO₂ offset per year</div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                  <TrendingDown className="w-10 h-10 text-yellow-600 mb-3" />
                  <div className="text-3xl font-bold text-yellow-700">£{twentyFiveSavings}</div>
                  <div className="text-sm text-yellow-600">25-year savings</div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Get a detailed, personalized quote from our solar experts
                </p>
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 w-full">
                    Get Free Consultation
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Savings Add Up */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Your Savings Add Up
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the long-term financial impact of going solar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { year: 'Year 1', savings: annualSavings, total: annualSavings },
              { year: 'Year 5', savings: annualSavings, total: annualSavings * 5 },
              { year: 'Year 10', savings: annualSavings, total: annualSavings * 10 },
              { year: 'Year 25', savings: annualSavings, total: annualSavings * 25 }
            ].map((period, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 text-center"
              >
                <div className="text-sm text-gray-600 mb-2">{period.year}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  £{period.total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Total Savings</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors Affecting Savings */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Factors Affecting Your Savings
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Location & Sunlight',
                description: 'The amount of sunlight your area receives impacts energy production. Southern UK typically gets more sun than northern regions.'
              },
              {
                title: 'Roof Orientation',
                description: 'South-facing roofs with minimal shade produce the most energy. East and west orientations also work well.'
              },
              {
                title: 'Energy Consumption',
                description: 'Higher electricity usage means more potential for savings. Your consumption patterns affect ROI.'
              },
              {
                title: 'System Quality',
                description: 'Premium panels and inverters provide better efficiency and longer warranties, maximizing long-term value.'
              },
              {
                title: 'Electricity Rates',
                description: 'As utility rates increase over time, your solar savings compound, improving your return on investment.'
              },
              {
                title: 'Incentives & Rebates',
                description: 'Government incentives, tax credits, and feed-in tariffs can significantly reduce your initial investment.'
              }
            ].map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{factor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;

