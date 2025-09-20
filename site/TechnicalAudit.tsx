import React, { useState } from 'react';

const categories = ['HTML', 'CSS', 'JavaScript', 'Performance', 'Security', 'SEO', 'Accessibility'];

const AuditAvatar: React.FC = () => (
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-6m-6 2h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 17h.01M15 17h.01M15 14h.01M18 11h.01M18 14h.01M18 17h.01M18 7h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);

const TechnicalAudit: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleRunAudit = () => {
        setIsRunning(true);
        setIsComplete(false);
        setTimeout(() => {
            setIsRunning(false);
            setIsComplete(true);
        }, 3000); // Simulate audit duration
    };

    return (
        <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
                        Technical Audit
                    </h1>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        Analyze your web application against best practices for performance, accessibility, SEO, and more.
                    </p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#E2E8F0]">
                                🔍 Comprehensive Technical Audit
                            </h2>
                            <AuditAvatar />
                        </div>

                        <div className="mt-6 border-b border-slate-700">
                            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 -mb-px">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 whitespace-nowrap ${
                                            selectedCategory === cat
                                                ? 'bg-[#F97316] text-[#E2E8F0]'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 min-h-[150px]">
                            {/* Static content for now as provided */}
                             <p className="font-semibold text-lg text-[#E2E8F0]">Is the code suitable for all pages?</p>
                             <div className="flex items-center gap-2 mt-2">
                                <span className="text-green-400 font-bold">✅ YES, because:</span>
                             </div>
                             <ul className="list-disc ml-6 mt-2 text-slate-300 space-y-1 text-sm sm:text-base">
                                <li>The component is self-contained and does not depend on specific page content.</li>
                                <li>Configuration for scoring and categories is flexible and can be adapted.</li>
                                <li>It supports responsive design and dark mode, fitting into a modern UI.</li>
                                <li>Leverages shared UI components, ensuring design consistency across the app.</li>
                            </ul>
                        </div>
                        
                        {isComplete && !isRunning && (
                             <div className="mt-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-300 text-center">
                                <p className="font-bold">Audit Complete!</p>
                                <p className="text-sm">No critical issues found for the <span className="font-semibold">{selectedCategory}</span> category.</p>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-4 mt-8">
                             <button 
                                type="button" 
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                disabled={isRunning}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRunAudit}
                                disabled={isRunning}
                                className="relative inline-flex items-center justify-center px-6 py-2 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:brightness-110"
                            >
                                {isRunning && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span className="relative">
                                    {isRunning ? 'Running Audit...' : 'Run Audit'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TechnicalAudit;
