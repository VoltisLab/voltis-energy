'use client';
import { motion, useInView } from 'framer-motion';
import { MapPin, Zap, TrendingDown, Calendar, Award } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';

const ProjectsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { formatPrice } = useLocation();

  const projects = [
    {
      title: 'Okonkwo Family Home',
      location: 'Lagos, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '6.5 kW',
      panels: '16 x 400W panels',
      date: 'March 2024',
      savings: 1200,
      co2Offset: '3.2 tons/year',
      description: 'Complete home solar installation with battery storage, eliminating power outages and providing 24/7 reliable electricity for this Lagos family.',
      features: ['Deye inverter', 'Lithium battery bank', 'Smart monitoring', 'Off-grid capability'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'AfriTech Hub',
      location: 'Cape Town, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '45 kW',
      panels: '100 x 450W panels',
      date: 'January 2024',
      savings: 8500,
      co2Offset: '22 tons/year',
      description: 'Large-scale commercial installation powering a tech startup hub, demonstrating how African innovation runs on clean energy.',
      features: ['Victron inverters', 'Real-time monitoring', 'Grid-tie system', 'Net metering'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      title: 'Mensah Residence',
      location: 'Accra, Ghana 🇬🇭',
      type: 'Residential + Storage',
      systemSize: '8 kW',
      panels: '20 x 400W panels',
      date: 'December 2023',
      savings: 1800,
      co2Offset: '4.5 tons/year',
      description: 'Premium hybrid solar system with battery backup, ensuring this Accra home never experiences power interruptions.',
      features: ['JA Solar panels', 'Tubular batteries', '24/7 backup power', 'Mobile monitoring app'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Shoprite Distribution Center',
      location: 'Johannesburg, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '75 kW',
      panels: '167 x 450W panels',
      date: 'November 2023',
      savings: 14000,
      co2Offset: '38 tons/year',
      description: 'Major retail installation drastically reducing operational costs and showcasing corporate environmental leadership.',
      features: ['SolarEdge optimizers', 'Cloud monitoring', 'Load shedding protection', 'Dual inverters'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Adeyemi Villa',
      location: 'Abuja, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '10 kW',
      panels: '24 x 415W panels',
      date: 'October 2023',
      savings: 1650,
      co2Offset: '5.2 tons/year',
      description: 'Luxury home installation providing complete energy independence and eliminating reliance on unreliable grid power.',
      features: ['LONGi Solar panels', 'Growatt inverter', 'App monitoring', 'Hybrid operation'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Ashesi University',
      location: 'Berekuso, Ghana 🇬🇭',
      type: 'Educational',
      systemSize: '100 kW',
      panels: '222 x 450W panels',
      date: 'September 2023',
      savings: 18500,
      co2Offset: '52 tons/year',
      description: 'Educational facility solar project, teaching the next generation of African leaders about renewable energy while powering their campus.',
      features: ['Canadian Solar panels', 'SMA inverters', 'Student monitoring access', 'Educational dashboard'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Nwankwo Duplex',
      location: 'Port Harcourt, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '7.2 kW',
      panels: '18 x 400W panels',
      date: 'August 2023',
      savings: 1350,
      co2Offset: '3.8 tons/year',
      description: 'Modern duplex installation with hybrid system, reducing generator dependency by 90%.',
      features: ['Jinko panels', 'Deye hybrid inverter', 'Lithium batteries', 'Remote monitoring'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Mbatha Farm',
      location: 'KwaZulu-Natal, South Africa 🇿🇦',
      type: 'Agricultural',
      systemSize: '30 kW',
      panels: '72 x 415W panels',
      date: 'July 2023',
      savings: 5800,
      co2Offset: '16 tons/year',
      description: 'Agricultural installation powering irrigation systems and dairy operations with clean energy.',
      features: ['Trina panels', 'Fronius inverter', 'Water pump integration', 'Off-grid operation'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Boateng Shopping Mall',
      location: 'Kumasi, Ghana 🇬🇭',
      type: 'Commercial',
      systemSize: '85 kW',
      panels: '189 x 450W panels',
      date: 'June 2023',
      savings: 16200,
      co2Offset: '45 tons/year',
      description: 'Large mall installation powering retail operations and reducing operational costs significantly.',
      features: ['LONGi panels', 'Growatt inverters', 'Peak shaving', 'Real-time analytics'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Eze Residence',
      location: 'Enugu, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '5.5 kW',
      panels: '14 x 395W panels',
      date: 'May 2023',
      savings: 980,
      co2Offset: '2.9 tons/year',
      description: 'Efficient system for medium-sized home, eliminating evening power cuts.',
      features: ['JA Solar panels', 'Victron inverter', 'Tubular batteries', 'Mobile app'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      title: 'Pretoria Medical Clinic',
      location: 'Pretoria, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '40 kW',
      panels: '89 x 450W panels',
      date: 'April 2023',
      savings: 7800,
      co2Offset: '21 tons/year',
      description: 'Critical healthcare facility with battery backup ensuring uninterrupted medical services.',
      features: ['SunPower panels', 'SMA inverters', 'Hospital-grade UPS', 'Backup power'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      title: 'Kofi Estate',
      location: 'Tema, Ghana 🇬🇭',
      type: 'Residential',
      systemSize: '9 kW',
      panels: '22 x 410W panels',
      date: 'March 2023',
      savings: 1620,
      co2Offset: '4.7 tons/year',
      description: 'Large family home with complete energy independence and smart home integration.',
      features: ['Canadian Solar', 'Deye inverter', 'Lithium storage', 'Smart automation'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Durban Hotel & Spa',
      location: 'Durban, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '120 kW',
      panels: '267 x 450W panels',
      date: 'February 2023',
      savings: 22500,
      co2Offset: '63 tons/year',
      description: 'Luxury hotel installation reducing energy costs while promoting eco-tourism.',
      features: ['Jinko panels', 'SolarEdge system', 'Pool heating', 'Guest monitoring display'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Olaleye Warehouse',
      location: 'Ibadan, Nigeria 🇳🇬',
      type: 'Industrial',
      systemSize: '95 kW',
      panels: '211 x 450W panels',
      date: 'January 2023',
      savings: 18200,
      co2Offset: '50 tons/year',
      description: 'Industrial warehouse with rooftop solar array powering logistics operations.',
      features: ['Trina panels', 'Growatt inverters', 'Load management', 'Industrial-grade system'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Asante Residence',
      location: 'Takoradi, Ghana 🇬🇭',
      type: 'Residential',
      systemSize: '6 kW',
      panels: '15 x 400W panels',
      date: 'December 2022',
      savings: 1100,
      co2Offset: '3.1 tons/year',
      description: 'Coastal home installation with corrosion-resistant components.',
      features: ['LONGi panels', 'Victron inverter', 'Salt-resistant coating', 'Weather monitoring'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Van der Merwe Poultry Farm',
      location: 'Free State, South Africa 🇿🇦',
      type: 'Agricultural',
      systemSize: '55 kW',
      panels: '122 x 450W panels',
      date: 'November 2022',
      savings: 10400,
      co2Offset: '29 tons/year',
      description: 'Large-scale poultry operation powered by solar, reducing operational costs.',
      features: ['Canadian Solar', 'Fronius inverters', 'Climate control power', 'Automated feeding'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Akinola Bakery',
      location: 'Kano, Nigeria 🇳🇬',
      type: 'Commercial',
      systemSize: '35 kW',
      panels: '78 x 450W panels',
      date: 'October 2022',
      savings: 6700,
      co2Offset: '18.5 tons/year',
      description: 'Bakery operation with solar reducing energy costs for ovens and refrigeration.',
      features: ['JA Solar panels', 'Deye inverter', 'Heavy load capacity', 'Oven power backup'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      title: 'Amponsah Villa',
      location: 'Cape Coast, Ghana 🇬🇭',
      type: 'Residential',
      systemSize: '7.8 kW',
      panels: '19 x 410W panels',
      date: 'September 2022',
      savings: 1420,
      co2Offset: '4.1 tons/year',
      description: 'Beachfront property with solar installation and smart energy management.',
      features: ['Trina panels', 'Growatt inverter', 'Smart meters', 'Cloud monitoring'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Sandton Office Complex',
      location: 'Sandton, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '150 kW',
      panels: '333 x 450W panels',
      date: 'August 2022',
      savings: 28500,
      co2Offset: '79 tons/year',
      description: 'Premium office building with extensive rooftop solar array.',
      features: ['SunPower panels', 'SolarEdge system', 'Tenant metering', 'Corporate dashboard'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Chukwu Family Compound',
      location: 'Owerri, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '8.5 kW',
      panels: '21 x 405W panels',
      date: 'July 2022',
      savings: 1550,
      co2Offset: '4.5 tons/year',
      description: 'Multi-family compound with centralized solar system serving three households.',
      features: ['LONGi panels', 'Victron inverter', 'Multi-unit metering', 'Shared battery bank'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Owusu Textile Factory',
      location: 'Accra, Ghana 🇬🇭',
      type: 'Industrial',
      systemSize: '110 kW',
      panels: '244 x 450W panels',
      date: 'June 2022',
      savings: 21000,
      co2Offset: '58 tons/year',
      description: 'Textile manufacturing facility with solar powering industrial machines.',
      features: ['Jinko panels', 'SMA inverters', 'Three-phase system', 'Load balancing'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Venter Vineyard',
      location: 'Western Cape, South Africa 🇿🇦',
      type: 'Agricultural',
      systemSize: '42 kW',
      panels: '93 x 450W panels',
      date: 'May 2022',
      savings: 8200,
      co2Offset: '22 tons/year',
      description: 'Wine estate with solar powering irrigation and cellar operations.',
      features: ['Canadian Solar', 'Fronius inverters', 'Irrigation pumps', 'Cellar cooling'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Bello Mosque & Community Center',
      location: 'Kaduna, Nigeria 🇳🇬',
      type: 'Community',
      systemSize: '25 kW',
      panels: '56 x 445W panels',
      date: 'April 2022',
      savings: 4800,
      co2Offset: '13 tons/year',
      description: 'Community center and mosque with solar providing reliable power for daily operations.',
      features: ['JA Solar panels', 'Deye inverter', 'Sound system power', 'LED lighting'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      title: 'Adjei Pharmacy Chain',
      location: 'Accra, Ghana 🇬🇭',
      type: 'Commercial',
      systemSize: '48 kW',
      panels: '107 x 450W panels',
      date: 'March 2022',
      savings: 9200,
      co2Offset: '25 tons/year',
      description: 'Multi-location pharmacy chain with solar ensuring medication refrigeration.',
      features: ['Trina panels', 'Growatt inverters', 'Refrigeration backup', 'Multi-site monitoring'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Botha Manufacturing',
      location: 'Port Elizabeth, South Africa 🇿🇦',
      type: 'Industrial',
      systemSize: '135 kW',
      panels: '300 x 450W panels',
      date: 'February 2022',
      savings: 25800,
      co2Offset: '71 tons/year',
      description: 'Large manufacturing plant with extensive solar array on factory roof.',
      features: ['LONGi panels', 'SolarEdge system', 'Industrial inverters', 'Power quality monitoring'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Babatunde Duplex',
      location: 'Benin City, Nigeria 🇳🇬',
      type: 'Residential',
      systemSize: '7 kW',
      panels: '17 x 410W panels',
      date: 'January 2022',
      savings: 1280,
      co2Offset: '3.7 tons/year',
      description: 'Modern duplex with solar and battery system eliminating generator use.',
      features: ['Canadian Solar', 'Victron inverter', 'Lithium batteries', 'Smart home ready'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Quansah Cold Storage',
      location: 'Tema, Ghana 🇬🇭',
      type: 'Commercial',
      systemSize: '90 kW',
      panels: '200 x 450W panels',
      date: 'December 2021',
      savings: 17200,
      co2Offset: '47 tons/year',
      description: 'Cold storage facility with solar reducing operational costs for refrigeration.',
      features: ['Jinko panels', 'SMA inverters', 'Cold storage optimization', '24/7 operation'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Mthembu Guest Lodge',
      location: 'Mpumalanga, South Africa 🇿🇦',
      type: 'Commercial',
      systemSize: '38 kW',
      panels: '84 x 450W panels',
      date: 'November 2021',
      savings: 7300,
      co2Offset: '20 tons/year',
      description: 'Safari lodge with off-grid solar system providing sustainable tourism experience.',
      features: ['SunPower panels', 'Victron system', 'Off-grid operation', 'Guest education display'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Uzoma Auto Workshop',
      location: 'Aba, Nigeria 🇳🇬',
      type: 'Commercial',
      systemSize: '28 kW',
      panels: '62 x 450W panels',
      date: 'October 2021',
      savings: 5400,
      co2Offset: '15 tons/year',
      description: 'Auto repair facility with solar powering tools and equipment.',
      features: ['Trina panels', 'Deye inverter', 'Heavy tool support', 'Workshop lighting'],
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      title: 'Ofori Cocoa Processing',
      location: 'Kumasi, Ghana 🇬🇭',
      type: 'Industrial',
      systemSize: '78 kW',
      panels: '173 x 450W panels',
      date: 'September 2021',
      savings: 14900,
      co2Offset: '41 tons/year',
      description: 'Cocoa processing plant with solar reducing production costs.',
      features: ['LONGi panels', 'Growatt inverters', 'Processing equipment power', 'Export quality'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Pienaar Dairy Farm',
      location: 'Eastern Cape, South Africa 🇿🇦',
      type: 'Agricultural',
      systemSize: '65 kW',
      panels: '144 x 450W panels',
      date: 'August 2021',
      savings: 12400,
      co2Offset: '34 tons/year',
      description: 'Dairy farm with solar powering milking equipment and cooling systems.',
      features: ['Canadian Solar', 'Fronius inverters', 'Dairy equipment', 'Milk cooling'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Adeleke Sports Complex',
      location: 'Lagos, Nigeria 🇳🇬',
      type: 'Community',
      systemSize: '52 kW',
      panels: '116 x 450W panels',
      date: 'July 2021',
      savings: 9900,
      co2Offset: '27 tons/year',
      description: 'Community sports facility with solar powering lighting and facilities.',
      features: ['JA Solar panels', 'SMA inverters', 'Stadium lighting', 'Community access'],
      image: 'https://images.unsplash.com/photo-1560858138-f083c6ce3b93?w=800&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Yeboah Printing Press',
      location: 'Accra, Ghana 🇬🇭',
      type: 'Industrial',
      systemSize: '44 kW',
      panels: '98 x 450W panels',
      date: 'June 2021',
      savings: 8400,
      co2Offset: '23 tons/year',
      description: 'Printing facility with solar powering presses and digital equipment.',
      features: ['Jinko panels', 'Victron inverters', 'Print equipment power', 'UPS integration'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'De Villiers Estate',
      location: 'Stellenbosch, South Africa 🇿🇦',
      type: 'Residential',
      systemSize: '11 kW',
      panels: '27 x 410W panels',
      date: 'May 2021',
      savings: 2100,
      co2Offset: '5.8 tons/year',
      description: 'Luxury estate with premium solar installation and full battery backup.',
      features: ['SunPower panels', 'Tesla Powerwall', 'Smart home integration', 'Pool heating'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Okafor Medical Centre',
      location: 'Anambra, Nigeria 🇳🇬',
      type: 'Commercial',
      systemSize: '32 kW',
      panels: '71 x 450W panels',
      date: 'April 2021',
      savings: 6100,
      co2Offset: '17 tons/year',
      description: 'Healthcare facility with reliable solar backup for critical medical equipment.',
      features: ['LONGi panels', 'Deye inverter', 'Medical-grade UPS', 'Emergency backup'],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
      gradient: 'from-cyan-500 to-teal-600'
    }
  ];

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

                  <div className={`inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-semibold text-lg`}>
                    View Case Study →
                  </div>
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

