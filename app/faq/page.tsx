'use client';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      category: 'General Solar Questions',
      questions: [
        {
          q: 'How does solar energy work?',
          a: 'Solar panels contain photovoltaic (PV) cells that convert sunlight into direct current (DC) electricity. An inverter then converts this DC power into alternating current (AC) electricity that powers your home. Any excess energy can be stored in batteries or sent back to the grid through net metering.'
        },
        {
          q: 'Will solar panels work on cloudy days?',
          a: 'Yes! While solar panels are most efficient in direct sunlight, they still generate electricity on cloudy days. Modern panels can produce 10-25% of their normal output even on overcast days. The UK gets enough sunlight year-round to make solar a worthwhile investment.'
        },
        {
          q: 'How long do solar panels last?',
          a: 'Quality solar panels typically last 25-30 years or more. Most manufacturers offer 25-year performance warranties, guaranteeing at least 80-85% of original efficiency after 25 years. Inverters usually last 10-15 years and may need replacement during the system\'s lifetime.'
        },
        {
          q: 'What maintenance do solar panels require?',
          a: 'Solar panels require minimal maintenance. We recommend annual inspections and cleaning 1-2 times per year to remove dirt, leaves, and debris. Most systems include monitoring that alerts you to any performance issues.'
        }
      ]
    },
    {
      category: 'Installation & Setup',
      questions: [
        {
          q: 'How long does installation take?',
          a: 'Most residential installations are completed in 1-3 days. The entire process from consultation to activation typically takes 3-6 weeks, with most of that time spent on permitting and utility approvals rather than physical installation.'
        },
        {
          q: 'Will solar panels damage my roof?',
          a: 'No. Professional installers mount panels using specialized equipment that protects your roof. We inspect your roof before installation and may recommend repairs if needed. Properly installed solar panels can actually protect the roof area they cover.'
        },
        {
          q: 'Can I install solar panels myself?',
          a: 'We strongly recommend professional installation. Solar systems involve electrical work, roof penetrations, and local permitting requirements. Professional installation ensures safety, optimal performance, and warranty coverage.'
        },
        {
          q: 'What happens during a power outage?',
          a: 'Standard grid-tied systems shut down during outages for safety reasons. However, systems with battery storage can provide backup power. We offer battery solutions that keep essential appliances running during grid outages.'
        }
      ]
    },
    {
      category: 'Cost & Financing',
      questions: [
        {
          q: 'How much does a solar system cost?',
          a: 'Residential systems typically range from £5,000-£12,000 depending on size and components. The average UK home needs a 3-6kW system. We offer free consultations to provide accurate quotes based on your specific needs and energy usage.'
        },
        {
          q: 'What financing options are available?',
          a: 'We offer several financing options including cash purchase, solar loans, and Power Purchase Agreements (PPAs). Many customers qualify for 0% interest financing. We help you find the best option for your budget and goals.'
        },
        {
          q: 'Are there government incentives for solar?',
          a: 'Yes! The UK offers the Smart Export Guarantee (SEG), which pays you for excess energy sent to the grid. You may also qualify for VAT reductions and local authority grants. We help navigate all available incentives.'
        },
        {
          q: 'How quickly will I recoup my investment?',
          a: 'Most homeowners see payback in 6-10 years through energy savings and incentives. After that, you enjoy free electricity for the remaining 15-20+ years of the system\'s life. Total 25-year savings often exceed £20,000.'
        }
      ]
    },
    {
      category: 'Performance & Savings',
      questions: [
        {
          q: 'How much can I save with solar?',
          a: 'Most homeowners save 50-70% on electricity bills. Savings depend on system size, energy consumption, and electricity rates. Our calculator can provide personalized estimates based on your specific situation.'
        },
        {
          q: 'What if I produce more energy than I use?',
          a: 'Excess energy can be stored in batteries or sent back to the grid through net metering. The Smart Export Guarantee pays you for exported electricity, typically 3-7p per kWh, turning your solar system into an income source.'
        },
        {
          q: 'Will solar increase my property value?',
          a: 'Yes! Studies show homes with solar sell for 3-4% more on average. Solar panels are viewed as valuable upgrades that reduce operating costs and appeal to environmentally conscious buyers.'
        },
        {
          q: 'How do I monitor my system\'s performance?',
          a: 'All our systems include smart monitoring apps that track real-time energy production, consumption, and savings. You can view performance from your smartphone and receive alerts about any issues.'
        }
      ]
    },
    {
      category: 'Technical Details',
      questions: [
        {
          q: 'What size system do I need?',
          a: 'System size depends on your energy consumption, roof space, and budget. The average UK home needs 3-6kW (10-15 panels). We conduct a detailed energy assessment to recommend the optimal size for your needs.'
        },
        {
          q: 'Do I need a south-facing roof?',
          a: 'South-facing roofs are ideal but not required. East and west-facing roofs work well too, producing 85-90% of a south-facing system. We design systems to maximize production regardless of roof orientation.'
        },
        {
          q: 'Can I add more panels later?',
          a: 'Yes! Most systems are designed to be expandable. We can add panels as your energy needs grow or budget allows. It\'s easier to expand if planned from the start, so mention this during consultation.'
        },
        {
          q: 'What about shading from trees or buildings?',
          a: 'Some shading is often manageable with proper system design and panel placement. Modern microinverters and optimizers minimize shading impact. We conduct shade analysis during site assessment.'
        }
      ]
    },
    {
      category: 'Battery Storage',
      questions: [
        {
          q: 'Should I add battery storage?',
          a: 'Batteries provide backup power, maximize self-consumption, and increase energy independence. They make sense if you want backup power during outages or experience time-of-use electricity rates. We help you evaluate if batteries suit your needs.'
        },
        {
          q: 'How long do batteries last?',
          a: 'Modern lithium batteries last 10-15 years and include 10-year warranties. They\'re designed to handle thousands of charge cycles. When they eventually degrade, batteries can usually be replaced without changing the solar panels.'
        },
        {
          q: 'What size battery do I need?',
          a: 'Most homes benefit from 10-15kWh of storage. This covers evening energy use and provides backup for essential loads. We analyze your consumption patterns to recommend appropriate battery capacity.'
        },
        {
          q: 'Can I add batteries to an existing system?',
          a: 'Yes! Most solar systems can be retrofitted with batteries. Some inverters are battery-ready, while others may need upgrades. We assess your current system and recommend the best battery integration approach.'
        }
      ]
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6">
              <HelpCircle className="w-10 h-10 text-blue-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Everything you need to know about solar energy
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: qIndex * 0.05 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg md:text-xl font-bold text-gray-900 pr-8">
                          {faq.q}
                        </span>
                        <ChevronDown 
                          className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="p-6 pt-0 text-gray-700 text-lg leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our solar experts are here to help. Get personalized answers to all your questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Schedule Consultation
                </button>
              </Link>
              <a href="tel:08001234567">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Call: 0800 123 4567
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore More
            </h2>
            <p className="text-xl text-gray-600">
              Learn more about solar energy and our services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Calculate Savings',
                description: 'See how much you could save with solar',
                link: '/calculator',
                gradient: 'from-blue-500 to-blue-700'
              },
              {
                title: 'View Projects',
                description: 'See our portfolio of installations',
                link: '/projects',
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                title: 'Our Products',
                description: 'Explore our solar panels and equipment',
                link: '/solar-products',
                gradient: 'from-yellow-500 to-orange-500'
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
                  <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-8 text-white cursor-pointer h-full transition-transform duration-300 hover:scale-105`}>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/90 mb-4">{item.description}</p>
                    <div className="text-white font-semibold">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;

