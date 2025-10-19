// FIX: Corrected import for Suspense from 'react'
import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import type { AppContent } from './types';

// Lazy load components
const Admin = React.lazy(() => import('./site/Admin'));
const Academy = React.lazy(() => import('./site/Academy'));
const AboutUs = React.lazy(() => import('./site/AboutUs'));
const Team = React.lazy(() => import('./site/Team'));
const Contact = React.lazy(() => import('./site/Contact'));
const Faq = React.lazy(() => import('./site/Faq'));
const ImageGenerator = React.lazy(() => import('./site/ImageGenerator'));
const TechnicalAudit = React.lazy(() => import('./site/TechnicalAudit'));
const FAQTeaser = React.lazy(() => import('./components/FAQTeaser'));
const Blog = React.lazy(() => import('./site/Blog'));
const BlogPost = React.lazy(() => import('./site/BlogPost'));
const AILogos = React.lazy(() => import('./components/AILogos'));

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

// Loaders
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

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-container p-4 bg-red-500/20 rounded-lg">
    <h2 className="text-xl font-bold">Coś poszło nie tak</h2>
    <p className="text-sm opacity-80 mb-4">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-[#F97316] rounded-md"
    >
      Spróbuj ponownie
    </button>
  </div>
);

const ScrollToTopButton = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      setPage(getNormalizedHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (page !== displayedPage) {
      setAnimationClass('animate-fade-out');
      const timer = setTimeout(() => {
        setDisplayedPage(page);
        window.scrollTo(0, 0);
        setAnimationClass('animate-fade-in');
      }, 300);

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
    setContent(newContent);
    try {
      localStorage.setItem('aicoder-content', JSON.stringify(newContent));
    } catch(e) {
      console.error("Failed to save content to localStorage", e);
    }
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

  return isVisible;
}

const App: React.FC = () => {
  const { page, displayedPage, animationClass, navigate } = useRouter();
  const { content, handleContentChange } = useContent();
  const isScrollButtonVisible = useScrollToTop();
  const isHomePage = displayedPage === '#/';

  // Page components mapping
  const pageComponents = {
    '#/academy': Academy,
    '#/about-us': AboutUs,
    '#/team': Team,
    '#/contact': Contact,
    '#/faq': Faq,
    '#/image-generator': ImageGenerator,
    '#/technical-audit': TechnicalAudit,
    '#/blog': () => <Blog onNavigate={navigate} />,
  };

  const renderPage = useCallback(() => {
     // Handle dynamic blog post route first
    if (displayedPage.startsWith('#/blog/')) {
        const slug = displayedPage.split('/')[2];
        return <BlogPost slug={slug} onNavigate={navigate} />;
    }

    const PageComponent = pageComponents[displayedPage];
    
    if (PageComponent) {
      return <PageComponent />;
    }
    
    // Default: Home page
    return (
      <main>
        <Hero content={content} onNavigate={navigate} />
        <Suspense fallback={<SectionLoader />}>
            <AILogos />
        </Suspense>
      </main>
    );
  }, [displayedPage, content, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && page !== '#/') {
        navigate('/');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, navigate]);

  return (
    <div className={`bg-gradient-to-br from-[rgba(42,59,87,0.95)] to-[rgba(30,41,59,0.95)] min-h-screen text-[#E2E8F0] relative flex flex-col ${isHomePage ? 'is-homepage' : ''}`}>
      <ParticleBackground />
      {page === '#/admin' ? (
        <div className="relative z-10 flex-grow flex items-center justify-center p-4">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<PageLoader />}>
              <Admin content={content} onContentChange={handleContentChange} onNavigate={navigate} />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : (
        <>
          <Header onNavigate={navigate} currentPage={page} />
          <div className={`relative z-10 flex-grow ${animationClass}`}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<PageLoader />}>
                {renderPage()}
              </Suspense>
            </ErrorBoundary>
          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<SectionLoader />}>
              <FAQTeaser onNavigate={navigate} />
            </Suspense>
          </ErrorBoundary>
          <Footer onNavigate={navigate} currentPage={page} />
        </>
      )}
      
      <ScrollToTopButton isVisible={isScrollButtonVisible} />
    </div>
  );
};

export default React.memo(App);