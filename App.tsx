import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Canonical URL Component wrapper
const CanonicalUrl = () => {
  // This could also be improved to use useLocation from router
  // to dynamically generate canonicals for sub-pages
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            {/* Fallback for 404 (optional) or redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;