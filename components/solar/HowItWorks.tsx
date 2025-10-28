'use client';
import { motion, useInView } from 'framer-motion';
import { ClipboardCheck, Home, Wrench, Zap } from 'lucide-react';
import { useRef } from 'react';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: ClipboardCheck,
      title: 'Free Consultation',
      description: 'Schedule a free consultation with our solar experts. We\'ll assess your property, analyze your energy needs, and design a custom solar solution.',
      duration: '30-60 minutes',
      details: ['Site assessment', 'Energy analysis', 'Custom design', 'Cost estimate']
    },
    {
      icon: Home,
      title: 'System Design & Approval',
      description: 'Our engineers create a detailed system design and handle all permits and paperwork. We work with local authorities to ensure smooth approval.',
      duration: '2-4 weeks',
      details: ['Engineering design', 'Permit applications', 'Utility coordination', 'Final approval']
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Our certified installers professionally mount and connect your solar system. Installation typically takes 1-3 days depending on system size.',
      duration: '1-3 days',
      details: ['Panel installation', 'Electrical work', 'Inverter setup', 'Quality inspection']
    },
    {
      icon: Zap,
      title: 'Activation & Monitoring',
      description: 'Once approved by the utility company, we activate your system and set up monitoring so you can track your energy production in real-time.',
      duration: 'Instant',
      details: ['System activation', 'App setup', '24/7 monitoring', 'Ongoing support']
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
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Solar Installation Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From consultation to activation, we make going solar simple and hassle-free
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transform -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl z-20">
                  {index + 1}
                </div>

                <div className="bg-white rounded-2xl p-8 transition-all duration-300 border-2 border-blue-100 hover:border-blue-400 mt-8 h-full">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>

                  <div className="text-center mb-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Total Timeline: 3-6 Weeks
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              From your initial consultation to flipping the switch on your solar system, the entire process typically takes 3-6 weeks, with most of that time spent on permitting and approvals.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Start Your Solar Journey Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

