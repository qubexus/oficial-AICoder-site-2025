import React, { useState, useEffect, useCallback } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { testimonials } from '../data/content';

const Testimonials: React.FC = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const handleInteraction = (action: () => void) => {
    if (!userHasInteracted) {
      setUserHasInteracted(true);
    }
    action();
  };

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);
  
  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);
  
  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (userHasInteracted || isPaused || !isVisible) {
      return;
    }

    const interval = setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [isPaused, isVisible, userHasInteracted, nextTestimonial]);

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-transparent overflow-hidden">
      <div className="content-wrapper">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Real stories from our graduates who are now shaping the future of AI.
          </p>
        </div>

        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`bg-slate-900/70 backdrop-blur-xl p-8 sm:p-12 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Quote Icon */}
            <svg className="absolute top-8 left-8 w-12 h-12 text-[#1E293B]/50" viewBox="0 0 44 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.166 33.0002C13.208 33.0002 15.333 30.8752 15.333 27.8335C15.333 24.7918 13.208 22.6668 10.166 22.6668C8.91633 22.6668 7.33301 23.3752 6.50001 24.0835L4.66634 20.9168C6.16634 19.4168 8.41633 18.3335 11 18.3335C16.5 18.3335 21 22.5002 21 28.1668C21 33.8335 16.5 38.0002 11 38.0002C5.5 38.0002 1 33.8335 1 28.1668V11.0002H18.5V22.0002H10.166V33.0002ZM33.166 33.0002C36.208 33.0002 38.333 30.8752 38.333 27.8335C38.333 24.7918 36.208 22.6668 33.166 22.6668C31.9163 22.6668 30.333 23.3752 29.5 24.0835L27.6663 20.9168C29.1663 19.4168 31.4163 18.3335 34 18.3335C39.5 18.3335 44 22.5002 44 28.1668C44 33.8335 39.5 38.0002 34 38.0002C28.5 38.0002 24 33.8335 24 28.1668V11.0002H41.5V22.0002H33.166V33.0002Z"/>
            </svg>
            
            <div className="relative min-h-[150px] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-opacity duration-500 ease-in-out absolute top-0 left-0 w-full ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden={index !== currentIndex}
                >
                  <p className="text-lg sm:text-xl text-[#E2E8F0] italic relative z-10 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-[#2A3B57] relative z-10">
                    <p className="font-bold text-lg text-[#E2E8F0]">{testimonial.name}</p>
                    <p className="text-sm text-[#94A3B8]">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleInteraction(() => goToTestimonial(index))}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#F97316] scale-125' : 'bg-[#334155] hover:bg-[#475569]'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => handleInteraction(prevTestimonial)}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-20 p-2 bg-[#1E293B]/50 hover:bg-[#1E293B] text-[#94A3B8] hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hidden sm:block"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleInteraction(nextTestimonial)}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-20 p-2 bg-[#1E293B]/50 hover:bg-[#1E293B] text-[#94A3B8] hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hidden sm:block"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;