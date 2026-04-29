import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalStyles, ScrollBar } from './components/Shared';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Talks from './pages/Talks';
import Presentations from './pages/Presentations';
import BridgingAI from './pages/BridgingAI';
import Writing from './pages/Writing';
import Book from './pages/Book';
import Workshops from './pages/Workshops';
import Videos from './pages/Videos';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollBar />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/presentations" element={<Presentations />} />
        <Route path="/presentations/bridging-ai" element={<BridgingAI />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/book" element={<Book />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
