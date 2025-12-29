import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Users, ArrowRight } from 'lucide-react';

const guides = [
  { title: "Bitcoin Essentials", category: "Crypto Basics", readTime: "5 min" },
  { title: "Understanding Moving Averages", category: "Technical Analysis", readTime: "12 min" },
  { title: "Risk Management 101", category: "Psychology", readTime: "8 min" },
  { title: "Ethereum Smart Contracts", category: "Technology", readTime: "10 min" },
  { title: "Volume & Volatility", category: "Advanced", readTime: "15 min" },
  { title: "Choosing an Exchange", category: "Safety", readTime: "6 min" },
];

export const Academy: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">DopTrading Academy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From beginner to pro. Elevate your trading skills with our curated educational content.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { title: "Read Guides", icon: BookOpen, color: "text-brand-teal" },
            { title: "Video Tutorials", icon: Video, color: "text-brand-blue" },
            { title: "Community Webinars", icon: Users, color: "text-purple-400" },
          ].map((cat, i) => (
            <div key={i} className="bg-white/5 hover:bg-white/10 p-8 rounded-xl border border-white/5 transition-colors cursor-pointer group">
              <cat.icon className={`w-8 h-8 ${cat.color} mb-4`} />
              <h3 className="font-bold text-xl mb-2 text-white">{cat.title}</h3>
              <p className="text-gray-400 text-sm">Explore our library of free content.</p>
            </div>
          ))}
        </div>

        {/* Latest Guides Grid */}
        <h2 className="font-heading font-bold text-2xl mb-8 border-b border-white/10 pb-4">Latest Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-gray-800 rounded-xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-darker/50 group-hover:bg-transparent transition-all" />
                <img src={`https://picsum.photos/seed/${i+10}/600/400?grayscale`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt={guide.title} />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  {guide.category}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-brand-teal transition-colors">{guide.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{guide.readTime} read</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read <ArrowRight size={14}/></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};