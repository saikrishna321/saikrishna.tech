import React from 'react';
import { motion } from 'framer-motion';
import { presentations } from '../../portfolio/presentations';
import AnimatedSection from './AnimatedSection';

const Presentations: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-light mb-8 flex items-center justify-center">
          Presentations
          <span className="ml-6 h-px w-32 bg-surface"></span>
        </h2>

        <p className="text-light/75 mb-8 max-w-2xl mx-auto text-center">
          Slide decks and presentations from conferences, meetups, and tech talks.
        </p>

        {presentations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((presentation, index) => (
              <motion.div
                key={presentation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={presentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card-hover rounded-lg overflow-hidden cursor-pointer h-full group"
                >
                  <div className="p-6 flex flex-col h-full">
                    {presentation.event && (
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono mb-3 inline-block w-fit">
                        {presentation.event}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-light mb-2 group-hover:text-primary transition-colors duration-300">
                      {presentation.title}
                    </h3>
                    {presentation.description && (
                      <p className="text-light/70 text-sm leading-relaxed flex-grow">
                        {presentation.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-mono">
                      <span>View presentation</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-light mb-2">No presentations yet</h3>
            <p className="text-light/75">Check back soon for slide decks and talks.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default Presentations;
