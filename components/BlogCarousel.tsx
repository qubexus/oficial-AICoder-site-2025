import React, { useState, useEffect, useCallback, useRef } from 'react';
import { blogData } from '../data/blogData';
import { useOnScreen } from '../hooks/useOnScreen';

interface BlogCarouselProps {
    onNavigate: (path: string) => void;
}

// Sort posts by date, newest first
const sortedPosts = [...blogData].sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());

const BlogCarousel: React.FC<BlogCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [containerRef, isVisible] = useOnScreen({ threshold: 0.5, triggerOnce: false });

    const handleNavigate = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };
    
    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedPosts.length);
    }, []);

    const goToPrev = () => {
        setUserInteracted(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedPosts.length) % sortedPosts.length);
    };

    const goToIndex = (index: number) => {
        setUserInteracted(true);
        setCurrentIndex(index);
    };

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    useEffect(() => {
        resetTimer();
        if (!isPaused && isVisible && !userInteracted) {
            timerRef.current = setTimeout(goToNext, 5000);
        }
        return () => resetTimer();
    }, [currentIndex, isPaused, isVisible, userInteracted, goToNext, resetTimer]);

    const handleMouseEnter = () => {
        setIsPaused(true);
        resetTimer();
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <div 
            ref={containerRef}
            className="relative flex flex-col justify-between h-40 sm:h-48 bg-fuchsia-200 text-gray-800 rounded-xl p-4 sm:p-6 overflow-hidden transition-all duration-300 ease-in-out group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-roledescription="carousel"
            aria-label="Latest blog posts"
        >
            <div className="relative flex-grow overflow-hidden">
                {sortedPosts.map((post, index) => (
                    <a 
                        href={`#/blog/${post.slug}`} 
                        onClick={(e) => handleNavigate(e, `/blog/${post.slug}`)}
                        key={post.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out block focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fuchsia-800 rounded-lg ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        aria-hidden={index !== currentIndex}
                        tabIndex={index === currentIndex ? 0 : -1}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider bg-black/10 text-fuchsia-900 px-2 py-1 rounded">
                            {post.category}
                        </span>
                        <h3 className="mt-2 text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                            {post.title}
                        </h3>
                    </a>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4 z-10">
                 {/* Dots */}
                <div className="flex gap-2">
                    {sortedPosts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-gray-900 scale-125' : 'bg-gray-900/30 hover:bg-gray-900/60'}`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={goToPrev} 
                        className="p-1 rounded-full bg-gray-900/20 hover:bg-gray-900/40 text-gray-900 transition-colors"
                        aria-label="Previous post"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => { setUserInteracted(true); goToNext(); }} 
                        className="p-1 rounded-full bg-gray-900/20 hover:bg-gray-900/40 text-gray-900 transition-colors"
                        aria-label="Next post"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCarousel;
