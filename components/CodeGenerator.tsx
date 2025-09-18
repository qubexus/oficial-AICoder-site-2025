import React, { useState, useCallback } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { AppContent } from '../types';

interface CodeGeneratorProps {
  content: Pick<AppContent, 'generatorTitle' | 'generatorDescription' | 'generatorPlaceholder'>;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ content }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setCopyCodeSuccess(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are an expert code generation assistant. You will be given a prompt describing a component, function, or logic. Generate clean, efficient, and well-documented code based on the user's request. Only output the code, without any extra explanations or markdown formatting like ```javascript ... ```. If the language isn't specified, default to React with TypeScript and Tailwind CSS.",
        },
      });
      
      const code = response.text;
      setGeneratedCode(code.trim());
    } catch (e) {
      console.error('Error generating code:', e);
      setError('Failed to generate code. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = useCallback(() => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopyCodeSuccess(true);
      setTimeout(() => {
        setCopyCodeSuccess(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      setError('Failed to copy code to clipboard.');
    });
  }, [generatedCode]);

  return (
    <div className="mt-20 sm:mt-24 xl:mt-32">
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">{content.generatorTitle}</h2>
            <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
                {content.generatorDescription}
            </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl shadow-black/20">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={content.generatorPlaceholder}
                    className="w-full h-24 bg-slate-800 text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-4 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300 resize-none"
                    disabled={isLoading}
                    aria-label="Code generation prompt"
                />
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleGenerateCode}
                        disabled={isLoading}
                        className="relative inline-flex items-center justify-center px-8 py-3 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:brightness-110"
                    >
                        <span className="relative">
                            {isLoading ? 'Generating...' : 'Generate Code'}
                        </span>
                    </button>
                </div>
            </div>
        </div>

        {error && (
            <div role="alert" className="mt-8 max-w-3xl mx-auto text-center bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                <p>{error}</p>
            </div>
        )}

        {generatedCode && (
            <div className="mt-8 max-w-3xl mx-auto" aria-live="polite">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">Generated Code:</h3>
                    <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-md text-[#94A3B8] hover:text-[#E2E8F0] transition-all duration-300 transform hover:scale-105"
                        aria-label="Copy generated code"
                    >
                        {copyCodeSuccess ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        )}
                        <span>{copyCodeSuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
                <div className="rounded-lg border border-slate-700 max-h-96 overflow-y-auto">
                    <SyntaxHighlighter
                        language="tsx"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1rem', background: '#111827' }}
                        codeTagProps={{ style: { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem' } }}
                        wrapLines={true}
                        showLineNumbers
                    >
                        {String(generatedCode).trim()}
                    </SyntaxHighlighter>
                </div>
            </div>
        )}
    </div>
  );
};

export default React.memo(CodeGenerator);