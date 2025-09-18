import React, { useState, useEffect } from 'react';

// Simplified InterstitialContent: animation is now handled by the parent
const InterstitialContent: React.FC<{title: string, description: string}> = ({ title, description }) => (
    <div className="text-center absolute inset-0 flex flex-col justify-center items-center">
        <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-semibold text-[#E2E8F0] mb-4">{title}</h3>
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 H200" stroke="#334155" strokeWidth="2"/>
            <path d="M0 10 H200" stroke="url(#fastForwardGradient)" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="200" dur="2s" repeatCount="indefinite" />
            </path>
            <defs>
                <linearGradient id="fastForwardGradient">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
            </defs>
        </svg>
        <p className="text-[#94A3B8] font-body max-w-xl text-sm sm:text-base xl:text-lg mt-4">{description}</p>
    </div>
);

interface InterstitialData {
    title: string;
    description: string;
}
interface TimelineItemData {
    year: string;
    pauseAfter: boolean;
    interstitial?: InterstitialData;
}
interface AutomatedTimelineProps {
    onIndexChange: (index: number) => void;
    data: TimelineItemData[];
}

const AutomatedTimeline: React.FC<AutomatedTimelineProps> = ({ onIndexChange, data }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [currentInterstitial, setCurrentInterstitial] = useState<InterstitialData | undefined>(undefined);

    useEffect(() => {
        onIndexChange(activeIndex);
    }, [activeIndex, onIndexChange]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isPaused) {
            timer = setTimeout(() => {
                setIsPaused(false);
                setActiveIndex(prevIndex => (prevIndex + 1) % data.length);
            }, 5500);
        } else {
            timer = setTimeout(() => {
                const currentEvent = data[activeIndex];
                if (currentEvent.pauseAfter) {
                    setCurrentInterstitial(currentEvent.interstitial);
                    setIsPaused(true);
                } else {
                    setActiveIndex(prevIndex => (prevIndex + 1) % data.length);
                }
            }, 7000);
        }

        return () => clearTimeout(timer);
    }, [activeIndex, isPaused, data]);
    
    const progressPercentage = (activeIndex / (data.length - 1)) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative w-full h-24 sm:h-28 xl:h-32 2xl:h-36 flex items-center justify-center overflow-hidden">
                <div
                    className={`absolute inset-0 w-full ease-in-out ${
                        isPaused
                            ? 'animate-in fade-in-0 zoom-in-95 duration-500'
                            : 'animate-out fade-out-0 zoom-out-95 duration-300'
                    }`}
                >
                    {currentInterstitial && (
                        <InterstitialContent title={currentInterstitial.title} description={currentInterstitial.description} />
                    )}
                </div>

                <div
                    className={`absolute inset-0 w-full flex items-center justify-center ease-in-out ${
                        !isPaused
                            ? 'animate-in fade-in-0 zoom-in-95 duration-500'
                            : 'animate-out fade-out-0 zoom-out-95 duration-300'
                    }`}
                >
                    <div className="w-full relative">
                        <div className="h-1 bg-[#334155] rounded-full">
                            <div
                                className="h-1 bg-[#A78BFA] rounded-full transition-all duration-1000 ease-linear"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between">
                            {data.map((item, index) => {
                                const isFirst = index === 0;
                                const isLast = index === data.length - 1;
                                const positionClass = isFirst
                                    ? 'left-0'
                                    : isLast
                                    ? 'right-0'
                                    : 'left-1/2 -translate-x-1/2';

                                return (
                                    <div key={index} className="flex flex-col items-center relative pt-4 xl:pt-5 group cursor-pointer">
                                        <div className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-[#A78BFA] ${index <= activeIndex ? 'bg-[#A78BFA]' : 'bg-[#334155]'} ${index === activeIndex && !isPaused ? 'animate-subtle-pulse' : ''}`}>
                                        </div>
                                        <span className={`absolute top-8 xl:top-10 text-[11px] sm:text-xs xl:text-sm font-semibold transition-all duration-300 ease-in-out group-hover:text-[#A78BFA] group-hover:scale-110 ${index === activeIndex ? 'text-[#E2E8F0]' : 'text-[#94A3B8]'} ${positionClass}`}>
                                            {item.year}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomatedTimeline;