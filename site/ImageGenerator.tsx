import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const ImageSkeleton: React.FC = () => (
    <div className="w-full aspect-square bg-slate-800/80 rounded-lg animate-pulse"></div>
);

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState<{src: string, index: number} | null>(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a descriptive prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setImages([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 4,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const imageBytesArray = response.generatedImages.map(img => img.image.imageBytes);
                setImages(imageBytesArray);
            } else {
                setError('The model did not return any images. Try a different prompt.');
            }

        } catch (e) {
            console.error("Error generating images:", e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`An error occurred while generating images: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDownload = useCallback((base64Image: string, index: number) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Image}`;
        const safePrompt = prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `aicoder_${safePrompt || 'generated'}_${index + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [prompt]);
    
    const handleOpenModal = (src: string, index: number) => {
        triggerRef.current = document.activeElement as HTMLElement;
        setSelectedImage({src, index});
        setIsModalClosing(false);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
        }, 300);
    }, []);
    
    // Accessibility: Focus trapping and ESC to close modal
    useEffect(() => {
        if (!selectedImage || !modalRef.current) {
            document.body.style.overflow = 'unset';
            return;
        }

        document.body.style.overflow = 'hidden';
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if(firstElement) firstElement.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleCloseModal();
            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift+Tab
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
            if (triggerRef.current) triggerRef.current.focus();
        };
    }, [selectedImage, handleCloseModal]);

    return (
        <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
                        AI Image Generator
                    </h1>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        Bring your ideas to life. Describe any image you can imagine, and our AI will create it for you in seconds.
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A cinematic photo of a robot reading a book in a futuristic library, neon lights, detailed."
                            className="w-full h-24 bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-4 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300 resize-none"
                            disabled={isLoading}
                            aria-label="Image generation prompt"
                        />
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading}
                                className="relative inline-flex items-center justify-center px-8 py-3 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:brightness-110"
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span className="relative">
                                    {isLoading ? 'Generating...' : 'Generate Images'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div role="alert" className="mt-8 max-w-3xl mx-auto text-center bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                        <p className="font-semibold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                <div className="mt-12">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => <ImageSkeleton key={i} />)}
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {images.map((img, index) => (
                                <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border-2 border-slate-700 shadow-lg">
                                    <img 
                                        src={`data:image/jpeg;base64,${img}`} 
                                        alt={`AI generated image for prompt: ${prompt}`}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button onClick={() => handleOpenModal(img, index)} className="p-3 bg-slate-800/80 rounded-full text-white hover:bg-[#F97316] transition-colors" aria-label="View larger image">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
                                        </button>
                                        <button onClick={() => handleDownload(img, index)} className="p-3 bg-slate-800/80 rounded-full text-white hover:bg-[#F97316] transition-colors" aria-label="Download image">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-16 border-2 border-dashed border-slate-700 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p className="mt-4 font-semibold">Your generated images will appear here</p>
                        </div>
                    )}
                </div>

                {/* Image Viewer Modal */}
                {selectedImage && (
                    <div
                        className={`fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModalClosing ? 'animate-out fade-out-0 ease-in' : 'animate-in fade-in-0 ease-out'}`}
                        onClick={handleCloseModal}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div
                            ref={modalRef}
                            className={`relative w-full max-w-4xl max-h-[90vh] transition-all duration-300 ${isModalClosing ? 'animate-out fade-out-0 zoom-out-95 ease-in' : 'animate-in fade-in-0 zoom-in-95 ease-out'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={`data:image/jpeg;base64,${selectedImage.src}`}
                                alt={`AI generated image for prompt: ${prompt}`}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                             <div className="absolute -top-4 -right-4 sm:top-2 sm:right-2 flex gap-2">
                                <button onClick={() => handleDownload(selectedImage.src, selectedImage.index)} className="p-3 bg-slate-800/80 rounded-full text-white hover:bg-[#F97316] transition-colors" aria-label="Download image">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </button>
                                <button onClick={handleCloseModal} className="p-3 bg-slate-800/80 rounded-full text-white hover:bg-[#F97316] transition-colors" aria-label="Close image viewer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ImageGenerator;