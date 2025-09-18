import React, { useEffect, useState } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { statsData } from '../data/content';

// Component to animate a number from 0 to a target value
const AnimatedCounter: React.FC<{ value: number; isVisible: boolean }> = ({ value, isVisible }) => {
    const [count, setCount] = useState(0);
    const duration = 2000; // Animation duration in milliseconds

    useEffect(() => {
        if (!isVisible) return;
        
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            
            setCount(Math.floor(easedProgress * value));
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(value); // Ensure it ends on the exact value
            }
        };
        
        window.requestAnimationFrame(step);

    }, [value, isVisible]);

    return <span>{count.toLocaleString()}</span>;
};


const StatCard: React.FC<{ stat: typeof statsData[0], index: number, isVisible: boolean }> = ({ stat, index, isVisible }) => {
    const delay = index * 150;
    
    return (
        <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: `${delay}ms`}}>
            <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-[#F97316]">
                {/* FIX: Render SVG icon string using dangerouslySetInnerHTML */}
                <div className="bg-[#1E293B]/50 p-3 rounded-full mb-4" dangerouslySetInnerHTML={{ __html: stat.icon }}>
                </div>
                <p className="text-4xl lg:text-5xl font-semibold text-[#E2E8F0]">
                    <AnimatedCounter value={stat.value} isVisible={isVisible} />
                    {stat.suffix}
                </p>
                <h4 className="text-sm text-[#94A3B8] mt-2 uppercase tracking-wider">{stat.label}</h4>
            </div>
        </div>
    );
};

const Stats: React.FC = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.3, triggerOnce: true });

    return (
        <section ref={ref} className="py-20 sm:py-24">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">
                        Our Impact in Numbers
                    </h2>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        We are committed to fostering a vibrant community of AI innovators and professionals.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {statsData.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;