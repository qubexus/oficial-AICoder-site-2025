import React, { useState, useEffect } from 'react';
import LogoFull from './LogoFull';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleMobileNav = (path: string) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 bg-slate-900/70 backdrop-blur-xl border-b border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
        <div className="content-wrapper h-24 flex justify-between items-center">
          {/* Logo on the left */}
          <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} aria-label="AICoder Home">
            <LogoFull />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-end items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base xl:text-lg">
            <a href="#/academy" onClick={(e) => { e.preventDefault(); onNavigate('/academy'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Academy</a>
            <a href="#/about-us" onClick={(e) => { e.preventDefault(); onNavigate('/about-us'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">About Us</a>
            <a href="#/team" onClick={(e) => { e.preventDefault(); onNavigate('/team'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Team</a>
            <a href="#/faq" onClick={(e) => { e.preventDefault(); onNavigate('/faq'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">FAQ</a>
            <a href="#/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Contact</a>
            <div className="w-px h-5 bg-[#2A3B57]"></div>
            <div className="flex items-center gap-1.5">
              <button className="font-bold text-[#E2E8F0]">EN</button>
              <span className="text-[#94A3B8]">/</span>
              <button className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-300">PL</button>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="text-slate-300 hover:text-[#F97316] transition-colors"
              aria-label="Open navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end p-6 absolute top-2 right-2">
           <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-slate-300 hover:text-[#F97316] transition-colors"
              aria-label="Close navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <a href="#/academy" onClick={(e) => { e.preventDefault(); handleMobileNav('/academy'); }} className="text-3xl text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Academy</a>
          <a href="#/about-us" onClick={(e) => { e.preventDefault(); handleMobileNav('/about-us'); }} className="text-3xl text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">About Us</a>
          <a href="#/team" onClick={(e) => { e.preventDefault(); handleMobileNav('/team'); }} className="text-3xl text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Team</a>
          <a href="#/faq" onClick={(e) => { e.preventDefault(); handleMobileNav('/faq'); }} className="text-3xl text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">FAQ</a>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); handleMobileNav('/contact'); }} className="text-3xl text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Contact</a>
          <div className="pt-4">
             <div className="flex items-center gap-3 text-xl">
                <button className="font-bold text-[#E2E8F0]">EN</button>
                <span className="text-[#94A3B8]">/</span>
                <button className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-300">PL</button>
             </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default React.memo(Header);
