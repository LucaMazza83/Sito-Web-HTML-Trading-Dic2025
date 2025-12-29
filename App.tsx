import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './components/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Platform } from './pages/Platform';
import { Academy } from './pages/Academy';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder components for other routes
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-5xl font-bold mb-4 text-brand-teal">{title}</h1>
    <p className="text-gray-400 max-w-md">This content is currently being updated for the new V2 platform launch.</p>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="bg-[#050608] min-h-screen text-white font-sans selection:bg-brand-teal/30 selection:text-white flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/platform" element={<Platform />} />
                <Route path="/signals" element={<PlaceholderPage title="Trading Signals" />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/blog" element={<PlaceholderPage title="Market News" />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;