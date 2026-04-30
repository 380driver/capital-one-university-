import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { ShareButton } from './ShareButton';
import { NAV_ITEMS } from '../../constants';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-[33px] md:top-[34px] left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-900/30 py-2 shadow-sm dark:shadow-[0_0_30px_rgba(0,72,121,0.3)]'
          : 'bg-transparent border-transparent py-4'
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative z-10">
          <div className="transform hover:scale-105 transition-transform duration-300 scale-90 origin-left">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative group px-2 py-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-colors uppercase tracking-widest"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#004879] to-[#D03027] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </button>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-2 ml-6 pl-6 border-l border-slate-200 dark:border-slate-700">
              <SearchBar />
              <ShareButton />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <SearchBar />
            <ShareButton />
            <button
              className="text-slate-800 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#020617] pt-32 px-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-3xl font-bold text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:tracking-wider transition-all duration-300 border-b border-slate-200 dark:border-slate-800/50 pb-4 w-full text-center"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
