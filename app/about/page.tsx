'use client';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Zap, Target, Heart, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const AboutPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
              Powering a Sustainable Future
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Leading the renewable energy revolution one solar installation at a time
            </p>
            <div className="flex justify-center gap-12 mt-12">
              <div>
                <div className="text-4xl font-bold text-yellow-400">25+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">5,000+</div>
                <div className="text-blue-200">Installations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">150+</div>
                <div className="text-blue-200">Team Members</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white" ref={ref}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 1999, Voltis Energy began with a simple mission: make clean, renewable energy accessible to everyone. What started as a small team of passionate engineers has grown into one of the UK's leading solar installation companies.
                </p>
                <p>
                  Over the past 25 years, we've witnessed the transformation of the solar industry—from niche technology to mainstream solution. We've been at the forefront of this revolution, constantly innovating and adapting to bring our customers the best solar technology available.
                </p>
                <p>
                  Today, we've installed over 5,000 solar systems across the UK, helping families and businesses reduce their carbon footprint while saving money on energy costs. Every installation represents our commitment to a cleaner, more sustainable future.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Industry Leaders</h3>
                <p className="text-blue-100 text-sm">Award-winning solar solutions</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white mt-8">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Expert Team</h3>
                <p className="text-green-100 text-sm">150+ certified professionals</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-8 text-white -mt-8">
                <Zap className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Clean Energy</h3>
                <p className="text-yellow-100 text-sm">25MW+ capacity installed</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Customer Focus</h3>
                <p className="text-purple-100 text-sm">98% satisfaction rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To accelerate the world's transition to sustainable energy by making solar power accessible, affordable, and reliable for homes and businesses across the UK.
              </p>
              <ul className="space-y-3">
                {[
                  'Provide premium solar solutions at competitive prices',
                  'Deliver exceptional customer service and support',
                  'Promote environmental sustainability through clean energy',
                  'Educate communities about renewable energy benefits'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                A future where every home and business is powered by clean, renewable solar energy, creating a sustainable world for generations to come.
              </p>
              <ul className="space-y-3">
                {[
                  'Lead the UK in solar installations by 2030',
                  'Achieve 100MW of installed capacity',
                  'Pioneer innovative solar + storage solutions',
                  'Create a carbon-neutral future for all'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Every decision we make starts with our customers. We listen, we care, and we deliver solutions that exceed expectations.',
                color: 'from-red-500 to-pink-600'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We never compromise on quality. From products to installation to service, we strive for excellence in everything we do.',
                color: 'from-blue-500 to-blue-700'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'The solar industry is constantly evolving. We stay ahead of the curve, bringing the latest technology to our customers.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Users,
                title: 'Integrity',
                description: 'Honesty and transparency in all our dealings. No hidden fees, no pressure sales—just honest advice.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: Target,
                title: 'Sustainability',
                description: "We're not just selling solar panels—we're building a sustainable future for our planet and future generations.",
                color: 'from-cyan-500 to-teal-600'
              },
              {
                icon: TrendingUp,
                title: 'Growth',
                description: 'Continuous improvement for our team, our technology, and our impact on creating a cleaner world.',
                color: 'from-purple-500 to-pink-600'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
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
              Join Us in Creating a Sustainable Future
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the Voltis Energy difference. Let's work together to power your property with clean, renewable energy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Get Free Consultation
                </button>
              </Link>
              <Link href="/projects">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  View Our Projects
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

