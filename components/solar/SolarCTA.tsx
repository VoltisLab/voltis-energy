'use client';
import { motion } from 'framer-motion';
import { Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

const SolarCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1280px] mx-auto px-4 xl:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Start Saving with Solar?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Get a free, no-obligation consultation and custom quote for your property
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Join thousands of homeowners and businesses who are already benefiting from clean, renewable solar energy
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Calendar,
              title: 'Free Consultation',
              description: 'Schedule a complimentary assessment',
              action: 'Book Now',
              link: '/contact'
            },
            {
              icon: Phone,
              title: 'Call Us Today',
              description: 'Speak with a solar expert',
              action: '0800 123 4567',
              link: 'tel:08001234567'
            },
            {
              icon: Mail,
              title: 'Email Us',
              description: 'Get answers to your questions',
              action: 'solar@voltisenergy.com',
              link: 'mailto:solar@voltisenergy.com'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={item.link}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                  <div className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-200 mb-4 text-sm">{item.description}</p>
                  <div className="text-yellow-400 font-semibold">{item.action} →</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/calculator">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-12 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
              <span>Calculate Your Savings</span>
              <span className="text-2xl">→</span>
            </button>
          </Link>
          <p className="mt-6 text-blue-200 text-sm">
            Get an instant estimate of your potential savings • No credit card required
          </p>
        </motion.div>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold mb-1">No Pressure Sales</div>
              <div className="text-sm text-blue-200">Honest, transparent advice</div>
            </div>
            <div>
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold mb-1">Free Quotes</div>
              <div className="text-sm text-blue-200">No obligations or hidden fees</div>
            </div>
            <div>
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold mb-1">Expert Guidance</div>
              <div className="text-sm text-blue-200">25+ years of experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarCTA;

