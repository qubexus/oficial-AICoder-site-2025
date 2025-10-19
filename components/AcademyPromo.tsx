import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import AnimatedAicoderLogo from './AnimatedAicoderLogo';

interface AcademyPromoProps {
  onNavigate: (path: string) => void;
}

const AcademyPromo: React.FC<AcademyPromoProps> = ({ onNavigate }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, triggerOnce: true });

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/academy');
  };

  return (
    <section ref={ref} className="py-20 sm:py-24">
      <div className="content-wrapper px-4 sm:px-8">
        <div className="grid lg:grid-cols-3 items-center">
          {/* Left Panel */}
          <div 
            className={`bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] transition-all duration-500 ease-out text-center lg:text-left ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-2xl font-semibold text-[#E2E8F0] mb-4">Unlock Your Potential</h3>
            <p className="text-[#94A3B8] mb-6">
              Our academy provides hands-on training from industry experts to master the art of prompt engineering and AI development.
            </p>
            <a 
              href="#/academy"
              onClick={handleNavigate}
              className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 self-start group"
            >
              Explore the Curriculum <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

          {/* Center Animation */}
          <div 
            className={`lg:col-span-1 flex justify-center items-center transition-all duration-500 ease-out my-8 lg:my-0 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <AnimatedAicoderLogo />
          </div>

          {/* Right Panel */}
          <div 
            className={`bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] transition-all duration-500 ease-out text-center lg:text-left ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-2xl font-semibold text-[#E2E8F0] mb-4">What You'll Learn</h3>
            <ul className="text-[#94A3B8] space-y-2 list-none sm:list-disc sm:list-inside mb-6 text-left inline-block">
              <li>Advanced Prompting Techniques</li>
              <li>AI Model Fine-Tuning</li>
              <li>Ethical AI Practices</li>
              <li>Building AI-Powered Apps</li>
            </ul>
            <br/>
             <a 
              href="#/academy"
              onClick={handleNavigate}
              className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 self-start group mt-6 lg:mt-0"
            >
              Join the Academy <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyPromo;