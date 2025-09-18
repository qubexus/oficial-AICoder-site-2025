
import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1E293B]/50 py-12 sm:py-16">
      <div className="content-wrapper text-center text-[#94A3B8]">
        <p>&copy; {new Date().getFullYear()} AICoder. All rights reserved.</p>
        <div className="mt-4">
          <a 
            href="#/admin" 
            onClick={(e) => { e.preventDefault(); onNavigate('/admin'); }}
            className="text-xs text-[#94A3B8] hover:text-[#2DD4BF] transition-colors duration-300">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);