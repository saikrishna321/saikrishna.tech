import { motion } from 'framer-motion';
import React from 'react';
import heroImage from '../../assets/images/SaiProdile.webp';
import testMuAiLogo from '../../assets/images/testmuai-logo.svg';
import { SOCIAL_LINKS } from '../../portfolio/constants';
import ParticleField from './ParticleField';

interface HeroProps {
    onGetInTouch: () => void;
    onNavigateToBook?: () => void;
}

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

const Hero: React.FC<HeroProps> = ({ onGetInTouch, onNavigateToBook }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className="w-full min-h-screen flex items-center justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ParticleField />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-24 md:py-0">
        {/* Main content: two columns */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left column: Profile + socials */}
          <motion.div className="flex-shrink-0 flex flex-col items-center" variants={itemVariants}>
            {/* Profile image with animated gradient border */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Animated gradient border */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-primary/50 via-primary/10 to-primary/30 overflow-hidden">
                {/* Spinning highlight on the border */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(253,186,174,0.4), transparent, transparent)',
                    animation: 'spin 6s linear infinite',
                  }}
                />

                {/* Image container */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[14px] overflow-hidden bg-page">
                  <img
                    src={heroImage}
                    alt="Sai Krishna"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: '50% 30%' }}
                  />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-page/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Corner accent dots */}
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-primary/40 blur-[2px]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 rounded-full bg-primary/30 blur-[2px]" />
            </div>

            {/* Inline social links */}
            <motion.div className="flex items-center gap-4 mt-5" variants={itemVariants}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-light/40 hover:text-primary transition-colors duration-300">
                <GithubIcon />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-light/40 hover:text-primary transition-colors duration-300">
                <LinkedinIcon />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-light/40 hover:text-primary transition-colors duration-300">
                <TwitterIcon />
              </a>
              <span className="w-8 h-px bg-light/20" />
              <a href={SOCIAL_LINKS.email} className="text-light/40 hover:text-primary text-xs font-mono transition-colors duration-300">
                saidotkrishna@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: Text content */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <motion.p variants={itemVariants} className="text-primary/60 font-mono text-xs tracking-[0.2em] uppercase">
              Hi, my name is
            </motion.p>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-light mt-3 leading-tight">
              Sai <span className="text-primary">Krishna.</span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-semibold text-light/40 mt-2">
              Director of Engineering
            </motion.h2>

            <motion.div variants={itemVariants} className="mt-3 flex items-center gap-2.5 justify-center lg:justify-start">
              <span className="text-sm text-light/30">at</span>
              <img src={testMuAiLogo} alt="TestMu AI Logo" className="h-7 md:h-8" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {['Author', 'Speaker', 'Appium Core Contributor'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-light/10 bg-light/5 text-light/60 text-xs font-mono tracking-wide">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="mt-5 text-sm leading-relaxed text-light/35 max-w-md text-center lg:text-left mx-auto lg:mx-0">
              Building cloud testing infrastructure serving <span className="text-light/60">millions of developers</span>. Published by <span className="text-light/60">Apress</span>. <span className="text-light/60">50+</span> conference talks worldwide.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-page rounded-lg font-mono text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
              <motion.button
                onClick={onNavigateToBook}
                className="px-6 py-3 border border-light/15 text-light/70 rounded-lg font-mono text-sm font-medium transition-all duration-300 hover:border-primary/40 hover:text-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Read My Book &rarr;
              </motion.button>
            </motion.div>

            {/* Book promo card */}
            <motion.button
              onClick={onNavigateToBook}
              className="mt-8 w-full max-w-lg mx-auto lg:mx-0 rounded-2xl p-5 flex items-center gap-5 cursor-pointer group text-left border border-primary/15 bg-primary/[0.03] hover:border-primary/30 hover:bg-primary/[0.06] transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <img
                src="https://m.media-amazon.com/images/I/6149pp1A6-L._SY425_.jpg"
                alt="Appium Insights"
                className="w-20 h-[104px] rounded-lg shadow-xl object-cover flex-shrink-0 border border-primary/10"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-block bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5">
                  New Book
                </span>
                <h4 className="text-light font-bold text-lg">Appium Insights</h4>
                <p className="text-light/40 text-sm mt-0.5">Strategies for Successful Mobile Automation</p>
                <p className="text-primary text-xs font-mono mt-2 group-hover:underline">
                  Learn More &rarr;
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
