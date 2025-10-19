import React, { useState } from 'react';
import { faqData } from '../data/content';

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-[#E2E8F0]">{item.question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-[#94A3B8] transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <p className="pb-5 text-[#94A3B8] text-base leading-relaxed">
              {item.answer}
            </p>
        </div>
      </div>
    </div>
  );
};

interface FAQTeaserProps {
    onNavigate: (path: string) => void;
}

const FAQTeaser: React.FC<FAQTeaserProps> = ({ onNavigate }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const teaserData = faqData.slice(0, 3);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const handleNavigate = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };

    return (
        <section className="py-16 sm:py-20 bg-transparent">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">
                        Have Questions?
                    </h2>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        Here are some of our most frequently asked questions.
                    </p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto bg-slate-900/70 backdrop-blur-xl p-4 sm:p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
                    {teaserData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                     <a 
                        href="#/faq" 
                        onClick={(e) => handleNavigate(e, '/faq')}
                        className="relative inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-[#F97316] text-[#F97316] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:bg-[#F97316] hover:text-white hover:shadow-lg hover:shadow-[#F97316]/40"
                    >
                        View All FAQs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQTeaser;
