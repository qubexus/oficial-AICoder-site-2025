
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

// --- TYPES ---
interface AuditFinding {
    type: 'error' | 'warning' | 'info' | 'success';
    description: string;
    details?: string;
    isFixable?: boolean;
}

interface AuditResult {
    score: number;
    summary: string;
    findings: AuditFinding[];
}

type AuditResults = Record<string, AuditResult>;

// --- MOCK DATA ---
const getInitialAuditResults = (): AuditResults => ({
    'Code Quality': {
        score: 95,
        summary: 'Code structure is clean and follows best practices, with minor areas for improvement.',
        findings: [
            { type: 'success', description: 'No unused CSS classes detected.' },
            { type: 'warning', description: 'Function `handleGenerateCode` has high cyclomatic complexity.', details: 'Consider refactoring into smaller functions in components/CodeGenerator.tsx.' },
            { type: 'info', description: 'Consider adding prop-types validation for 3 components.', details: 'components/Hero.tsx, components/Header.tsx, components/Footer.tsx' },
            { type: 'success', description: 'No deprecated libraries in use.' },
            { type: 'success', description: 'Consistent code formatting found across all .tsx files.' }
        ],
    },
    'Error Detection': {
        score: 100,
        summary: 'Application is stable and no client-side errors were detected.',
        findings: [
            { type: 'success', description: 'No JavaScript errors found on initial load.' },
            { type: 'success', description: 'No 404 errors for critical resources (JS, CSS).' },
            { type: 'success', description: 'API calls are handled gracefully with error boundaries.' },
        ],
    },
    'Link Validation': {
        score: 90,
        summary: 'Most links are functional, with one broken internal link found.',
        findings: [
            { type: 'error', description: '1 broken internal link found.', details: 'A link to `#/non-existent-page` was found in a temporary component.', isFixable: true },
            { type: 'success', description: 'All 25 external links are responding with HTTP 200 OK.' },
            { type: 'success', description: 'No mixed content (HTTP/HTTPS) issues found.' },
        ],
    },
    'Security': {
        score: 75,
        summary: 'Basic security measures are in place, but critical headers are missing.',
        findings: [
            { type: 'error', description: 'Missing Content-Security-Policy (CSP) header.', details: 'Implementing a strong CSP can prevent Cross-Site Scripting (XSS) attacks.', isFixable: true },
            { type: 'warning', description: 'Missing X-Frame-Options header.', details: 'This can help prevent clickjacking attacks.', isFixable: true },
            { type: 'success', description: 'No vulnerable library versions detected.' },
            { type: 'success', description: 'API key is correctly loaded from environment variables, not hardcoded.' },
        ],
    },
    'Pre-flight Checks': {
        score: 100,
        summary: 'A list of recommended scripts and checks to run before deploying the application to a live environment.',
        findings: [
            { type: 'info', description: 'Code Linting & Formatting', details: 'Run `npm run lint` and `npm run format` to ensure code consistency and catch syntax errors early.' },
            { type: 'info', description: 'Unit & Integration Tests', details: 'Execute the full test suite with `npm run test` to prevent regressions.' },
            { type: 'info', description: 'Dead Code Elimination', details: 'Use a tool like `ts-prune` or bundler analysis to identify and remove unused code.' },
            { type: 'info', description: 'Environment Variable Check', details: 'Ensure that no production secrets or API keys are present in version control. Use a `.env.example` file.' },
            { type: 'info', description: 'Bundle Size Analysis', details: 'Analyze the production bundle size using a tool like `webpack-bundle-analyzer` to identify large dependencies.' },
            { type: 'info', description: 'Cross-browser Testing', details: 'Test the application on the latest versions of major browsers (Chrome, Firefox, Safari, Edge).' },
        ],
    },
});

const categories = Object.keys(getInitialAuditResults());

// --- HELPER COMPONENTS ---

const AuditIcon: React.FC<{ type: AuditFinding['type'] }> = ({ type }) => {
    switch (type) {
        case 'error': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'warning': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
        case 'info': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'success': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        default: return null;
    }
};

