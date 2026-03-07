import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const BOOK = {
  title: 'Appium Insights',
  subtitle: 'Strategies for Successful Mobile Automation',
  author: 'Sai Krishna',
  publisher: 'Apress',
  amazonUrl: 'https://www.amazon.in/Appium-Insights-Strategies-Successful-Automation/dp/B0FBRGBDBW',
  springerUrl: 'https://link.springer.com/book/10.1007/979-8-8688-1703-8',
  oreillyUrl: 'https://www.oreilly.com/library/view/appium-insights-strategies/9798868817038/',
  coverImage: 'https://m.media-amazon.com/images/I/6149pp1A6-L._SY425_.jpg',
};

const LEARNINGS = [
  'Master Appium architecture and understand how it communicates with devices',
  'Build robust test automation frameworks for Android and iOS platforms',
  'Implement advanced strategies for handling flaky tests and improving reliability',
  'Design scalable mobile testing infrastructure for CI/CD pipelines',
  'Apply real-world patterns for parallel execution and device farm integration',
];

const Book: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-light">
            The <span className="text-primary">Book</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* Book Cover */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ rotateY: -8, rotateX: 4, scale: 1.02 }}
            style={{ perspective: 800 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <img
                src={BOOK.coverImage}
                alt={BOOK.title}
                className="relative w-56 sm:w-64 rounded-lg shadow-2xl shadow-black/50 transition-shadow duration-300 hover:shadow-primary/20"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold text-light mb-4 leading-tight">
              {BOOK.title}
            </h3>
            <p className="text-lg text-light/60 mb-6 leading-relaxed max-w-xl">
              {BOOK.subtitle}
            </p>

            <div className="mb-6">
              <p className="text-light/70 text-sm">
                by <span className="text-light font-medium">{BOOK.author}</span>
              </p>
              <p className="text-light/50 text-sm mt-1">
                Published by <span className="text-light/70">{BOOK.publisher}</span>
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="glass-card-primary rounded-2xl p-6 mb-8">
              <h4 className="text-lg font-bold text-light mb-4">What You'll Learn</h4>
              <ul className="space-y-3">
                {LEARNINGS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-light/75 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href={BOOK.springerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/80 hover:bg-primary text-light px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Get on Springer
              </a>
              <a
                href={BOOK.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-light/90 px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Buy on Amazon
              </a>
              <a
                href={BOOK.oreillyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-light/90 px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Read on O'Reilly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Book;
