import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  section: string;
  preview: string;
}

const searchableContent: SearchResult[] = [
  { id: '1', title: 'Digital Disruption Overview', section: 'Overview', preview: 'Exploring how digital technologies are transforming banking...' },
  { id: '2', title: 'Banking Evolution', section: 'Evolution', preview: 'The evolution of capital one and digital banking...' },
  { id: '3', title: 'Market Analysis', section: 'Analysis', preview: 'Comprehensive analysis of market trends and data...' },
  { id: '4', title: 'Future Predictions', section: 'Future', preview: 'What the future holds for digital banking...' },
  { id: '5', title: 'Risk Assessment Tools', section: 'Risk Lab', preview: 'Interactive risk assessment and simulation tools...' },
  { id: '6', title: 'Credit Score Simulator', section: 'Credit Sim', preview: 'Learn how credit scores work and improve yours...' },
  { id: '7', title: 'Policy Simulation', section: 'Analysis', preview: 'Simulate different banking policy scenarios...' },
  { id: '8', title: 'Cloud Technology Stack', section: 'Future', preview: 'Explore the cloud technologies powering modern banking...' },
];

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchableContent.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleResultClick = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        aria-label="Search content"
        title="Search (Ctrl+K)"
      >
        <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-96 max-w-[90vw] bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50"
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-slate-100"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsOpen(false);
                    }
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <ul>
                  {results.map((result, index) => (
                    <motion.li
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleResultClick(result.id)}
                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors"
                    >
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{result.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{result.section}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{result.preview}</div>
                    </motion.li>
                  ))}
                </ul>
              ) : searchTerm ? (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  Start typing to search content...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close search"
        />
      )}
    </div>
  );
};

export default SearchBar;
