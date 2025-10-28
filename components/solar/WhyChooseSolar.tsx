'use client';
import { motion, useInView } from 'framer-motion';
import { Battery, DollarSign, Leaf, TrendingUp, Home, Award } from 'lucide-react';
import { useRef } from 'react';

const WhyChooseSolar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Significant Savings',
      description: 'Reduce your electricity bills by up to 70% and protect yourself from rising energy costs.',
      stat: 'Up to 70%',
      statLabel: 'Bill Reduction'
    },
    {
      icon: Leaf,
      title: 'Environmental Impact',
      description: 'Reduce your carbon footprint and contribute to a cleaner, more sustainable planet.',
      stat: '4 Tons',
      statLabel: 'CO₂ Saved/Year'
    },
    {
      icon: TrendingUp,
      title: 'Increase Property Value',
      description: 'Homes with solar panels sell for 3-4% more on average than those without.',
      stat: '+4%',
      statLabel: 'Home Value'
    },
    {
      icon: Battery,
      title: 'Energy Independence',
      description: 'Generate your own clean electricity and reduce reliance on the grid.',
      stat: '100%',
      statLabel: 'Self-Sufficient'
    },
    {
      icon: Award,
      title: 'Government Incentives',
      description: 'Take advantage of tax credits, rebates, and feed-in tariff programs.',
      stat: '£1000+',
      statLabel: 'In Rebates'
    },
    {
      icon: Home,
      title: 'Low Maintenance',
      description: 'Solar panels require minimal upkeep and come with 25-year warranties.',
      stat: '25 Years',
      statLabel: 'Warranty'
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
            Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Solar Energy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Investing in solar energy is more than just installing panels—it's about creating a sustainable future while enjoying immediate financial benefits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-blue-600">{benefit.stat}</div>
                <div className="text-sm text-gray-500 mt-1">{benefit.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make the Switch?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of homeowners who are already saving money and protecting the environment with solar energy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Get Free Consultation
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                View Our Projects
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSolar;

