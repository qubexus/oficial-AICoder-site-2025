import React from 'react';
import type { AppContent } from '../types';
import RobotGraphic from './RobotGraphic';

interface HeroProps {
    content: AppContent;
    onNavigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };

    const cardStyles = "flex items-center justify-center text-2xl font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110";

    return (
        <section className="pt-28 sm:pt-32 xl:pt-36 pb-12">
            <div className="content-wrapper px-4 sm:px-8 space-y-4">
                {/* LOGOBANER */}
                <div className="h-40 md:h-60 flex items-center justify-center bg-blue-500 rounded-xl shadow-lg">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest">LOGOBANER</h2>
                </div>

                {/* Powitanie */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-8 h-40 flex items-center justify-center bg-yellow-200 text-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-center">Powitanie lewy kontener</h3>
                    </div>
                    <div className="p-8 h-40 flex items-center justify-center bg-yellow-200 text-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-center">Powitanie prawy kontener</h3>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left side grid */}
                    <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                        {/* News Row */}
                        <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className={`${cardStyles} h-48 bg-fuchsia-200 text-gray-800`}>2 News</a>
                        <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className={`${cardStyles} h-48 bg-amber-400 text-gray-800`}>3 News</a>
                        <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className={`${cardStyles} h-48 bg-cyan-200 text-gray-800`}>5 News</a>
                        {/* Project/Academy Row */}
                        <a href="#/technical-audit" onClick={(e) => handleNavigate(e, '/technical-audit')} className={`${cardStyles} h-48 bg-stone-600 text-white`}>7 Project</a>
                        <a href="#/image-generator" onClick={(e) => handleNavigate(e, '/image-generator')} className={`${cardStyles} h-48 bg-stone-600 text-white`}>8 Project</a>
                        <a href="#/academy" onClick={(e) => handleNavigate(e, '/academy')} className={`${cardStyles} h-48 bg-amber-800 text-white`}>9 Academy</a>
                    </div>

                    {/* Right side (Animation) */}
                    <div className="lg:col-span-1 h-full min-h-[24rem] lg:min-h-0 flex flex-col items-center justify-center bg-rose-200 text-gray-800 rounded-xl p-4 shadow-lg">
                         <h3 className="text-2xl font-semibold mb-4">4 Animacja</h3>
                         <div className="w-full h-full flex-grow">
                            <RobotGraphic />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;