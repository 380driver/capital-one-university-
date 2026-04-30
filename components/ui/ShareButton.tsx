import React from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialShare {
  platform: string;
  icon: string;
  url: string;
  color: string;
}

export const ShareButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = 'Digital Disruption & Banking Policies - Capital One University';

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: '𝕏',
      color: 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      color: 'hover:bg-blue-600 hover:text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'f',
      color: 'hover:bg-blue-500 hover:text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

              {/* Social Buttons */}
              <div className="flex gap-2">
                {socialPlatforms.map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare(platform.url)}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${platform.color} bg-slate-100 dark:bg-slate-800`}
                    aria-label={`Share on ${platform.name}`}
                    title={`Share on ${platform.name}`}
                  >
                    {platform.name}
                  </motion.button>
                ))}
              </div>

              {/* Copy Link */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-colors text-sm font-medium"
                aria-label="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
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
