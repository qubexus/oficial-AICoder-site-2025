import React, { useState } from 'react';
import { faqData } from '../data/content';

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 px-2"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-[#E2E8F0]">{item.question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-[#94A3B8] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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
            <p className="pb-6 px-2 text-[#94A3B8] text-base leading-relaxed">
              {item.answer}
            </p>
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
      <div className="content-wrapper">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us directly.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-slate-900/70 backdrop-blur-xl p-4 sm:p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Faq;
