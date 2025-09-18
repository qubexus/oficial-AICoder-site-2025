import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AppContent } from '../types';
import AILogos from './AILogos';
import AutomatedTimeline from './AutomatedTimeline';
import ErrorBoundary from './ErrorBoundary';
import { useOnScreen } from '../hooks/useOnScreen';
import { defaultNewsData, automatedTimelineData, featureData, aiModels } from '../data/content';
import type { NewsItem, AIModel } from '../data/content';
import { StarIcon } from './AILogos';
import FeaturedContent from './FeaturedContent';
import RobotGraphic from './RobotGraphic';
import CodeGenerator from './CodeGenerator';

const fallbackNewsImage = 'https://picsum.photos/seed/fallback/400/400';

// Placeholder component for animated timeline content.
const TimelineContent: React.FC<{ data: typeof automatedTimelineData[0], state: 'in' | 'out' }> = ({ data, state }) => (
    <div className={`w-[300px] h-[150px] p-4 bg-slate-900/50 backdrop-blur-xl rounded-lg border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] text-right transition-all duration-300 ${state === 'in' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <p className="text-xl font-semibold text-[#94A3B8] mb-1">{data.year}</p>
        <h3 className="text-lg font-semibold text-[#E2E8F0] mb-2">{data.title}</h3>
        <p className="text-[#94A3B8] text-xs leading-snug">{data.description}</p>
    </div>
);
const MemoizedTimelineContent = React.memo(TimelineContent);

// Placeholder component for animated feature content.
const FeatureContent: React.FC<{ data: typeof featureData[0], state: 'in' | 'out' }> = ({ data, state }) => (
    <div className={`w-[300px] h-[150px] p-4 bg-slate-900/50 backdrop-blur-xl rounded-lg border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] text-left transition-all duration-300 ${state === 'in' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        <div className="flex items-center gap-3 mb-2">
            <div className="bg-slate-800/50 p-2 rounded-full" dangerouslySetInnerHTML={{ __html: data.icon }}>
            </div>
            <h3 className="text-lg font-semibold text-[#E2E8F0]">{data.title}</h3>
        </div>
        <p className="text-[#94A3B8] text-xs leading-snug">{data.description}</p>
    </div>
);
const MemoizedFeatureContent = React.memo(FeatureContent);


interface HeroProps {
    content: AppContent;
    onNavigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'in' | 'out'>('in');
    
    // Sort state for news articles
    const [sortOrder, setSortOrder] = useState('date-desc'); // Default to newest first

    const getSortedNews = useCallback((order: string): NewsItem[] => {
        const newsCopy = [...defaultNewsData];
        switch (order) {
            case 'date-asc':
                return newsCopy.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
            case 'title-asc':
                return newsCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return newsCopy.sort((a, b) => b.title.localeCompare(a.title));
            case 'date-desc':
            default:
                return newsCopy.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        }
    }, []);
    
    const [sortedNews, setSortedNews] = useState<NewsItem[]>(() => getSortedNews(sortOrder));
    
    useEffect(() => {
        setSortedNews(getSortedNews(sortOrder));
    }, [sortOrder, getSortedNews]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);
    
    const newsModalRef = useRef<HTMLDivElement>(null);
    const newsModalTriggerRef = useRef<HTMLElement | null>(null);
    const [newsContainerRef, isNewsVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });

    // AI Model Modal State
    const [isModelModalOpen, setIsModelModalOpen] = useState(false);
    const [isModelModalClosing, setIsModelModalClosing] = useState(false);
    const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
    
    const modelModalRef = useRef<HTMLDivElement>(null);
    const modelModalTriggerRef = useRef<HTMLElement | null>(null);

    const handleReadMore = (item: NewsItem) => {
      newsModalTriggerRef.current = document.activeElement as HTMLElement;
      setSelectedNews(item);
      setIsModalOpen(true);
      setIsModalClosing(false);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalClosing(true);
        setIsShareOpen(false); // Close share dropdown when modal closes
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedNews(null);
        }, 300); // Duration should match the exit animation
    }, []);

    // AI Model Modal Handlers
    const handleOpenModelModal = (model: AIModel) => {
      modelModalTriggerRef.current = document.activeElement as HTMLElement;
      setSelectedModel(model);
      setIsModelModalOpen(true);
      setIsModelModalClosing(false);
    };

    const handleCloseModelModal = useCallback(() => {
        setIsModelModalClosing(true);
        setTimeout(() => {
            setIsModelModalOpen(false);
            setSelectedModel(null);
        }, 300); // Duration should match the exit animation
    }, []);

    // Effect for handling keyboard dismissal, focus trapping, and body scroll lock for ALL modals
    useEffect(() => {
        const isAnyModalOpen = isModalOpen || isModelModalOpen;
        const activeModalRef = isModalOpen ? newsModalRef : modelModalRef;
        const triggerRef = isModalOpen ? newsModalTriggerRef : modelModalTriggerRef;
        const closeHandler = isModalOpen ? handleCloseModal : handleCloseModelModal;

        if (!isAnyModalOpen || !activeModalRef.current) {
            document.body.style.overflow = 'unset';
            return;
        }

        document.body.style.overflow = 'hidden';
        
        const focusableElements = activeModalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) {
            firstElement.focus();
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeHandler();
            }

            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            if (triggerRef.current) {
                triggerRef.current.focus();
            }
        };
    }, [isModalOpen, isModelModalOpen, handleCloseModal, handleCloseModelModal]);


    const handleCopyLink = useCallback(() => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
                setIsShareOpen(false); // Close dropdown after copying
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    }, []);

    // Effect for closing share dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        if (isShareOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShareOpen]);

    const handleTimelineChange = useCallback((index: number) => {
        setAnimationState('out');
        setTimeout(() => {
            setActiveIndex(index);
            setAnimationState('in');
        }, 300);
    }, []);
    
    const timelineControllerData = automatedTimelineData.map(({ year, pauseAfter, interstitial }) => ({ year, pauseAfter, interstitial }));
    const currentTimelineEvent = automatedTimelineData[activeIndex];
    const currentFeature = featureData[activeIndex % featureData.length];
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallbackNewsImage) {
            target.onerror = null; // Prevent infinite loop if fallback fails
            target.src = fallbackNewsImage;
        }
    };

    const shareUrl = window.location.href;
    const shareText = selectedNews ? selectedNews.title : 'Check out this article!';
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    const relatedModels = selectedModel 
        ? aiModels
            .filter(model => model.name !== selectedModel.name)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
        : [];

    return (
        <section className="pt-28 sm:pt-32 xl:pt-36 pb-12">
            <div className="content-wrapper">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center mb-12 sm:mb-16 xl:mb-20">
                    <div className="animate-gentle-float relative z-40">
                       <RobotGraphic />
                    </div>
                    <div className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed text-left">
                        <p className="mb-6 text-[#94A3B8]">
                            AICoder is a personal initiative to dive deep into the world of AI-assisted software engineering. It serves as a blog, a portfolio, and a collection of open-source tools aimed at developers who are passionate about leveraging AI to create smarter, more efficient applications.
                        </p>
                        <p className="text-xl md:text-2xl font-semibold text-[#E2E8F0]">
                            Code with Intelligence is more than a slogan—it's the guiding principle behind every project and article shared here. Join me on this journey to push the boundaries of what's possible with code.
                        </p>
                    </div>
                </div>
                
                <AILogos onModelClick={handleOpenModelModal} />

                <div className="mt-8">
                    <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                            <h3 className="text-base xl:text-lg font-semibold text-[#E2E8F0] flex-shrink-0">{content.aiModelsText}</h3>
                            <div className="relative">
                                <label htmlFor="sort-news" className="sr-only">Sort articles</label>
                                <select
                                    id="sort-news"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="bg-slate-800/80 border border-slate-700 text-[#E2E8F0] text-sm rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] block w-full pl-3 pr-8 py-2 appearance-none transition-colors duration-300"
                                    aria-label="Sort articles"
                                >
                                    <option value="date-desc">Newest First</option>
                                    <option value="date-asc">Oldest First</option>
                                    <option value="title-asc">Title (A-Z)</option>
                                    <option value="title-desc">Title (Z-A)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#94A3B8]">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                        </div>

                         <div className="flex-1 flex flex-col justify-center">
                            <ErrorBoundary>
                                <div ref={newsContainerRef} className="columns-1 md:columns-2 lg:columns-3 gap-6">
                                    {sortedNews.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`group bg-slate-900/50 backdrop-blur-xl rounded-lg p-4 flex items-start gap-4 break-inside-avoid mb-6 border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] transition-all duration-500 ease-out hover:border-[#F97316]/50 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-1 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            <div className="w-1/3 flex-shrink-0">
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.title} 
                                                    className="w-full aspect-square object-cover rounded-md"
                                                    loading="lazy"
                                                    decoding="async"
                                                    onError={handleImageError}
                                                />
                                            </div>
                                            <div className="w-2/3 flex flex-col h-full">
                                                <h4 className="font-semibold text-lg text-[#E2E8F0] leading-snug">{item.title}</h4>
                                                <p className="text-sm text-[#94A3B8] mt-2 flex-grow leading-relaxed">{item.summary}</p>
                                                <button onClick={() => handleReadMore(item)} className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 ease-in-out mt-3 self-start group/link">
                                                    Read More <span className="inline-block transition-transform duration-300 ease-in-out group-hover/link:translate-x-1">&rarr;</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>

                <FeaturedContent onNavigate={onNavigate} />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 xl:gap-x-8 gap-y-6 mt-20 mb-20 xl:mb-24">
                    <div className="sm:col-span-3 text-center">
                        <p className="font-semibold text-5xl">
                           AICoder <span className="text-[#94A3B8]">Academy</span>
                        </p>
                    </div>

                    <div className="sm:col-span-1 bg-slate-900/50 backdrop-blur-xl p-6 xl:p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] flex flex-col justify-center">
                        <h3 className="text-xl xl:text-2xl font-semibold text-[#E2E8F0] mb-3">{content.aboutTitle}</h3>
                        <p className="text-[#94A3B8] text-sm xl:text-base mb-4">
                            {content.aboutDescription}
                        </p>
                        <a href="#/about-us" onClick={(e) => {e.preventDefault(); onNavigate('/about-us')}} className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 self-start group">
                           Learn More <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                        </a>
                    </div>
                    
                    <div className="sm:col-span-2 bg-slate-900/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] flex flex-col justify-center items-center text-center">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 xl:w-20 xl:h-20 text-[#94A3B8]">
                            <path d="M8 6h10c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6 18H5c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16 4H7c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h8" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M9 9h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M9 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <h3 className="text-base xl:text-lg font-semibold text-[#E2E8F0] mt-4">{content.promptLibrariesText}</h3>
                    </div>
                </div>
                
                <div className="flex flex-col items-center">
                     <div className="w-full grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                        <div className="w-full h-full flex items-center justify-center md:justify-end">
                            {currentTimelineEvent && <MemoizedTimelineContent data={currentTimelineEvent} state={animationState} />}
                        </div>
                        <div className="w-full h-full flex items-center justify-center md:justify-start">
                            {currentFeature && <MemoizedFeatureContent data={currentFeature} state={animationState} />}
                        </div>
                    </div>
                    
                    <div className="w-full mt-12 sm:mt-16">
                         <AutomatedTimeline onIndexChange={handleTimelineChange} data={timelineControllerData} />
                    </div>
                </div>

                <CodeGenerator content={content} />

            </div>
            
            {/* News Article Modal */}
            {isModalOpen && selectedNews && (
                <div 
                  className={`fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModalClosing ? 'animate-out fade-out-0 ease-in' : 'animate-in fade-in-0 ease-out'}`}
                  onClick={handleCloseModal}
                >
                  <div
                    ref={newsModalRef}
                    className={`bg-slate-900/70 backdrop-blur-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative shadow-2xl transition-all duration-300 ${isModalClosing ? 'animate-out fade-out-0 zoom-out-95 ease-in' : 'animate-in fade-in-0 zoom-in-95 ease-out'}`}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="news-modal-title"
                  >
                    <div className="flex-shrink-0 bg-transparent px-6 sm:px-8 pt-6 pb-4 border-b border-slate-700 z-10">
                        <div className="flex justify-center items-center relative">
                             <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-4">
                                <div className="relative" ref={shareRef}>
                                    <button 
                                      onClick={() => setIsShareOpen(prev => !prev)} 
                                      className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                                      aria-label="Share article"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                    </button>
                                    {isShareOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg z-20 animate-in fade-in-0 duration-200">
                                            <div className="p-2 space-y-1">
                                                <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-[#94A3B8] hover:bg-slate-700/50 rounded-md transition-colors animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 ease-out duration-300" style={{ animationDelay: '150ms' }}>
                                                    {copySuccess ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                    )}
                                                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                                                </button>
                                                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsShareOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-[#94A3B8] hover:bg-slate-700/50 rounded-md transition-colors animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 ease-out duration-300" style={{ animationDelay: '200ms' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                                    <span>Share on X</span>
                                                </a>
                                                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsShareOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-[#94A3B8] hover:bg-slate-700/50 rounded-md transition-colors animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 ease-out duration-300" style={{ animationDelay: '250ms' }}>
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"></path></svg>
                                                    <span>Share on Facebook</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button 
                                  onClick={handleCloseModal} 
                                  className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                                  aria-label="Close article"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8">
                      <h2 
                        id="news-modal-title" 
                        className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0] mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out" 
                        style={{ animationDelay: '100ms' }}
                      >
                        {selectedNews.title}
                      </h2>
                      <img 
                        src={selectedNews.imageUrl} 
                        alt={selectedNews.title} 
                        className="w-full h-auto max-h-64 object-cover rounded-lg mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out"
                        style={{ animationDelay: '200ms' }}
                        loading="lazy"
                        decoding="async"
                        onError={handleImageError}
                      />
                      <div 
                        className="text-[#94A3B8] text-base sm:text-lg space-y-6 whitespace-pre-wrap leading-loose animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out"
                        style={{ animationDelay: '300ms' }}
                      >
                        {selectedNews.fullArticle.split('\n').map((paragraph, index) => {
                            const trimmedParagraph = paragraph.trim();
                            if (!trimmedParagraph) return null;
                            if (trimmedParagraph.startsWith('- ')) {
                                return <p key={index} className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#F97316]">{trimmedParagraph.substring(2)}</p>
                            }
                            return <p key={index}>{trimmedParagraph}</p>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
            )}
            
            {/* AI Model Details Modal */}
            {isModelModalOpen && selectedModel && (
                <div 
                  className={`fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModelModalClosing ? 'animate-out fade-out-0 ease-in' : 'animate-in fade-in-0 ease-out'}`}
                  onClick={handleCloseModelModal}
                >
                  <div 
                    ref={modelModalRef}
                    className={`bg-slate-900/70 backdrop-blur-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative shadow-2xl transition-all duration-300 ${isModelModalClosing ? 'animate-out fade-out-0 zoom-out-95 ease-in' : 'animate-in fade-in-0 zoom-in-95 ease-out'}`}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="model-modal-title"
                  >
                     <header className="flex justify-between items-center px-6 sm:px-8 pt-6 pb-4 border-b border-slate-700 flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 p-1 bg-slate-800 rounded-full flex-shrink-0" dangerouslySetInnerHTML={{ __html: selectedModel.icon }}></div>
                            <div className="flex flex-col">
                                <h2 id="model-modal-title" className="text-2xl sm:text-3xl font-semibold text-[#E2E8F0]">{selectedModel.name}</h2>
                                <div className="flex items-center mt-2" aria-label={`Rating: ${selectedModel.rating} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <StarIcon key={star} rating={selectedModel.rating} starIndex={star} />
                                    ))}
                                </div>
                                {selectedModel.isAgentic && (
                                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 mt-2 font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M12 8V4H8"/><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 2v2"/><path d="M9 2v2"/></svg>
                                        <span>Agentic Capabilities</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={handleCloseModelModal} 
                            className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                            aria-label={`Close details for ${selectedModel.name}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                     </header>
                    
                    <main className="overflow-y-auto px-6 sm:px-8 pb-8 pt-6">
                      <div 
                        className="text-[#94A3B8] text-base space-y-4 leading-relaxed animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out" 
                        style={{ animationDelay: '100ms' }}
                      >
                        {selectedModel.detailedDescription.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                      </div>

                      <div 
                          className="mt-8 pt-6 border-t border-slate-700 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out"
                          style={{ animationDelay: '200ms' }}
                      >
                          <h3 className="text-lg font-semibold text-[#E2E8F0] mb-4">Key Strengths</h3>
                          <ul className="space-y-2 list-disc list-inside text-[#94A3B8]">
                              {selectedModel.strengths.map(strength => (
                                  <li key={strength}><span className="text-[#E2E8F0]">{strength}</span></li>
                              ))}
                          </ul>
                      </div>
                      
                      <div 
                        className="mt-8 pt-6 border-t border-slate-700 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out"
                        style={{ animationDelay: '300ms' }}
                      >
                          <h3 className="text-lg font-semibold text-[#E2E8F0] mb-4">Use Cases</h3>
                          <div className="space-y-4">
                              {selectedModel.useCases.map(useCase => (
                                  <div key={useCase.title}>
                                      <h4 className="font-semibold text-[#E2E8F0]">{useCase.title}</h4>
                                      <p className="text-[#94A3B8]">{useCase.description}</p>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div 
                        className="mt-8 pt-6 border-t border-slate-700 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out"
                        style={{ animationDelay: '400ms' }}
                      >
                          <h3 className="text-lg font-semibold text-[#E2E8F0] mb-4">You might also like</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {relatedModels.map(relatedModel => (
                                  <button
                                      key={relatedModel.name}
                                      onClick={() => handleOpenModelModal(relatedModel)}
                                      className="group p-4 bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 rounded-lg transition-all duration-300 text-left"
                                      aria-label={`Learn more about ${relatedModel.name}`}
                                  >
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 flex-shrink-0" dangerouslySetInnerHTML={{ __html: relatedModel.icon }}></div>
                                          <span className="font-bold text-[#E2E8F0] group-hover:text-[#F97316] transition-colors">{relatedModel.name}</span>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                    </main>

                    <footer 
                        className="mt-auto px-6 sm:px-8 py-4 bg-slate-900/50 border-t border-slate-700 rounded-b-2xl flex-shrink-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out"
                        style={{ animationDelay: '500ms' }}
                    >
                        <a 
                            href={selectedModel.documentationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 group"
                        >
                           Official Documentation <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                        </a>
                    </footer>
                  </div>
                </div>
            )}

        </section>
    );
};

export default Hero;