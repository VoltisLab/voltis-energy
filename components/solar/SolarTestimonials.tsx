'use client';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const SolarTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Chidinma Okonkwo',
      location: 'Lagos, Nigeria 🇳🇬',
      system: '6.5kW Residential System',
      image: '/landing/team/team1.png',
      rating: 5,
      text: 'Voltis Energy transformed our home! No more generator noise, no more fuel costs, just clean, silent power 24/7. Our electricity bills are now a fraction of what we used to pay. The installation was professional and they trained us on everything.',
      savings: '₦2.3M/year'
    },
    {
      name: 'Kwame Mensah',
      location: 'Accra, Ghana 🇬🇭',
      system: '12kW Commercial System',
      image: '/landing/team/team2.png',
      rating: 5,
      text: 'As a business owner dealing with frequent power cuts, solar was the best investment I ever made. My operations run smoothly now, and I\'m saving massively on diesel costs. Voltis Energy delivered beyond expectations - true professionals!',
      savings: '₵12,500/year'
    },
    {
      name: 'Thandi Nkosi',
      location: 'Johannesburg, South Africa 🇿🇦',
      system: '8kW with Battery Storage',
      image: '/landing/team/team3.png',
      rating: 5,
      text: 'Load shedding used to disrupt everything - work, cooking, even our kids\' homework. Since Voltis installed our solar + battery system, we don\'t even notice when the grid goes down. It\'s been life-changing for our family!',
      savings: 'R42,000/year'
    },
    {
      name: 'Adewale Ibrahim',
      location: 'Abuja, Nigeria 🇳🇬',
      system: '10kW Residential System',
      image: '/landing/team/team4.png',
      rating: 5,
      text: 'I was skeptical at first, but Voltis Energy proved solar works perfectly in Africa. Installation took just 3 days, and I\'ve had zero issues in 8 months. My neighbors are now asking for their contact! Highly recommend to every Nigerian homeowner.',
      savings: '₦3.2M/year'
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 transition-all duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-12 h-12 text-blue-200" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-xs text-blue-600 font-semibold mt-1">{testimonial.system}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{testimonial.savings}</div>
                  <div className="text-xs text-gray-500">Annual Savings</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {[
            { value: '120+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '25MW+', label: 'Total Capacity Installed' }
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolarTestimonials;

