import React from 'react';
import { useLanguage } from './LanguageContext';
import { Cpu, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-darker border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-teal/20 rounded-md flex items-center justify-center">
                   <Cpu className="text-brand-teal w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-lg text-white">DOP<span className="text-brand-teal">TRADING</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/#/platform" className="hover:text-brand-teal transition-colors">Software</a></li>
              <li><a href="/#/signals" className="hover:text-brand-teal transition-colors">Signals</a></li>
              <li><span className="text-gray-500 cursor-not-allowed">Pricing (Coming soon)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">API (Coming soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/#/academy" className="hover:text-brand-teal transition-colors">Academy</a></li>
              <li><span className="text-gray-500 cursor-not-allowed">Blog (Coming soon)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Help Center (Coming soon)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Status (Coming soon)</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="/privacy-policy/" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="/cookie-policy/" className="hover:text-white transition-colors">Cookie policy</a>
            <a href="/termini-e-condizioni/" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href="/disclaimer-trading/" className="hover:text-white transition-colors">Disclaimer trading</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
