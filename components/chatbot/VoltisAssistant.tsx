'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Zap } from 'lucide-react';
import Image from 'next/image';
import { useLocation } from '@/contexts/LocationContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Knowledge base for intelligent responses
const knowledgeBase = {
  // Greetings
  greetings: {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
    responses: [
      "Hello! I'm your Voltis Energy assistant. How can I help you power your future today?",
      "Hi there! Welcome to Voltis Energy. What would you like to know about our solar solutions?",
      "Hey! Great to see you. I'm here to answer all your solar energy questions!"
    ]
  },

  // Pricing & Packages
  pricing: {
    keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable', 'budget', 'package', 'packages'],
    response: (currency: string) => `We offer 4 solar packages to fit every budget:\n\n📦 Voltis Basic (1-2 bedroom homes)\n   ${currency}700k - ${currency}1.5M\n\n📦 Voltis Standard (3-4 bedroom/small business)\n   ${currency}1.5M - ${currency}3M ⭐ MOST POPULAR\n\n📦 Voltis Premium (Offices/large homes)\n   ${currency}3M - ${currency}8M\n\n📦 Voltis Custom (Hotels/estates/farms)\n   Custom quote\n\nAll packages include installation, warranty, and aftercare! Would you like to build a custom system using our calculator?`
  },

  // Services
  services: {
    keywords: ['service', 'services', 'what do you do', 'offer', 'provide', 'installation', 'install'],
    response: "We provide comprehensive solar solutions:\n\n⚡ Residential Installation\n   Complete home solar systems\n\n🏢 Commercial Installation\n   Business & industrial solutions\n\n🔧 Maintenance & Repair\n   Keep your system running optimally\n\n🛡️ System Monitoring\n   Real-time performance tracking\n\n📊 Energy Consulting\n   Maximize your savings\n\nAll with professional installation and warranties!"
  },

  // Products
  products: {
    keywords: ['product', 'products', 'panel', 'panels', 'inverter', 'inverters', 'battery', 'batteries', 'buy'],
    response: "We offer premium solar components:\n\n☀️ Solar Panels\n   JA Solar, LONGi, Jinko, Trina, Canadian Solar, SunPower\n   (550W-600W)\n\n⚡ Inverters\n   Deye, Victron, Growatt, SolarEdge\n   (3.6kW-10kW)\n\n🔋 Batteries\n   Lithium-ion & Tubular options\n   (100Ah-200Ah)\n\n🔌 Accessories\n   Cables, mounting systems, charge controllers, monitoring\n\nAll products are imported from leading international manufacturers. Visit our Products page to browse!"
  },

  // Calculator/System Builder
  calculator: {
    keywords: ['calculator', 'build', 'configure', 'design', 'custom', 'inverter', 'kva', 'watts'],
    response: "Use our Build an Inverter tool to design your perfect solar system!\n\nYou can customize:\n\n✅ Property type (residential/commercial)\n✅ Appliances & power needs\n✅ Solar panel brand & quantity\n✅ Battery type & storage capacity\n✅ Inverter configuration\n✅ Grid type (off-grid/hybrid)\n\nGet instant cost estimates and savings projections. Want me to guide you there?"
  },

  // Savings & ROI
  savings: {
    keywords: ['save', 'savings', 'roi', 'return', 'payback', 'investment', 'worth it'],
    response: "Solar is a smart investment! 💰\n\n📈 Typical ROI\n   6-10 year payback period\n\n💵 25-year savings\n   Often exceed £20,000+\n\n⚡ Energy independence\n   Free electricity after payback\n\n📉 Bill reduction\n   50-100% depending on system\n\nYour exact savings depend on your energy usage, system size, and location. Use our calculator for personalized estimates!"
  },

  // Installation & Process
  installation: {
    keywords: ['install', 'installation', 'process', 'how long', 'time', 'steps', 'procedure'],
    response: "Our installation process is simple:\n\n1️⃣ Free Consultation\n   We assess your needs\n\n2️⃣ Site Survey\n   Technical evaluation\n\n3️⃣ Custom Design\n   Tailored system proposal\n\n4️⃣ Professional Installation\n   Expert team (1-3 days)\n\n5️⃣ System Activation\n   Testing & handover\n\n6️⃣ Ongoing Support\n   Monitoring & maintenance\n\nTypical installation takes 1-3 days depending on system size!"
  },

  // Warranty & Support
  warranty: {
    keywords: ['warranty', 'guarantee', 'support', 'maintenance', 'repair', 'help', 'service'],
    response: "We stand behind our work! 🛡️\n\n✅ 25-year panel warranty\n   Manufacturer backed\n\n✅ 2-year installation warranty\n   Our workmanship\n\n✅ 10-year inverter warranty\n   Premium brands\n\n✅ Free monitoring system\n   Track performance 24/7\n\n✅ Maintenance packages\n   Keep running optimally\n\nWe're here for the long haul - your partner in clean energy!"
  },

  // Locations & Coverage
  locations: {
    keywords: ['location', 'where', 'country', 'countries', 'area', 'region', 'coverage'],
    response: "We proudly serve 4 countries:\n\n🇬🇧 United Kingdom\n🇿🇦 South Africa\n🇬🇭 Ghana\n🇳🇬 Nigeria\n\nPricing automatically converts to your local currency. Use the location selector at the top right to switch regions!"
  },

  // Projects/Portfolio
  projects: {
    keywords: ['project', 'projects', 'portfolio', 'examples', 'previous work', 'past work', 'gallery'],
    response: "We've completed 150+ successful installations!\n\n🏡 Residential homes\n   2kW to 15kW systems\n\n🏢 Commercial buildings\n   Up to 100kW\n\n🏭 Industrial facilities\n   Custom solutions\n\nCheck our Projects page to see real installations with detailed specs, costs, and annual savings. Every project showcases our commitment to quality!"
  },

  // Contact & Quote
  contact: {
    keywords: ['contact', 'call', 'email', 'phone', 'reach', 'quote', 'consultation', 'talk', 'speak'],
    response: "Ready to get started? Let's connect! 📞\n\n📧 Email\n   solar@voltisenergy.com\n\n📞 Phone\n   0800 123 4567\n\n💬 Free Consultation\n   Schedule a no-obligation consultation\n\n📋 Get Quote\n   Use our contact form for detailed quotes\n\nWe typically respond within 24 hours. Looking forward to powering your future!"
  },

  // FAQ
  faq: {
    keywords: ['faq', 'question', 'questions', 'common', 'frequently asked', 'help'],
    response: "Got questions? We've got answers! 🤔\n\nOur FAQ covers:\n\n• Solar basics & how it works\n• Cost & financing options\n• Performance & savings\n• Installation & maintenance\n• Technical specifications\n\nVisit our FAQ page for detailed answers, or ask me anything specific!"
  },

  // Technology & How Solar Works
  technology: {
    keywords: ['how does', 'work', 'technology', 'solar', 'photovoltaic', 'energy', 'power'],
    response: "Solar is brilliant technology! ☀️\n\n1. Solar panels capture sunlight\n2. Convert to DC electricity via photovoltaic cells\n3. Inverter converts DC to usable AC power\n4. Battery storage (optional) stores excess energy\n5. Power your home/business with clean energy\n6. Excess to grid (hybrid systems) earns you credits\n\nIt's clean, reliable, and proven technology that's been improving for decades!"
  },

  // Battery & Storage
  battery: {
    keywords: ['battery', 'storage', 'lithium', 'tubular', 'backup', 'store'],
    response: "Battery storage gives you energy independence! 🔋\n\nLithium-ion (Premium)\n✅ 10+ year lifespan\n✅ 80-95% efficiency\n✅ Lightweight & compact\n✅ Best performance\n\nTubular Lead-Acid (Budget)\n✅ 5-7 year lifespan\n✅ 70-80% efficiency\n✅ Lower upfront cost\n✅ Proven technology\n\nStorage size depends on your power needs and desired backup time. Our calculator helps you find the perfect balance!"
  },

  // Commercial
  commercial: {
    keywords: ['business', 'commercial', 'office', 'company', 'industrial', 'factory'],
    response: "Solar makes business sense! 💼\n\nBenefits:\n📉 Reduce operating costs\n🌱 Corporate sustainability goals\n💰 Tax incentives & depreciation\n⚡ Energy independence\n📊 Predictable energy costs\n\nWe handle systems from small offices to large industrial facilities.\n\nOur commercial packages include:\n• Custom system design\n• ROI analysis\n• Generator integration\n• Remote monitoring\n• Maintenance contracts\n\nLet's discuss your business needs!"
  },

  // Default fallback
  default: {
    response: "I'm here to help with all things Voltis Energy! I can answer questions about:\n\n⚡ **Solar packages & pricing**\n🔧 **Products & services**\n📊 **System design & calculator**\n💰 **Savings & ROI**\n📍 **Locations & coverage**\n🛠️ **Installation process**\n🛡️ **Warranties & support**\n\nWhat would you like to know more about?"
  }
};

