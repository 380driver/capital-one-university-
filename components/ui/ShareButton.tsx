import React from 'react';
import { Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShareButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const linkedInProfileUrl = 'https://www.linkedin.com/in/mohamed-moaaz-b95493389/';

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        aria-label="Share this page"
        title="Share"
      >
        <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50 p-4"
          >
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Share this page</div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare(linkedInProfileUrl)}
                className="w-full py-2 px-3 rounded-lg font-semibold text-sm transition-colors bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white"
                aria-label="Open LinkedIn profile"
                title="Open LinkedIn profile"
              >
                LinkedIn
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close share menu"
        />
      )}
    </div>
  );
};

export default ShareButton;
