import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Infrastructure from './pages/Infrastructure';
import Pentest from './pages/Pentest';
import Audit from './pages/Audit';
import Integration from './pages/Integration';
import Contact from './pages/Contact';
import './index.css';

// Wrapper to handle AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/pentest" element={<Pentest />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 300px)' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
