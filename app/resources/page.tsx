'use client';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  const blogPosts = [
    {
      title: 'The Complete Guide to Solar Panel Installation in 2024',
      excerpt: 'Everything you need to know about installing solar panels on your home, from planning to activation.',
      author: 'Sarah Thompson',
      date: 'October 15, 2024',
      category: 'Installation',
      readTime: '8 min read',
    },
    {
      title: 'How Much Money Can You Really Save with Solar?',
      excerpt: 'A detailed breakdown of solar savings, including real-world examples from UK homeowners.',
      author: 'Michael Chen',
      date: 'October 10, 2024',
      category: 'Savings',
      readTime: '6 min read',
    },
    {
      title: 'Solar Panel Technology: Monocrystalline vs Polycrystalline',
      excerpt: 'Understanding the differences between panel types and which is right for your home.',
      author: 'Emma Davies',
      date: 'October 5, 2024',
      category: 'Technology',
      readTime: '5 min read',
    },
    {
      title: 'Battery Storage 101: Is It Worth the Investment?',
      excerpt: 'Exploring the benefits and costs of adding battery storage to your solar system.',
      author: 'James O\'Connor',
      date: 'September 28, 2024',
      category: 'Storage',
      readTime: '7 min read',
    },
    {
      title: 'UK Solar Incentives and Rebates Guide 2024',
      excerpt: 'Navigate the Smart Export Guarantee, VAT reductions, and other government incentives.',
      author: 'Sarah Thompson',
      date: 'September 20, 2024',
      category: 'Incentives',
      readTime: '9 min read',
    },
    {
      title: 'Maintaining Your Solar Panels: Best Practices',
      excerpt: 'Simple maintenance tips to keep your solar system performing at peak efficiency.',
      author: 'Michael Chen',
      date: 'September 15, 2024',
      category: 'Maintenance',
      readTime: '4 min read',
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6">
              <BookOpen className="w-10 h-10 text-blue-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solar Energy Resources
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Expert insights, guides, and the latest news in solar technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>

                <div className="p-6">
                  <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    {post.category}
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <span className="text-blue-600 font-semibold flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and custom quote for your property
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                Get Free Quote
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

