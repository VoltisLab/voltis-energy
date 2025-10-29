'use client';
import { motion, useInView } from 'framer-motion';
import { MapPin, Zap, TrendingDown, Calendar, Award } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';
import { projectsData } from '@/data/projects';

const ProjectsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { formatPrice } = useLocation();

  const projects = projectsData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Explore our portfolio of successful solar installations across the UK
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <div>
                <div className="text-4xl font-bold text-yellow-400">120+</div>
                <div className="text-blue-200">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">25MW+</div>
                <div className="text-blue-200">Total Capacity</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">98%</div>
                <div className="text-blue-200">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gray-50" ref={ref}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex`}
              >
                {/* Image Section */}
                <div className="lg:w-2/5 relative h-96 lg:h-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg text-white font-semibold mb-2">
                      {project.type}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      {project.date}
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center text-blue-600 mb-2">
                        <Zap className="w-5 h-5 mr-2" />
                        <span className="text-sm font-semibold">System Size</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">{project.systemSize}</div>
                      <div className="text-xs text-gray-600 mt-1">{project.panels}</div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center text-green-600 mb-2">
                        <TrendingDown className="w-5 h-5 mr-2" />
                        <span className="text-sm font-semibold">Annual Savings</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">{formatPrice(project.savings)}/year</div>
                      <div className="text-xs text-gray-600 mt-1">{project.co2Offset} CO₂ offset</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-3">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <div className={`inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-semibold text-lg hover:scale-105 transition-transform cursor-pointer`}>
                      View Case Study →
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We Install Solar Everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From homes to businesses, schools to farms - we've done it all
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { type: 'Residential', count: '70+', icon: '🏠' },
              { type: 'Commercial', count: '30+', icon: '🏢' },
              { type: 'Industrial', count: '12+', icon: '🏭' },
              { type: 'Agricultural', count: '8+', icon: '🚜' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border-2 border-blue-200"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.type}</h3>
                <div className="text-3xl font-bold text-blue-600">{category.count}</div>
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
              Your Project Could Be Next
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join over 120 satisfied customers who have made the switch to solar
            </p>
            <Link href="/contact">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Start Your Solar Project
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

