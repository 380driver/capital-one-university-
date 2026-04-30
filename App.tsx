import React, { useState, useEffect, Suspense } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { Logo } from './components/ui/Logo';
import { Hero } from './components/sections/Hero';
import { ContentDisplay } from './components/sections/ContentDisplay';
import { Timeline } from './components/sections/Timeline';
import { ComparisonSlider } from './components/ui/ComparisonSlider';
import { PerspectiveToggle } from './components/ui/PerspectiveToggle';
import { PerspectiveProvider } from './context/PerspectiveContext';
import { CONTENT_SECTIONS, NAV_ITEMS } from './constants';
import { GraduationCap } from 'lucide-react';
import { Navbar } from './components/ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { LoadingFallback } from './components/ui/LoadingFallback';
import { ScrollToTopButton } from './components/ui/ScrollToTop';

// Lazy load heavy/below-fold components
const EnoAssistant = React.lazy(() => import('./components/lazy/LazyEnoAssistant'));
const RiskAssessment = React.lazy(() => import('./components/lazy/LazyRiskAssessment'));
const QuizSection = React.lazy(() => import('./components/lazy/LazyQuizSection'));
const PolicySimulator = React.lazy(() => import('./components/lazy/LazyPolicySimulator'));
const TransformationSection = React.lazy(() => import('./components/lazy/LazyTransformationSection'));
const HackerTerminal = React.lazy(() => import('./components/lazy/LazyHackerTerminal'));
const StockChart = React.lazy(() => import('./components/lazy/LazyStockChart'));
const CreditScoreSimulator = React.lazy(() => import('./components/lazy/LazyCreditScoreSimulator'));
const CloudTechStack = React.lazy(() => import('./components/lazy/LazyCloudTechStack'));

const App = () => {
  return (
    <ThemeProvider>
      <PerspectiveProvider>
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:bg-gradient-to-br dark:from-[#020617] dark:via-slate-900 dark:to-[#020617] text-slate-900 dark:text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
          {/* 3D Background Layer */}
          <BackgroundScene />

          {/* Top Info Bar */}
          <div className="fixed top-0 left-0 right-0 z-[60] bg-white/75 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-700 dark:text-slate-300 transition-colors duration-300 shadow-sm dark:shadow-cyan-500/5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-cyan-600 dark:text-cyan-500" />
              <span className="hidden md:inline text-slate-700 dark:text-slate-300">University of Coventry - </span>The Knowledge Hub
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">Mohamed Ahmed Farid Moaaz</span>
              <span className="w-[1px] h-3 bg-slate-300 dark:bg-slate-700"></span>
              <span className="text-slate-600 dark:text-slate-400">Module: <span className="text-red-600 dark:text-[#D03027]">KH5022FIN</span></span>
            </div>
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-20">
            <Hero />
            <div className="relative">
              {/* Connecting Line with glow */}
              <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block z-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

              {/* Comparison Slider */}
              <ComparisonSlider />

              {CONTENT_SECTIONS.map((section, index) => (
                section.id === 'explanation' ? (
                  <Timeline key={section.id} />
                ) : (
                  <ContentDisplay key={section.id} data={section} index={index} />
                )
              ))}

              {/* Policy Simulator */}
              <Suspense fallback={<LoadingFallback />}>
                <PolicySimulator />
              </Suspense>

              {/* Digital Transformation 3D Section */}
              <Suspense fallback={<LoadingFallback />}>
                <TransformationSection />
              </Suspense>

              {/* Hacker Terminal */}
              <Suspense fallback={<LoadingFallback />}>
                <HackerTerminal />
              </Suspense>

              {/* Stock Chart */}
              <Suspense fallback={<LoadingFallback />}>
                <StockChart />
              </Suspense>

              {/* Cloud Tech Stack */}
              <Suspense fallback={<LoadingFallback />}>
                <CloudTechStack />
              </Suspense>

              {/* Risk Assessment Section */}
              <Suspense fallback={<LoadingFallback />}>
                <RiskAssessment />
              </Suspense>

              {/* Credit Score Simulator */}
              <Suspense fallback={<LoadingFallback />}>
                <CreditScoreSimulator />
              </Suspense>
            </div>

            {/* Quiz Section */}
            <Suspense fallback={<LoadingFallback />}>
              <QuizSection />
            </Suspense>
          </main>

          {/* Footer */}
          <footer className="relative z-10 bg-slate-100 dark:bg-slate-950 border-t border-slate-300 dark:border-slate-800 py-12 mt-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-8 text-center">
              <p className="text-slate-700 dark:text-slate-400 mb-4 uppercase tracking-widest font-bold text-xs">
                Digital Transformation Case Study
              </p>
              <p className="text-slate-600 dark:text-slate-500 text-sm">
                &copy; 2025 Mohamed Ahmed Farid Moaaz. All Rights Reserved.
              </p>
            </div>
          </footer>

          {/* Eno AI Assistant */}
          <Suspense fallback={null}>
            <EnoAssistant />
          </Suspense>

          {/* Perspective Toggle */}
          <PerspectiveToggle />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Scroll to Top Button */}
          <ScrollToTopButton />
        </div>
      </PerspectiveProvider>
    </ThemeProvider>
  );
};

export default App;
