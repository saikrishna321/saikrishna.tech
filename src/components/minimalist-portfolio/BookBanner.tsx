import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookBannerProps {
  onNavigateToBook: () => void;
  visible: boolean;
}

const BookBanner: React.FC<BookBannerProps> = ({ onNavigateToBook, visible }) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
          className="fixed top-20 left-0 right-0 z-40"
        >
          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(253,186,174,0.06)_50%,transparent_100%)] animate-shimmer bg-[length:200%_100%]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Content */}
            <div className="relative flex items-center justify-between gap-5 px-6 py-4 max-w-7xl mx-auto">
              <button
                onClick={onNavigateToBook}
                className="flex items-center gap-5 flex-1 min-w-0 cursor-pointer group"
              >
                <img
                  src="https://m.media-amazon.com/images/I/6149pp1A6-L._SY425_.jpg"
                  alt="Appium Insights"
                  className="w-12 h-16 rounded shadow-lg object-cover hidden sm:block border border-primary/20"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-wrap">
                  <span className="bg-primary text-black text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 w-fit">
                    New Book
                  </span>
                  <span className="text-light text-base font-semibold">
                    Appium Insights
                  </span>
                  <span className="text-light/50 text-sm hidden md:inline">
                    — Available on Springer, Amazon & O'Reilly
                  </span>
                </div>
                <span className="text-primary text-sm font-mono font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform hidden sm:inline ml-auto">
                  Get Your Copy &rarr;
                </span>
              </button>

              <button
                onClick={() => setDismissed(true)}
                className="text-light/40 hover:text-light/70 transition-colors shrink-0 p-1.5"
                aria-label="Dismiss banner"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookBanner;