export default function VoltisAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hi! I'm your Voltis Energy assistant. I can help you with solar packages, pricing, products, system design, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currencySymbol, country } = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const findBestResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check each knowledge category
    for (const [key, category] of Object.entries(knowledgeBase)) {
      if (key === 'default') continue;
      
      const keywords = 'keywords' in category ? category.keywords : [];
      const hasMatch = keywords.some(keyword => lowerQuery.includes(keyword));
      
      if (hasMatch) {
        const response = 'response' in category ? category.response : '';
        
        // Handle dynamic responses (like pricing)
        if (typeof response === 'function') {
          return response(currencySymbol);
        }
        
        // Handle array responses (like greetings)
        if (Array.isArray(response)) {
          return response[Math.floor(Math.random() * response.length)];
        }
        
        return response as string;
      }
    }
    
    // Default response
    return knowledgeBase.default.response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Find best response
    const responseContent = findBestResponse(inputValue);
    
    // Calculate delay based on response length (100-300ms per 100 characters)
    const baseDelay = 1500; // Minimum 1.5 seconds
    const lengthDelay = Math.floor(responseContent.length / 100) * 300;
    const totalDelay = Math.min(baseDelay + lengthDelay, 4000); // Max 4 seconds

    // Simulate thinking
    await new Promise(resolve => setTimeout(resolve, totalDelay));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date()
    };

    setIsThinking(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/voltis-logo.svg" 
                    alt="Voltis Energy" 
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Voltis Assistant</h3>
                  <p className="text-xs text-blue-100">Online • Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-600">Voltis Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Thinking Animation */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">Voltis Assistant</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about solar..."
                  disabled={isThinking}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isThinking}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

