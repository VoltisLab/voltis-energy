'use client';
import { motion } from 'framer-motion';
import { MapPin, Zap, TrendingDown, Calendar, Award, CheckCircle, ArrowLeft, Users, Battery, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';
import { useParams } from 'next/navigation';
import { projectsData } from '@/data/projects';

const ProjectCaseStudy = () => {
  const params = useParams();
  const { formatPrice } = useLocation();
  const slug = params.slug as string;
  
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/projects">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}></div>
        </div>
        <div className="relative h-full max-w-[1280px] mx-auto px-4 xl:px-8 flex flex-col justify-center text-white">
          <Link href="/projects">
            <button className="flex items-center text-white/90 hover:text-white mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg font-semibold mb-4">
              {project.type}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                {project.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                {project.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 text-center border-2 border-blue-100"
            >
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{project.systemSize}</div>
              <div className="text-gray-600">System Size</div>
              <div className="text-sm text-gray-500 mt-2">{project.panels}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 text-center border-2 border-green-100"
            >
              <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{formatPrice(project.savings)}</div>
              <div className="text-gray-600">Annual Savings</div>
              <div className="text-sm text-gray-500 mt-2">Per Year</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 text-center border-2 border-orange-100"
            >
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{project.co2Offset}</div>
              <div className="text-gray-600">CO₂ Offset</div>
              <div className="text-sm text-gray-500 mt-2">Annually</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 text-center border-2 border-purple-100"
            >
              <Battery className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Year Lifespan</div>
              <div className="text-sm text-gray-500 mt-2">Warranty Included</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.description}
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                {project.type.includes('Residential') 
                  ? 'The client was experiencing frequent power outages, high electricity bills, and reliance on noisy, expensive diesel generators. They needed a reliable, clean energy solution that would provide 24/7 power and significantly reduce energy costs.'
                  : project.type.includes('Commercial') || project.type.includes('Industrial')
                  ? 'The business faced rising energy costs, frequent power interruptions affecting operations, and pressure to reduce their carbon footprint. A reliable renewable energy solution was essential for business continuity and sustainability goals.'
                  : project.type.includes('Agricultural')
                  ? 'The farm required consistent power for irrigation, equipment, and temperature control. Unreliable grid power and expensive diesel generators were cutting into profit margins and affecting productivity.'
                  : 'The institution needed a sustainable energy solution to reduce operational costs, ensure reliable power, and serve as an educational tool for renewable energy awareness.'
                }
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                Voltis Energy designed and installed a comprehensive solar system tailored to the specific energy needs of this {project.type.toLowerCase()}. Our solution included premium solar panels, advanced inverter technology, and {project.features.some(f => f.toLowerCase().includes('battery') || f.toLowerCase().includes('storage')) ? 'robust battery storage' : 'grid-tie capabilities'} to ensure maximum efficiency and reliability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="space-y-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">System Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mr-3" />
                    <span>24/7 Reliable Power Supply</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <TrendingDown className="w-5 h-5 text-green-600 mr-3" />
                    <span>Up to 90% Reduction in Energy Bills</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Battery className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Zero Emissions, Clean Energy</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="w-5 h-5 text-purple-600 mr-3" />
                    <span>25-Year Performance Warranty</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Results & Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Measuring success through savings, sustainability, and satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-4">{formatPrice(project.savings * 10)}</div>
              <h3 className="text-xl font-bold mb-2">10-Year Savings</h3>
              <p className="text-blue-100">Projected cumulative savings over the next decade</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-5xl font-bold text-green-400 mb-4">{parseFloat(project.co2Offset) * 10} tons</div>
              <h3 className="text-xl font-bold mb-2">CO₂ Reduction</h3>
              <p className="text-blue-100">Total carbon emissions prevented over 10 years</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-5xl font-bold text-cyan-400 mb-4">100%</div>
              <h3 className="text-xl font-bold mb-2">Client Satisfaction</h3>
              <p className="text-blue-100">Happy with their decision to go solar with Voltis Energy</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready for Your Solar Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us design a custom solar solution for your property. Get started with a free consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/calculator">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Build Your System
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Get Free Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCaseStudy;