const ScoreDonut: React.FC<{ score: number, size?: 'large' | 'small' }> = ({ score, size = 'large' }) => {
    const isLarge = size === 'large';
    const radius = isLarge ? 52 : 22;
    const strokeWidth = isLarge ? 10 : 6;
    const viewBox = isLarge ? "0 0 120 120" : "0 0 52 52";
    const center = isLarge ? 60 : 26;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'text-green-400';
    if (score < 90) colorClass = 'text-amber-400';
    if (score < 75) colorClass = 'text-red-400';
    
    return (
        <div className={`relative ${isLarge ? 'h-32 w-32' : 'h-14 w-14'}`}>
            <svg className="w-full h-full" viewBox={viewBox}>
                <circle className="text-slate-700" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={center} cy={center} />
                <circle
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{ strokeDashoffset: offset }}
                />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center font-bold ${colorClass} ${isLarge ? 'text-3xl' : 'text-base'}`}>
                {score}
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const TechnicalAudit: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [auditStatus, setAuditStatus] = useState<'idle' | 'running' | 'complete'>('idle');
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<AuditResults | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisContent, setAnalysisContent] = useState('');
    const [fixingFinding, setFixingFinding] = useState<string | null>(null);

    const overallScore = useMemo(() => {
        if (!results) return 0;
        const totalScore = Object.values(results).reduce((acc, curr) => acc + curr.score, 0);
        return Math.round(totalScore / Object.keys(results).length);
    }, [results]);

    const handleRunAudit = () => {
        setProgress(0);
        setResults(null);
        setAuditStatus('running');
    };
    
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (auditStatus === 'running') {
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setAuditStatus('complete');
                        setResults(getInitialAuditResults());
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [auditStatus]);

    const handleReset = () => {
        setAuditStatus('idle');
        setProgress(0);
        setResults(null);
        setSelectedCategory(categories[0]);
    };

    const handleAnalyzeClick = async (finding: AuditFinding) => {
        setIsModalOpen(true);
        setIsAnalyzing(true);
        setAnalysisContent('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `As a senior frontend engineer, explain the following website audit finding in simple terms. Describe the potential impact and suggest a concrete code-level solution. Finding: "${finding.description}". Details: "${finding.details || 'N/A'}"`;
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setAnalysisContent(response.text);
        } catch (error) {
            console.error("Gemini API error:", error);
            setAnalysisContent("Sorry, an error occurred while analyzing this issue. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const handleFixClick = (category: string, findingIndex: number) => {
        const findingKey = `${category}-${findingIndex}`;
        setFixingFinding(findingKey);

        setTimeout(() => {
            setResults(prevResults => {
                if (!prevResults) return null;
                const newResults = JSON.parse(JSON.stringify(prevResults));
                const findingToFix = newResults[category].findings[findingIndex];
                
                const scoreIncrease = findingToFix.type === 'error' ? 15 : 10;
                newResults[category].score = Math.min(100, newResults[category].score + scoreIncrease);
                
                findingToFix.type = 'success';
                findingToFix.description = `[FIXED] ${findingToFix.description}`;
                
                return newResults;
            });
            setFixingFinding(null);
        }, 1500);
    };

    const renderContent = () => {
        if (auditStatus === 'idle') return <div className="text-center text-slate-400 py-12"><p>Click "Run Audit" to analyze the current state of the application.</p></div>;
        if (auditStatus === 'running') return (
            <div className="py-12">
                <div className="text-center mb-4">
                    <p className="text-lg font-semibold text-slate-200">Analyzing... {progress}%</p>
                    <p className="text-sm text-slate-400">Please wait while we check your application.</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-2.5 rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>
            </div>
        );

        if (auditStatus === 'complete' && results) {
            const categoryResult = results[selectedCategory];
            return (
                <div className="animate-in fade-in-0 duration-500">
                    <div className="space-y-3">
                        {categoryResult.findings.map((finding, index) => {
                            const findingKey = `${selectedCategory}-${index}`;
                            const isFixing = fixingFinding === findingKey;
                            return (
                                <div key={index} className={`flex items-start gap-4 p-3 rounded-md transition-colors ${finding.type === 'success' ? 'bg-green-900/20' : 'bg-slate-800/30'}`}>
                                    <div className="flex-shrink-0 pt-1"><AuditIcon type={finding.type} /></div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-200">{finding.description}</p>
                                        {finding.details && <p className="text-sm text-slate-400 mt-1 font-mono">{finding.details}</p>}
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        {(finding.type === 'error' || finding.type === 'warning') && (
                                            <>
                                                <button onClick={() => handleAnalyzeClick(finding)} className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Analyze finding">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                </button>
                                                {finding.isFixable && (
                                                    <button onClick={() => handleFixClick(selectedCategory, index)} disabled={isFixing} className="p-1.5 text-slate-400 hover:text-orange-400 transition-colors disabled:opacity-50 disabled:cursor-wait" aria-label="Fix finding">
                                                        {isFixing ? 
                                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>
                                                        }
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">Technical Site Audit</h1>
                    <p className="mt-4 text-lg text-[#94A3B8]">An automated analysis of this application against web development best practices, with AI-powered insights.</p>
                </div>

                <div className="mt-16 max-w-5xl mx-auto">
                    <div className="bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,13,184,0.1)] shadow-2xl">
                        {auditStatus === 'complete' && results && (
                            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-800/50 rounded-lg mb-6 border-b border-slate-700 pb-6">
                                <ScoreDonut score={overallScore} size="large" />
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-white">Overall Score</h3>
                                    <p className="text-slate-300 mt-1">A weighted average of all categories. Fix errors to improve your score.</p>
                                </div>
                                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-center sm:text-left">
                                    {Object.entries(results).map(([cat, res]) => (
                                        <div key={cat} className="flex items-center gap-2">
                                            <ScoreDonut score={res.score} size="small" />
                                            <span className="text-sm font-semibold text-slate-300">{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="border-b border-slate-700">
                            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 -mb-px no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setSelectedCategory(cat)} disabled={auditStatus === 'running'} className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 whitespace-nowrap disabled:opacity-50 ${selectedCategory === cat ? 'bg-[#F97316] text-[#E2E8F0]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 min-h-[250px]">{renderContent()}</div>
                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
                            {auditStatus === 'complete' && <button onClick={handleReset} className="px-6 py-2 bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors hover:bg-slate-600">Run Again</button>}
                            <button onClick={handleRunAudit} disabled={auditStatus === 'running'} className="relative inline-flex items-center justify-center px-6 py-2 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:brightness-110">
                                {auditStatus === 'running' && <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                <span className="relative">{auditStatus === 'running' ? 'Running...' : 'Run Audit'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in-0" onClick={() => setIsModalOpen(false)} role="dialog" aria-modal="true">
                    <div className="w-full max-w-2xl bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-6 sm:p-8 animate-in fade-in-0 zoom-in-95" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[#E2E8F0]">AI Analysis</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors rounded-full" aria-label="Close modal">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        {isAnalyzing ? (
                            <div className="min-h-[200px] flex items-center justify-center">
                                <svg className="animate-spin h-8 w-8 text-[#F97316]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            </div>
                        ) : (
                            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap">{analysisContent}</div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default TechnicalAudit;
