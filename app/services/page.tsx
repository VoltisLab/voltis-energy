'use client';
import { motion, useInView } from 'framer-motion';
import { Home, Building2, Wrench, ShieldCheck, LineChart, Sun, Check, Phone } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';

const ServicesPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { currencySymbol } = useLocation();

  const services = [
    {
      icon: Home,
      title: 'Residential Solar Installation',
      subtitle: 'Power Your Home with Clean Energy',
      description: 'Transform your home into an energy-efficient powerhouse with our custom residential solar solutions. Perfect for homeowners looking to reduce electricity bills and increase property value.',
      features: [
        'Free home energy assessment',
        'Custom system design for maximum efficiency',
        'Professional installation (1-3 days)',
        'Net metering setup and grid connection',
        'Smart monitoring system included',
        ' 25-year panel warranty, 10-year installation warranty'
      ],
      benefits: [
        'Save 50-70% on electricity bills',
        'Increase home value by 3-4%',
        'Lock in energy costs for 25+ years',
        'Reduce carbon footprint by 4+ tons/year'
      ],
      pricing: 5500,
      pricingPrefix: 'From',
      gradient: 'from-blue-500 to-blue-700',
      link: '/contact'
    },
    {
      icon: Building2,
      title: 'Commercial Solar Solutions',
      subtitle: 'Sustainable Energy for Your Business',
      description: 'Reduce operating costs and demonstrate corporate responsibility with scalable commercial solar systems designed for businesses of all sizes.',
      features: [
        'Comprehensive energy audit',
        'Scalable system design (10kW - 1MW+)',
        'Minimal business disruption during installation',
        'Tax incentives and depreciation benefits',
        'Power Purchase Agreements (PPA) available',
        'Performance monitoring and reporting'
      ],
      benefits: [
        'Reduce operating costs by 40-60%',
        'Improve brand reputation',
        'Hedge against rising energy prices',
        'Achieve sustainability goals'
      ],
      pricing: 'Custom Quote',
      gradient: 'from-cyan-500 to-teal-600',
      link: '/contact'
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      subtitle: 'Expert Setup from Start to Finish',
      description: 'Our certified installers handle every aspect of your solar installation with precision and care, ensuring optimal performance and compliance.',
      features: [
        'Site assessment and planning',
        'Structural engineering analysis',
        'All permits and paperwork handled',
        'Professional mounting and wiring',
        'Electrical system integration',
        'Final inspection and activation'
      ],
      benefits: [
        'Certified and insured installers',
        'Compliant with all local codes',
        'Minimal disruption to your property',
        'Quality guaranteed'
      ],
      pricing: 'Included in system cost',
      gradient: 'from-orange-500 to-red-600',
      link: '/contact'
    },
    {
      icon: ShieldCheck,
      title: 'Maintenance & Repair',
      subtitle: 'Keep Your System Running Perfectly',
      description: 'Maximize your solar investment with our comprehensive maintenance and repair services. We ensure your system operates at peak efficiency year-round.',
      features: [
        'Annual system inspections',
        'Panel cleaning and optimization',
        'Inverter testing and updates',
        'Performance monitoring and reporting',
        'Rapid response repairs',
        'Warranty claim assistance'
      ],
      benefits: [
        'Maintain optimal performance',
        'Extend system lifespan',
        'Quick issue resolution',
        '24/7 support available'
      ],
      pricing: 'From £150/year',
      gradient: 'from-green-500 to-emerald-600',
      link: '/contact'
    },
    {
      icon: LineChart,
      title: 'Energy Consulting',
      subtitle: 'Expert Guidance for Solar Success',
      description: 'Make informed decisions with expert consulting services. We analyze your energy needs and design the optimal solar solution for maximum ROI.',
      features: [
        'Detailed energy consumption analysis',
        'Solar feasibility assessment',
        'Financial modeling and ROI projections',
        'Financing options guidance',
        'Incentive and rebate navigation',
        'System optimization recommendations'
      ],
      benefits: [
        'Maximize return on investment',
        'Understand all financing options',
        'Navigate complex incentives',
        'Make data-driven decisions'
      ],
      pricing: 'Free with installation',
      gradient: 'from-purple-500 to-pink-600',
      link: '/contact'
    },
    {
      icon: Sun,
      title: 'Solar + Battery Storage',
      subtitle: 'Complete Energy Independence',
      description: 'Combine solar panels with advanced battery storage for 24/7 clean energy, backup power during outages, and maximum energy independence.',
      features: [
        'Integrated solar + storage design',
        'Tesla Powerwall, LG Chem, and more',
        'Seamless backup power during outages',
        'Time-of-use rate optimization',
        'Smart energy management system',
        'Expandable storage capacity'
      ],
      benefits: [
        'True energy independence',
        'Backup power security',
        'Optimize energy usage',
        'Maximize self-consumption'
      ],
      pricing: 'From £8,500 (battery)',
      gradient: 'from-yellow-500 to-orange-500',
      link: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete Solar Solutions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              From consultation to installation, maintenance, and beyond—we provide comprehensive solar services tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50" ref={ref}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex`}
              >
                {/* Icon Section */}
                <div className={`lg:w-1/3 bg-gradient-to-br ${service.gradient} p-12 flex flex-col justify-center text-white`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">{service.title}</h2>
                  <p className="text-lg text-white/90 mb-6">{service.subtitle}</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
                    <div className="text-sm text-white/80 mb-1">Starting at</div>
                    <div className="text-2xl font-bold">
                      {typeof service.pricing === 'number' 
                        ? `${service.pricingPrefix ? service.pricingPrefix + ' ' : ''}${currencySymbol}${service.pricing.toLocaleString()}`
                        : service.pricing
                      }
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-12">
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href={service.link}>
                    <button className={`bg-gradient-to-r ${service.gradient} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105`}>
                      Get Free Quote →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A seamless experience from start to finish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Consultation', desc: 'Free assessment and custom design' },
              { step: 2, title: 'Proposal', desc: 'Detailed quote and financing options' },
              { step: 3, title: 'Installation', desc: 'Professional setup in 1-3 days' },
              { step: 4, title: 'Support', desc: 'Ongoing maintenance and monitoring' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our solar experts today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free Consultation
                </button>
              </Link>
              <Link href="/calculator">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Calculate Your Savings
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

