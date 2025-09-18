import React, { useRef, useEffect, useState } from 'react';
import { historyTimelineData } from '../data/content';

const TimelineItem: React.FC<{ data: typeof historyTimelineData[0]; index: number; isVisible: boolean }> = ({ data, index, isVisible }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="relative h-48">
            <div className={`absolute top-1/2 -mt-2 w-4 h-4 bg-[#1E293B] border-2 border-[#A78BFA] rounded-full left-1/2 -ml-2 z-10 transition-transform duration-500 ease-in-out ${isVisible ? 'scale-100' : 'scale-0'}`}></div>
            <div 
                className={`absolute top-1/2 -translate-y-1/2 w-5/12 p-6 rounded-xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] transition-all duration-500 ease-in-out 
                ${isEven ? 'right-1/2 mr-8 text-right' : 'left-1/2 ml-8 text-left'}
                ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? 'translate-x-4' : '-translate-x-4'}`}`}
            >
                <p className="text-2xl font-semibold text-[#94A3B8] mb-1">{data.year}</p>
                <h3 className="text-xl font-semibold text-[#E2E8F0] mb-3">{data.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{data.description}</p>
            </div>
        </div>
    );
};

const Timeline: React.FC = () => {
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);
    const [visibleItems, setVisibleItems] = useState(() => Array(historyTimelineData.length).fill(false));

    useEffect(() => {
        const handleScroll = () => {
            if (timelineContainerRef.current && itemsContainerRef.current) {
                const { top, height } = timelineContainerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                const scrollAmount = viewportHeight - top;
                const percentage = Math.min(100, Math.max(0, (scrollAmount / height) * 100));
                
                setLineHeight(percentage);

                // Check for item visibility based on the line's progress
                const newVisibleItems = [...visibleItems];
                const containerHeight = itemsContainerRef.current.offsetHeight;
                let changed = false;

                Array.from(itemsContainerRef.current.children).forEach((child, index) => {
                    if (newVisibleItems[index]) return; // Already visible, skip calculation

                    const item = child as HTMLElement;
                    const itemTop = item.offsetTop;
                    const itemHeight = item.offsetHeight;
                    
                    const itemMiddlePosition = itemTop + itemHeight / 2;
                    const itemPositionPercent = (itemMiddlePosition / containerHeight) * 100;
                    
                    if (percentage >= itemPositionPercent) {
                        newVisibleItems[index] = true;
                        changed = true;
                    }
                });

                if (changed) {
                    setVisibleItems(newVisibleItems);
                }
            }
        };

        let ticking = false;
        const animationFrameHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', animationFrameHandler, { passive: true });
        animationFrameHandler(); // Initial check on load

        return () => {
            window.removeEventListener('scroll', animationFrameHandler);
        };
    }, [visibleItems]);

    return (
        <section className="py-20 sm:py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E2E8F0]">
                        A Journey Through AI History
                    </h2>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        From theoretical concepts to world-changing technology, explore the milestones that shaped Artificial Intelligence.
                    </p>
                </div>
                <div ref={timelineContainerRef} className="relative mt-20">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-[#2A3B57] w-1 h-full" aria-hidden="true">
                       <div 
                         className="bg-[#A78BFA] w-full" 
                         style={{ height: `${lineHeight}%` }}
                       ></div>
                    </div>
                    <div ref={itemsContainerRef}>
                        {historyTimelineData.map((item, index) => (
                            <TimelineItem key={item.title} data={item} index={index} isVisible={visibleItems[index]} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;