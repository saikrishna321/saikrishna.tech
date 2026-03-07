import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


interface Section {
  id: string;
  name: string;
}

interface HeaderProps {
  sections: Section[];
  onNavigate: (id: string) => void;
  activeSectionId: string;
}

const Header: React.FC<HeaderProps> = ({ sections, onNavigate, activeSectionId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  // Track scroll for glass nav
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = sections.findIndex(s => s.id === activeSectionId);

      if (activeIndex !== -1 && navRef.current) {
        const activeNavItem = navItemsRef.current[activeIndex];
        if (activeNavItem) {
          const rect = activeNavItem.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          setIndicatorStyle({
            left: rect.left - navRect.left,
            width: rect.width,
          });
        }
      } else {
        setIndicatorStyle({ left: 0, width: 0 });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    requestAnimationFrame(updateIndicator);
    const timeout = setTimeout(updateIndicator, 100);

    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timeout);
    };
  }, [activeSectionId, sections]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  const topBarVariants = {
    open: { rotate: 45, y: 5 },
    closed: { rotate: 0, y: 0 },
  };
  const middleBarVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };
  const bottomBarVariants = {
    open: { rotate: -45, y: -5 },
    closed: { rotate: 0, y: 0 },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-20">
          <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-primary font-mono">SK</button>

          <nav className="hidden md:block">
            <ul ref={navRef} className="flex items-center space-x-8 relative">
              {sections.map((section, index) => (
                <li key={section.id} ref={el => { navItemsRef.current[index] = el; }}>
                  <motion.button
                    onClick={() => handleLinkClick(section.id)}
                    className={`nav-link text-base md:text-lg font-medium transition-colors duration-300 ${activeSectionId === section.id ? 'text-primary' : 'text-light hover:text-primary/80'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.name}
                  </motion.button>
                </li>
              ))}
               <motion.div
                className="absolute bottom-[-10px] h-0.5 bg-primary"
                initial={false}
                animate={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden z-[60] relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <div className="w-6 h-6 flex flex-col justify-around">
                  <motion.span
                    className="block w-full h-0.5 bg-primary origin-center"
                    variants={topBarVariants}
                    animate={isMenuOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="block w-full h-0.5 bg-primary"
                    variants={middleBarVariants}
                    animate={isMenuOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="block w-full h-0.5 bg-primary origin-center"
                    variants={bottomBarVariants}
                    animate={isMenuOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 mobile-menu-backdrop z-[90] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <motion.div
        className="fixed top-0 right-0 h-full w-3/4 max-w-sm mobile-menu-panel shadow-2xl z-[100] md:hidden overflow-y-auto"
        initial={false}
        animate={{
          x: isMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          <ul className="flex flex-col space-y-6">
            {sections.map((section, index) => (
              <li key={section.id}>
                <motion.button
                  onClick={() => handleLinkClick(section.id)}
                  className={`mobile-nav-link text-xl w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                    activeSectionId === section.id ? 'text-primary border-l-primary bg-primary/10' : 'text-light'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
