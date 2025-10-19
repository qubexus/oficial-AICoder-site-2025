import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const AIModelModal: React.FC<{ model: AIModel; onClose: () => void }> = ({ model, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Match animation duration
    }, [onClose]);

    useEffect(() => {
        triggerRef.current = document.activeElement as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift+Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', trapFocus);
        document.body.style.overflow = 'hidden';
        
        // Focus the modal panel itself on open
        if (modalRef.current) modalRef.current.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', trapFocus);
            document.body.style.overflow = 'auto';
            if (triggerRef.current) {
                triggerRef.current.focus();
            }
        };
    }, [handleClose]);

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'animate-out fade-out-0' : 'animate-in fade-in-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-2xl bg-slate-900/80 backdrop-blur-2xl rounded-xl border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto transition-all duration-300 ${isClosing ? 'animate-out fade-out-0 zoom-out-95' : 'animate-in fade-in-0 zoom-in-95'}`}
            >
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0 p-1 bg-[#1E293B] rounded-full" dangerouslySetInnerHTML={{ __html: model.icon }} />
                        <div>
                            <h2 id="modal-title" className="text-2xl font-bold text-[#E2E8F0]">{model.name}</h2>
                            <div className="flex items-center mt-1" aria-label={`Rating: ${model.rating} out of 5 stars`}>
                                {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} rating={model.rating} starIndex={star} />)}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClose} className="p-2 text-slate-400 hover:text-white transition-colors rounded-full" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <p className="mt-6 text-slate-300 leading-relaxed">{model.detailedDescription}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-xs mb-2">Training Data</h4>
                        <p className="font-medium text-slate-200">{model.trainingDataSize}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-xs mb-2">Key Feature</h4>
                        <p className="font-medium text-slate-200">{model.strengths[0]}</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {model.strengths.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-amber-400 mb-2">Weaknesses</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {model.weaknesses.map(w => <li key={w}>{w}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold text-cyan-400 mb-3">Primary Use Cases</h4>
                    <div className="space-y-4">
                        {model.useCases.map(uc => (
                            <div key={uc.title} className="p-4 bg-slate-800/50 rounded-lg">
                                <p className="font-semibold text-slate-200">{uc.title}</p>
                                <p className="text-sm text-slate-400">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <a href={model.documentationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 transform hover:-translate-y-1 hover:brightness-110">
                        View Documentation
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};


const AILogos: React.FC = () => {
    const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

    const handleModelClick = useCallback((model: AIModel) => {
        setSelectedModel(model);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedModel(null);
    }, []);

    return (
        <>
            <div className="py-8 px-4 sm:px-8">
                 <h3 className="text-sm md:text-base font-semibold text-center text-[#E2E8F0] mb-8 uppercase tracking-wider">
                    Featuring Leading AI Models
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {aiModels.map(model => (
                        <MemoizedAIModelCard key={model.name} model={model} onModelClick={handleModelClick} />
                     ))}
                 </div>
            </div>
            {selectedModel && <AIModelModal model={selectedModel} onClose={handleCloseModal} />}
        </>
    );
};

export default AILogos;