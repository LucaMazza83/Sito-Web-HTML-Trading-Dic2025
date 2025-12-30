import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const StaticPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HashRouter>
    <div className="bg-[#050608] min-h-screen text-white font-sans selection:bg-brand-teal/30 selection:text-white flex flex-col">
      <Navbar />
      <main className="pt-32 pb-20 flex-grow">{children}</main>
      <Footer />
    </div>
  </HashRouter>
);
