import React, { useState, useEffect, Suspense } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { Logo } from './components/ui/Logo';
import { Hero } from './components/sections/Hero';
import { ContentDisplay } from './components/sections/ContentDisplay';
import { Timeline } from './components/sections/Timeline';
import { ComparisonSlider } from './components/ui/ComparisonSlider';
import { PerspectiveProvider } from './context/PerspectiveContext';
import { CONTENT_SECTIONS, NAV_ITEMS } from './constants';
import { GraduationCap } from 'lucide-react';
import { Navbar } from './components/ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { LoadingFallback } from './components/ui/LoadingFallback';
import { ScrollToTopButton } from './components/ui/ScrollToTop';

const SHOWCASE_STATS = [
  {
    label: 'Data-Led Banking Since',
    value: 1994,
    suffix: '',
    note: 'Capital One launched with an information-based strategy.'
  },
  {
    label: 'Cloud Migration Milestone',
    value: 2015,
    suffix: '',
    note: 'First major U.S. bank to announce full public cloud migration.'
  },
  {
    label: 'AI Assistant Launch',
    value: 2017,
    suffix: '',
    note: 'Eno introduced proactive, always-on account support.'
  },
  {
    label: 'Fraud Monitoring Coverage',
    value: 24,
    suffix: '/7',
    note: 'Real-time alerts and anomaly detection for card activity.'
  }
];

const ExpoProblemHero = () => {
  const [values, setValues] = useState<number[]>(() => SHOWCASE_STATS.map(() => 0));

  useEffect(() => {
    let frameId = 0;
    const durationMs = 1800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(SHOWCASE_STATS.map((item) => Math.round(item.value * eased)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const qrTarget = encodeURIComponent('https://github.com/380driver/capital-one-university-');
  const qrSource = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${qrTarget}`;

  return (
    <section className="relative z-20 px-4 md:px-8 pt-8 md:pt-12 pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="rounded-3xl border border-cyan-300/40 dark:border-cyan-500/30 bg-gradient-to-r from-[#0f172a]/95 via-[#0b3b3c]/90 to-[#0f172a]/95 shadow-[0_20px_60px_rgba(15,23,42,0.5)] p-6 md:p-10"
        >
          <p className="font-mono uppercase tracking-[0.2em] text-cyan-300 text-xs md:text-sm mb-4">
            Expo Snapshot
          </p>
          <h1 className="font-['Space_Grotesk'] text-white font-bold leading-[1.05] text-3xl md:text-5xl lg:text-6xl max-w-5xl">
            How Capital One reduced fraud by X% while scaling digital banking at cloud speed.
          </h1>
          <p className="mt-4 text-slate-200/90 max-w-3xl text-sm md:text-base">
            A fast-read view for judges: the key milestones and operational signals that made the transformation measurable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
          {SHOWCASE_STATS.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
              className="rounded-2xl border border-slate-300/70 dark:border-slate-700 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md p-5 md:p-6 shadow-lg"
            >
              <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-400 min-h-[32px]">
                {stat.label}
              </p>
              <p className="mt-2 text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-none tabular-nums">
                {values[index].toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                {stat.note}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="md:fixed md:bottom-4 md:right-4 z-[70] mt-6 md:mt-0 w-fit ml-auto">
          <div className="bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-2xl backdrop-blur">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2 text-center">
              Scan Full Case
            </p>
            <img
              src={qrSource}
              alt="QR code linking to the full case study repository"
              className="w-24 h-24 md:w-28 md:h-28 rounded-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

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
            <ExpoProblemHero />
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
