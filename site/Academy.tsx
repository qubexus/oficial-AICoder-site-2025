import React from 'react';
import { learningPathData } from '../data/content';

const LearningPathNode: React.FC<{ status: 'completed' | 'current' | 'upcoming' }> = ({ status }) => {
  if (status === 'completed') {
    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center" aria-label="Module completed">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E2E8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (status === 'current') {
    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F97316] relative" aria-label="Current module">
        <div className="absolute inset-0 rounded-full bg-[#F97316] animate-ping"></div>
        <div className="relative w-full h-full rounded-full bg-[#F97316]"></div>
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full border-4 border-slate-700 bg-[#1E293B]" aria-label="Upcoming module"></div>
  );
};


const Academy: React.FC = () => {
  const completedCount = learningPathData.filter(item => item.status === 'completed').length;
  const progressPercentage = learningPathData.length > 1 ? (completedCount / (learningPathData.length - 1)) * 100 : 0;

  return (
    <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
      <div className="content-wrapper">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
            Welcome to the Academy
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Our curriculum is meticulously designed to take you from a novice to an expert in the art and science of AI and prompt engineering.
          </p>
        </div>
        
        <section className="mt-20 sm:mt-24">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#E2E8F0]">
                    Your Learning Path
                </h2>
                <p className="mt-4 text-lg text-[#94A3B8]">
                    A step-by-step journey through our comprehensive curriculum.
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Timeline Line with Progress */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-700" aria-hidden="true">
                   <div className="h-full w-full bg-[#F97316] transition-all duration-1000 ease-out" style={{ clipPath: `inset(0 0 ${100 - progressPercentage}% 0)` }}></div>
                </div>

                <div className="space-y-12">
                    {learningPathData.map((item) => {
                       const isUpcoming = item.status === 'upcoming';
                       return (
                        <div key={item.id} className="relative flex items-start gap-6 sm:gap-8">
                            <div className="relative z-10">
                                <LearningPathNode status={item.status} />
                            </div>
                            <div className={`pt-1 transition-opacity duration-500 ${isUpcoming ? 'opacity-50' : 'opacity-100'}`}>
                                <h3 className={`text-xl sm:text-2xl font-semibold ${isUpcoming ? 'text-slate-500' : 'text-[#E2E8F0]'}`}>
                                    {item.title}
                                </h3>
                                <p className={`mt-2 text-base ${isUpcoming ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                       );
                    })}
                </div>
            </div>
        </section>

        <div className="mt-20 space-y-12">
          <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
            <h2 className="text-2xl font-semibold text-[#E2E8F0]">Core Curriculum</h2>
            <p className="mt-2 text-[#94A3B8]">
              Our foundational courses cover everything you need to know to get started. We believe in a hands-on approach, combining theoretical knowledge with practical application.
            </p>
            <ul className="mt-4 list-disc list-inside text-[#E2E8F0] space-y-2">
              <li>Introduction to Large Language Models (LLMs)</li>
              <li>Advanced Prompting Techniques for various models</li>
              <li>Ethical Considerations in AI Development</li>
              <li>Fine-tuning and Customizing Models</li>
              <li>Building AI-powered Applications</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
            <h2 className="text-2xl font-semibold text-[#E2E8F0]">Learning Philosophy</h2>
            <p className="mt-2 text-[#94A3B8]">
              We empower our students by fostering a collaborative and innovative learning environment. Our project-based learning ensures that you not only learn concepts but also know how to apply them to solve real-world problems, building a robust portfolio along the way.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Academy;