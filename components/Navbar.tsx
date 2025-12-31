import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowUpRight, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Language } from '../types';
import { APP_URL } from '../constants';

export const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLanguage(language === Language.IT ? Language.EN : Language.IT);
  };

  const navLinks = [
    { label: t.nav.home, path: '/', href: '/#/' },
    { label: t.nav.platform, path: '/platform', href: '/#/platform' },
    { label: t.nav.signals, path: '/signals', href: '/#/signals' },
    { label: t.nav.academy, path: '/academy', href: '/#/academy' },
    { label: t.nav.blog, path: '/blog', disabled: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-darker/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/#/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-teal to-brand-blue rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
             <Cpu className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tight leading-none text-white">DOP<span className="text-brand-teal">TRADING</span></span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">Systems</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.disabled ? (
              <span
                key={link.path}
                className="text-sm font-medium text-gray-500 cursor-not-allowed"
              >
                {link.label} (Coming soon)
              </span>
            ) : (
              <a 
                key={link.path} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-teal ${location.pathname === link.path ? 'text-brand-teal' : 'text-gray-300'}`}
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase"
          >
            <Globe size={14} />
            {language}
          </button>
          
          <a
            href="/waitlist/"
            className="border border-brand-teal/40 text-brand-teal px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-teal/10 transition-all"
          >
            Waitlist
          </a>

          <a 
            href={APP_URL}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border border-white/10"
          >
            {t.nav.login}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-darker border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.disabled ? (
                  <span
                    key={link.path}
                    className="text-lg font-medium text-gray-500 cursor-not-allowed"
                  >
                    {link.label} (Coming soon)
                  </span>
                ) : (
                  <a 
                    key={link.path} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-200"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center justify-between">
                <button onClick={toggleLang} className="text-gray-400 flex items-center gap-2">
                  <Globe size={16} /> {language === 'IT' ? 'Italiano' : 'English'}
                </button>
                <div className="flex items-center gap-4">
                  <a
                    href="/waitlist/"
                    onClick={() => setIsOpen(false)}
                    className="text-brand-teal font-bold"
                  >
                    Waitlist
                  </a>
                  <a href={APP_URL} className="text-brand-teal font-bold flex items-center gap-2">
                    {t.nav.login} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
