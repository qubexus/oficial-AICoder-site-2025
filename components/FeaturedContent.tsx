import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { featuredContentData } from '../data/content';

interface FeaturedContentProps {
  onNavigate: (path: string) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onNavigate }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, triggerOnce: true });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    // The link is in format '#/path', onNavigate expects '/path'
    onNavigate(link.substring(1)); 
  };

  return (
    <section ref={ref} className="py-20 sm:py-24">
      <div className="content-wrapper px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">
            Featured Content
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Handpicked articles, tutorials, and case studies to deepen your AI knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredContentData.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={(e) => handleClick(e, item.link)}
              className={`block bg-slate-900/70 backdrop-blur-xl rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] overflow-hidden group transition-all duration-500 ease-out hover:border-[#F97316]/50 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              aria-label={`Read more about ${item.title}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-3 right-3 bg-[#F97316] text-[#E2E8F0] text-xs font-bold uppercase px-2 py-1 rounded-md shadow-lg">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-[#E2E8F0] mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 h-20 flex-grow">
                  {item.description}
                </p>
                <div className="text-sm font-bold text-[#F97316] group-hover:underline group-hover:brightness-125 transition-all duration-300 ease-in-out mt-auto self-start">
                  Read More <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;