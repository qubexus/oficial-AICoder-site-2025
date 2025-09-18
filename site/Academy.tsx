import React from 'react';

const Academy: React.FC = () => {
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

        <div className="mt-16 space-y-12">
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