'use client';
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const companyLinks = [
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Products', href: '/products' },
    { title: 'Projects', href: '/projects' }
  ];

  const resourceLinks = [
    { title: 'Calculator', href: '/calculator' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Resources', href: '/resources' },
    { title: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold">Voltis Energy</span>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Leading the renewable energy revolution. Powering homes and businesses with clean, sustainable solar energy.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-blue-100 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-blue-100 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact Us</h4>        
            <p className="text-blue-100 mb-3">solar@voltisenergy.com</p>
            <p className="text-blue-100 mb-4">0800 123 4567</p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} Voltis Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

