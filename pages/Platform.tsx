import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { Check, Layers, BarChart2, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { APP_URL } from '../constants';

export const Platform: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { title: "Advanced Charting", desc: "100+ technical indicators built-in.", icon: BarChart2 },
    { title: "Multi-Asset Support", desc: "Crypto, Forex, and Indices in one place.", icon: Layers },
    { title: "Mobile Optimized", desc: "Trade on the go with zero latency.", icon: Smartphone },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">{t.software.title}</h1>
            <h2 className="text-2xl text-brand-teal mb-6">{t.software.subtitle}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.software.description}
            </p>
            <div className="space-y-4 mb-10">
              {["Low latency execution", "Customizable workspaces", "Automated risk management"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <Check size={14} className="text-brand-teal" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            <a href={APP_URL}>
              <Button>Launch Platform</Button>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-teal to-brand-blue opacity-20 blur-2xl rounded-3xl" />
            <img 
              src="https://picsum.photos/800/600?grayscale&blur=2" 
              alt="Platform Interface" 
              className="relative rounded-xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5">
              <f.icon className="w-10 h-10 text-brand-blue mb-6" />
              <h3 className="font-heading font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};