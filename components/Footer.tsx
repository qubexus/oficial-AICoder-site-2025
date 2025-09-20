
import React from 'react';
import LogoFull from './LogoFull';

interface FooterProps {
  onNavigate: (path: string) => void;
  currentPage: string;
}

const SocialIcon: React.FC<{ href: string, children: React.ReactNode, label: string }> = ({ href, children, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-slate-400 hover:text-[#F97316] transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };
  
  return (
    <footer className="bg-[#1E293B]/50 border-t border-slate-700 pt-16 pb-8">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
             <a href="#/" onClick={(e) => handleNavigate(e, '/')} aria-label="AICoder Home" className="relative" style={{ top: '1.75rem', transform: 'scale(0.6)', transformOrigin: 'top left', marginLeft: '-2.5rem' }}>
                <LogoFull />
             </a>
             <p className="text-slate-400 text-sm mt-4 max-w-xs mx-auto md:mx-0">
                Shaping the future of human-AI collaboration through expert education.
             </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#/" onClick={(e) => handleNavigate(e, '/')} className="text-slate-400 hover:text-[#F97316] transition-colors">Home</a>
              <a href="#/academy" onClick={(e) => handleNavigate(e, '/academy')} className="text-slate-400 hover:text-[#F97316] transition-colors">Academy</a>
              <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className="text-slate-400 hover:text-[#F97316] transition-colors">Blog</a>
            </nav>
          </div>
          
          {/* Column 3: Resources */}
           <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#/faq" onClick={(e) => handleNavigate(e, '/faq')} className="text-slate-400 hover:text-[#F97316] transition-colors">FAQ</a>
              <a href="#/contact" onClick={(e) => handleNavigate(e, '/contact')} className="text-slate-400 hover:text-[#F97316] transition-colors">Contact Us</a>
              <a href="#/about-us" onClick={(e) => handleNavigate(e, '/about-us')} className="text-slate-400 hover:text-[#F97316] transition-colors">About Us</a>
            </nav>
          </div>

          {/* Column 4: Connect */}
           <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
                 <SocialIcon href="#" label="X / Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                 </SocialIcon>
                 <SocialIcon href="#" label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                 </SocialIcon>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AICoder. All rights reserved.</p>
             <a href="#/admin" onClick={(e) => handleNavigate(e, '/admin')} className="text-xs text-slate-600 hover:text-[#2DD4BF] transition-colors mt-2 inline-block">Admin Panel</a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);