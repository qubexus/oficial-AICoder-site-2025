import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import type { AppContent } from './types';

// Lazy load page components for better performance via code splitting
const Admin = React.lazy(() => import('./site/Admin'));
const Academy = React.lazy(() => import('./site/Academy'));
const AboutUs = React.lazy(() => import('./site/AboutUs'));
const Team = React.lazy(() => import('./site/Team'));
const Contact = React.lazy(() => import('./site/Contact'));

// Lazy load below-the-fold homepage sections
const Stats = React.lazy(() => import('./components/Stats'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Timeline = React.lazy(() => import('./components/Timeline'));

// A visually appealing loader for suspended components
const PageLoader: React.FC = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]" role="status" aria-label="Loading page content">
    <svg className="animate-spin h-16 w-16 text-[#F97316]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

// A loader for lazy-loaded sections to prevent layout shift and indicate loading.
const SectionLoader: React.FC = () => (
    <div className="flex justify-center items-center min-h-[50vh]" role="status" aria-label="Loading section content">
        <svg className="animate-spin h-12 w-12 text-[#F97316]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const getNormalizedHash = (hash: string): string => {
    if (['', '#'].includes(hash)) {
        return '#/';
    }
    return hash;
};

const App: React.FC = () => {
  // Simple hash-based routing. We normalize the hash to prevent loops.
  const [page, setPage] = useState(() => getNormalizedHash(window.location.hash));
  const [displayedPage, setDisplayedPage] = useState(page);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  // Function to handle navigation programmatically
  const handleNavigate = useCallback((path: string) => {
    // The path argument is expected to be like '/' or '/academy'.
    // This creates a hash like '#/' or '#/academy'.
    const newHash = '#' + path;
    if (getNormalizedHash(window.location.hash) !== getNormalizedHash(newHash)) {
        window.location.hash = newHash;
    } else if (getNormalizedHash(window.location.hash) === '#/' && window.location.hash !== '#/') {
        // If we are on a non-canonical home hash ('', '#') and navigating home,
        // update hash to canonical '#/' to prevent inconsistencies.
        window.location.hash = '#/';
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(prevPage => {
        const newHash = getNormalizedHash(window.location.hash);
        return newHash === prevPage ? prevPage : newHash;
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Effect to handle page transition animations
  useEffect(() => {
    if (page !== displayedPage) {
      setAnimationClass('animate-fade-out');
      const timer = setTimeout(() => {
        setDisplayedPage(page);
        window.scrollTo(0, 0); // Scroll to top after content change
        setAnimationClass('animate-fade-in');
      }, 300); // This duration must match the CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [page, displayedPage]);

  // Effect to handle scroll events for the 'Scroll to Top' button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Shared content state with persistence in localStorage
  const [content, setContent] = useState<AppContent>(() => {
    try {
        const savedContent = localStorage.getItem('aicoder-content');
        if (savedContent) {
          return JSON.parse(savedContent);
        }
    } catch (e) {
        console.error("Failed to parse content from localStorage", e);
    }
    return {
      aiModelsText: 'Latest in AI Agents',
      promptLibrariesText: 'Prompt Libraries',
      aboutTitle: 'About AICoder Academy',
      aboutDescription: 'AICoder is a premier academy dedicated to the art and science of prompt engineering. Our mission is to empower the next generation of AI pioneers.',
      generatorTitle: 'Generate Code with AI',
      generatorDescription: 'Describe your component, function, or logic in plain English. Our AI will generate clean, efficient code in seconds.',
      generatorPlaceholder: "e.g., 'A React button component with a loading spinner'",
    };
  });

  const handleContentChange = useCallback((newContent: AppContent) => {
    setContent(newContent);
    try {
        localStorage.setItem('aicoder-content', JSON.stringify(newContent));
    } catch(e) {
        console.error("Failed to save content to localStorage", e);
    }
  }, []);

  const renderPage = () => {
    switch (displayedPage) {
      case '#/academy':
        return <Academy />;
      case '#/about-us':
        return <AboutUs />;
      case '#/team':
        return <Team />;
      case '#/contact':
        return <Contact />;
      case '#/':
      default:
        // After normalization, '#/' is the only home page case.
        // The default case handles unexpected hashes by showing the homepage.
        return (
          <main>
            <Hero content={content} onNavigate={handleNavigate} />
            <Suspense fallback={<SectionLoader />}>
              <Stats />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Timeline />
            </Suspense>
          </main>
        );
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-[rgba(42,59,87,0.95)] to-[rgba(30,41,59,0.95)] min-h-screen text-[#E2E8F0] relative flex flex-col">
      <ParticleBackground />
      {page === '#/admin' ? (
        <div className="relative z-10 flex-grow flex items-center justify-center p-4">
            <Suspense fallback={<PageLoader />}>
                <Admin content={content} onContentChange={handleContentChange} />
            </Suspense>
        </div>
      ) : (
        <>
          <Header onNavigate={handleNavigate} currentPage={page} />
          <div className={`relative z-10 flex-grow ${animationClass}`}>
            <Suspense fallback={<PageLoader />}>
              {renderPage()}
            </Suspense>
          </div>
          <Footer />
        </>
      )}
      
      {/* Scroll to Top Button */}
      {isScrollButtonVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-[#F97316] text-[#E2E8F0] rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1E293B] focus:ring-[#F97316] transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;