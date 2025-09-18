import React from 'react';
import { aiModels, AIModel } from '../data/content';

// Star icon component for ratings
export const StarIcon: React.FC<{ rating: number; starIndex: number; }> = ({ rating, starIndex }) => {
    const isFilled = rating >= starIndex;
    const isHalf = rating < starIndex && rating > starIndex - 1;

    // Simplified half-star without gradient for flat design
    if (isHalf) {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F97316" className="text-amber-500">
                <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z" fill="#1E293B" />
            </svg>
        );
    }

    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={isFilled ? 'text-[#F97316]' : 'text-[#1E293B]'}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
};
interface AIModelCardProps {
    model: AIModel;
    onModelClick: (model: AIModel) => void;
}

const AIModelCard: React.FC<AIModelCardProps> = ({ model, onModelClick }) => {
    return (
        <button
            onClick={() => onModelClick(model)}
            aria-label={`Learn more about ${model.name}`}
            className="group w-full bg-[rgba(42,59,87,0.6)] backdrop-blur-sm p-4 rounded-lg border border-[#2A3B57] text-left transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#F97316] hover:shadow-lg hover:shadow-[#F97316]/20 hover:-translate-y-1"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 p-1 bg-[#1E293B] rounded-full" dangerouslySetInnerHTML={{ __html: model.icon }}></div>
                <div className="flex-1">
                    <h4 className="font-semibold text-[#E2E8F0]">{model.name}</h4>
                    <div className="flex items-center mt-1" aria-label={`Rating: ${model.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <StarIcon key={star} rating={model.rating} starIndex={star} />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm text-[#94A3B8] mt-3">{model.description}</p>
            {model.isAgentic && (
                <div className="flex items-center gap-1.5 text-xs text-[#2DD4BF] mt-3 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M12 8V4H8"/><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 2v2"/><path d="M9 2v2"/></svg>
                    <span>Agentic Capabilities</span>
                </div>
            )}
        </button>
    );
};

const MemoizedAIModelCard = React.memo(AIModelCard);

const AIModelCardSkeleton: React.FC = () => {
    return (
        <div className="w-full bg-[rgba(42,59,87,0.6)] backdrop-blur-sm p-4 rounded-lg border border-[#2A3B57]">
            <div className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 flex-shrink-0 bg-slate-700 rounded-full"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
            </div>
            <div className="mt-4 space-y-2 animate-pulse">
                <div className="h-3 bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
            </div>
            <div className="mt-4 h-4 bg-slate-700 rounded w-2/5 animate-pulse"></div>
        </div>
    );
};

interface AILogosProps {
    onModelClick: (model: AIModel) => void;
}

const AILogos: React.FC<AILogosProps> = ({ onModelClick }) => {
    return (
        <div className="py-8">
             <h3 className="text-sm md:text-base font-semibold text-center text-[#E2E8F0] mb-8 uppercase tracking-wider">
                Featuring Leading AI Models
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {aiModels.map(model => (
                    <MemoizedAIModelCard key={model.name} model={model} onModelClick={onModelClick} />
                 ))}
             </div>
        </div>
    );
};

export default AILogos;
