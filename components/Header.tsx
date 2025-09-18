import React from 'react';
import LogoFull from './LogoFull';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-slate-900/70 backdrop-blur-xl border-b border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
      <div className="content-wrapper h-24 flex justify-between items-center">
        {/* Logo on the left */}
        <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} aria-label="AICoder Home">
          <LogoFull />
        </a>

        {/* Navigation on the right */}
        <nav className="flex justify-end items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base xl:text-lg">
          <a href="#/academy" onClick={(e) => { e.preventDefault(); onNavigate('/academy'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Academy</a>
          <a href="#/about-us" onClick={(e) => { e.preventDefault(); onNavigate('/about-us'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">About Us</a>
          <a href="#/team" onClick={(e) => { e.preventDefault(); onNavigate('/team'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Team</a>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} className="text-slate-300 hover:text-[#F97316] transition-colors duration-300 font-medium">Contact</a>
          <div className="w-px h-5 bg-[#2A3B57]"></div>
          <div className="flex items-center gap-1.5">
            <button className="font-bold text-[#E2E8F0]">EN</button>
            <span className="text-[#94A3B8]">/</span>
            <button className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-300">PL</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;