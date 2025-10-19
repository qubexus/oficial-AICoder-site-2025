import React from 'react';
import type { AppContent } from '../types';
import AnimatedAicoderLogo from './AnimatedAicoderLogo';
import RobotGraphic from './RobotGraphic';
import BlogCarousel from './BlogCarousel';

interface HeroProps {
    content: AppContent;
    onNavigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };

    const cardStyles = "flex items-center justify-center text-xl sm:text-2xl font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110";

    return (
        <section className="pt-28 sm:pt-32 xl:pt-36 pb-12">
            <div className="content-wrapper space-y-4">

                {/* Top Row: Animation aligned with content */}
                <div className="overflow-hidden mb-4">
                    <AnimatedAicoderLogo />
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left side grid (6 cards) */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <BlogCarousel onNavigate={onNavigate} />
                        <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className={`${cardStyles} h-40 sm:h-48 bg-amber-400 text-gray-800`}>3 News</a>
                        <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className={`${cardStyles} h-40 sm:h-48 bg-cyan-200 text-gray-800`}>5 News</a>
                        <a href="#/technical-audit" onClick={(e) => handleNavigate(e, '/technical-audit')} className={`${cardStyles} h-40 sm:h-48 bg-stone-600 text-white`}>7 Project</a>
                        <a href="#/image-generator" onClick={(e) => handleNavigate(e, '/image-generator')} className={`${cardStyles} h-40 sm:h-48 bg-stone-600 text-white`}>8 Project</a>
                        <a href="#/academy" onClick={(e) => handleNavigate(e, '/academy')} className={`${cardStyles} h-40 sm:h-48 bg-amber-800 text-white`}>9 Academy</a>
                    </div>

                    {/* Right side (Robot Graphic restored) */}
                    <div className="lg:col-span-1 h-full min-h-[20rem] sm:min-h-[24rem] lg:min-h-0 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3),_inset_0_0_20px_rgba(0,0,0,0.5)] border border-slate-700/50">
                        <RobotGraphic />
                    </div>
                </div>

                {/* New Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Video Section (Replaced Rectangle) */}
                    <div className="md:col-span-2 h-auto flex items-center justify-center bg-slate-900/80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3),_inset_0_0_20px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden">
                        <div className="w-full h-full aspect-video relative">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/aircAruvnKk?autoplay=1&mute=1&loop=1&playlist=aircAruvnKk&controls=0&showinfo=0&rel=0"
                                title="AI Coder Introduction Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    {/* Square */}
                    <a href="#/" onClick={(e) => handleNavigate(e, '/')} className={`${cardStyles} md:col-span-1 h-40 sm:h-48 bg-indigo-800 text-white`}>
                        New Square
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Hero;
