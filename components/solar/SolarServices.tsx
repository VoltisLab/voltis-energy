'use client';
import { motion, useInView } from 'framer-motion';
import { Home, Building2, Wrench, LineChart, ShieldCheck, Sun } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const SolarServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Home,
      title: 'Residential Solar',
      description: 'Custom solar solutions for your home. Reduce your electricity bills and increase property value with clean, renewable energy.',
      features: ['Custom system design', 'Professional installation', 'Net metering setup', 'Monitoring & support'],
      link: '/services/residential',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Building2,
      title: 'Commercial Solar',
      description: 'Scalable solar solutions for businesses. Reduce operating costs and demonstrate environmental responsibility.',
      features: ['Large-scale systems', 'Tax incentives', 'ROI analysis', 'Maintenance plans'],
      link: '/services/commercial',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      icon: Wrench,
      title: 'Installation & Setup',
      description: 'Expert installation by certified professionals. Fast, efficient, and compliant with all local regulations.',
      features: ['Certified installers', '1-3 day installation', 'Permit handling', 'Inspection support'],
      link: '/services/installation',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: ShieldCheck,
      title: 'Maintenance & Repair',
      description: 'Keep your system running at peak performance. Regular maintenance and quick repairs when needed.',
      features: ['Annual inspections', 'Performance optimization', 'Quick repairs', '24/7 support'],
      link: '/services/maintenance',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: LineChart,
      title: 'Energy Consulting',
      description: 'Expert guidance on solar feasibility, financing options, and maximizing your return on investment.',
      features: ['Site assessment', 'Energy audits', 'Financial planning', 'Incentive navigation'],
      link: '/services/consulting',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Sun,
      title: 'Solar + Storage',
      description: 'Combine solar panels with battery storage for complete energy independence and backup power.',
      features: ['Battery integration', 'Backup power', 'Time-of-use optimization', 'Grid independence'],
      link: '/services/storage',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Solar Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From consultation to installation and beyond, we provide end-to-end solar services tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${service.gradient} p-6`}>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={service.link}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 group-hover:scale-105">
                    Learn More →
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Our Service Guarantee
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We stand behind our work with industry-leading warranties and 24/7 customer support. Your satisfaction is our priority.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">25 Years</div>
              <div className="text-blue-200">Panel Warranty</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10 Years</div>
              <div className="text-blue-200">Installation Warranty</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarServices;

