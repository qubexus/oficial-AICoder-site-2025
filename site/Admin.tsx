import React, { useState } from 'react';
// FIX: Use `import type` to break circular dependency with App.tsx
import type { AppContent } from '../types';

interface AdminProps {
  content: AppContent;
  onContentChange: (newContent: AppContent) => void;
  onNavigate: (path: string) => void;
}

const Admin: React.FC<AdminProps> = ({ content, onContentChange, onNavigate }) => {
  const [localContent, setLocalContent] = useState(content);
  const [isSaved, setIsSaved] = useState(false);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalContent(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContentChange(localContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide message after 2s
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl">
      <h1 className="text-3xl font-semibold text-[#E2E8F0] mb-8 text-center">Admin Panel</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Card Titles Section */}
        <section>
          <h2 className="text-xl font-semibold text-[#E2E8F0] border-b border-[#2A3B57] pb-2 mb-4">Card Titles</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="aiModelsText" className="block text-sm font-medium text-[#94A3B8] mb-2">
                AI News Card Title
              </label>
              <input
                type="text"
                id="aiModelsText"
                name="aiModelsText"
                value={localContent.aiModelsText}
                onChange={handleChange}
                className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                aria-label="AI News Card Title Input"
              />
            </div>

            <div>
              <label htmlFor="promptLibrariesText" className="block text-sm font-medium text-[#94A3B8] mb-2">
                Prompt Libraries Card Title
              </label>
              <input
                type="text"
                id="promptLibrariesText"
                name="promptLibrariesText"
                value={localContent.promptLibrariesText}
                onChange={handleChange}
                className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                aria-label="Prompt Libraries Card Title Input"
              />
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section>
            <h2 className="text-xl font-semibold text-[#E2E8F0] border-b border-[#2A3B57] pb-2 mb-4">"About Us" Section</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="aboutTitle" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="aboutTitle"
                        name="aboutTitle"
                        value={localContent.aboutTitle}
                        onChange={handleChange}
                        className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                    />
                </div>
                <div>
                    <label htmlFor="aboutDescription" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Description
                    </label>
                    <textarea
                        id="aboutDescription"
                        name="aboutDescription"
                        value={localContent.aboutDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300 resize-none"
                    />
                </div>
            </div>
        </section>
        
        {/* Code Generator Section */}
        <section>
            <h2 className="text-xl font-semibold text-[#E2E8F0] border-b border-[#2A3B57] pb-2 mb-4">Code Generator Section</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="generatorTitle" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="generatorTitle"
                        name="generatorTitle"
                        value={localContent.generatorTitle}
                        onChange={handleChange}
                        className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                    />
                </div>
                <div>
                    <label htmlFor="generatorDescription" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Description
                    </label>
                    <textarea
                        id="generatorDescription"
                        name="generatorDescription"
                        value={localContent.generatorDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300 resize-none"
                    />
                </div>
                <div>
                    <label htmlFor="generatorPlaceholder" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Input Placeholder
                    </label>
                    <input
                        type="text"
                        id="generatorPlaceholder"
                        name="generatorPlaceholder"
                        value={localContent.generatorPlaceholder}
                        onChange={handleChange}
                        className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                    />
                </div>
            </div>
        </section>

        <div className="flex items-center justify-between pt-4">
            <a href="#/" onClick={(e) => handleNavigate(e, '/')} className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 group">
              &larr; <span className="inline-block transition-transform group-hover:-translate-x-1">Back to Home</span>
            </a>
            <div className="flex items-center gap-4">
              {isSaved && <p className="text-green-400 text-sm" role="status">Saved!</p>}
              <button
                  type="submit"
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 transform hover:-translate-y-1 hover:brightness-110"
              >
                  <span className="relative">Save Changes</span>
              </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Admin;