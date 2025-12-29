import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { Button } from '../components/ui/Button';
import { APP_URL } from '../constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-transparent to-brand-darker" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-teal/30 bg-brand-teal/10">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-xs font-semibold text-brand-teal uppercase tracking-widest">DopTrading V2.0 Live</span>
            </motion.div>

            <motion.h1 
              variants={item}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
            >
              Master the Market<br />
              <span className="text-white">With Precision</span>
            </motion.h1>

            <motion.p 
              variants={item}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href={APP_URL}>
                <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
                  {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating UI Element Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-20 mx-auto max-w-5xl rounded-xl border border-white/10 bg-brand-gray/30 backdrop-blur-md shadow-2xl shadow-brand-blue/10 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <img 
              src="https://picsum.photos/1200/600?grayscale" 
              alt="Dashboard Preview" 
              className="w-full h-auto opacity-80"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-brand-darker relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">{t.features.title}</h2>
            <p className="text-gray-400 text-lg max-w-xl">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, idx) => {
               const Icons = { activity: Activity, cpu: Zap, shield: Shield };
               const Icon = Icons[feature.icon as keyof typeof Icons] || Activity;
               
               return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-teal/30 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-brand-teal w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Traders", value: "10K+" },
              { label: "Daily Volume", value: "$50M+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Support", value: "24/7" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-heading font-bold text-4xl md:text-5xl text-brand-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-teal/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-8">Ready to elevate your trading?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">Join thousands of professional traders using DopTrading to execute with precision.</p>
          <a href={APP_URL}>
            <Button variant="primary" className="mx-auto text-lg px-10 py-5 shadow-2xl shadow-brand-blue/20">
              Create Free Account
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
};