import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
const Faq = React.lazy(() => import('./site/Faq'));

// Lazy load below-the-fold homepage sections
const Stats = React.lazy(() => import('./components/Stats'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Timeline = React.lazy(() => import('./components/Timeline'));

// Default content
const defaultContent: AppContent = {
  aiModelsText: 'Latest in AI Agents',
  promptLibrariesText: 'Prompt Libraries',
  aboutTitle: 'About AICoder Academy',
  aboutDescription: 'AICoder is a premier academy dedicated to the art and science of prompt engineering. Our mission is to empower the next generation of AI pioneers.',
  generatorTitle: 'Generate Code with AI',
  generatorDescription: 'Describe your component, function, or logic in plain English. Our AI will generate clean, efficient code in seconds.',
  generatorPlaceholder: "e.g., 'A React button component with a loading spinner'",
};

// Loaders as memoized components for better performance
const PageLoader = React.memo(() => (
  <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]" role="status" aria-label="Loading page content">
    <svg className="animate-spin h-16 w-16 text-[#F97316]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
));

const SectionLoader = React.memo(() => (
  <div className="flex justify-center items-center min-h-[50vh]" role="status" aria-label="Loading section content">
    <svg className="animate-spin h-12 w-12 text-[#F97316]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
));

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-6 bg-red-500/10 rounded-lg shadow-lg m-4 border border-red-500/20">
    <h2 className="text-xl font-bold text-red-400 mb-2">Coś poszło nie tak</h2>
    <p className="text-sm opacity-80 mb-4">{error.message || 'Wystąpił nieoczekiwany błąd'}</p>
    <button 
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-[#F97316] rounded-md hover:bg-[#E86305] transition-colors"
    >
      Spróbuj ponownie
    </button>
  </div>
);

// Scroll to top button component
const ScrollToTopButton = ({ isVisible, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-3 bg-[#F97316] text-[#E2E8F0] rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1E293B] focus:ring-[#F97316] transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

// Helper functions
const getNormalizedHash = (hash: string): string => {
  if (['', '#'].includes(hash)) {
    return '#/';
  }
  return hash;
};

// Custom hooks
function useRouter() {
  const [page, setPage] = useState(() => getNormalizedHash(window.location.hash));
  const [displayedPage, setDisplayedPage] = useState(page);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');

  const navigate = useCallback((path: string) => {
    const newHash = '#' + path;
    if (getNormalizedHash(window.location.hash) !== getNormalizedHash(newHash)) {
      window.location.hash = newHash;
    } else if (getNormalizedHash(window.location.hash) === '#/' && window.location.hash !== '#/') {
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
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  return { page, displayedPage, animationClass, navigate };
}

function useContent() {
  const [content, setContent] = useState<AppContent>(() => {
    try {
      const savedContent = localStorage.getItem('aicoder-content');
      return savedContent ? { ...defaultContent, ...JSON.parse(savedContent) } : defaultContent;
    } catch (e) {
      console.error("Failed to parse content from localStorage", e);
      return defaultContent;
    }
  });

  const handleContentChange = useCallback((newContent: AppContent) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      try {
        localStorage.setItem('aicoder-content', JSON.stringify(updatedContent));
      } catch(e) {
        console.error("Failed to save content to localStorage", e);
      }
      return updatedContent;
    });
  }, []);

  return { content, handleContentChange };
}

function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return { isVisible, scrollToTop };
}

const App: React.FC = () => {
  const { page, displayedPage, animationClass, navigate } = useRouter();
  const { content, handleContentChange } = useContent();
  const { isVisible: isScrollButtonVisible, scrollToTop } = useScrollToTop();

  // Page components mapping
  const pageComponents = useMemo(() => ({
    '#/academy': Academy,
    '#/about-us': AboutUs,
    '#/team': Team,
    '#/contact': Contact,
    '#/faq': Faq,
  }), []);

  // Memoized render function to prevent unnecessary re-renders
  const renderPage = useMemo(() => {
    const PageComponent = pageComponents[displayedPage];
    
    if (PageComponent) {
      return <PageComponent />;
    }
    
    // Default: Home page
    return (
      <main>
        <Hero content={content} onNavigate={navigate} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoader />}>
            <Stats />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoader />}>
            <Timeline />
          </Suspense>
        </ErrorBoundary>
      </main>
    );
  }, [displayedPage, content, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key navigates to home
      if (e.key === 'Escape' && page !== '#/') {
        navigate('/');
      }
      
      // Number keys for quick navigation (1-5)
      if (e.altKey && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const routes = ['/', '/academy', '/about-us', '/team', '/contact'];
        navigate(routes[parseInt(e.key) - 1]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, navigate]);

  return (
    <div className="bg-gradient-to-br from-[rgba(42,59,87,0.95)] to-[rgba(30,41,59,0.95)] min-h-screen text-[#E2E8F0] relative flex flex-col">
      <ParticleBackground />
      {page === '#/admin' ? (
        <div className="relative z-10 flex-grow flex items-center justify-center p-4">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<PageLoader />}>
              <Admin content={content} onContentChange={handleContentChange} />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : (
        <>
          <Header onNavigate={navigate} currentPage={page} />
          <div className={`relative z-10 flex-grow ${animationClass}`}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<PageLoader />}>
                {renderPage}
              </Suspense>
            </ErrorBoundary>
          </div>
          <Footer />
        </>
      )}
      
      <ScrollToTopButton isVisible={isScrollButtonVisible} onClick={scrollToTop} />
    </div>
  );
};

export default React.memo(App);
