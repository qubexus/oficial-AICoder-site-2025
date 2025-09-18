import React from 'react';
import { teamMembers } from '../data/content';

const Team: React.FC = () => {
  return (
    <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
      <div className="content-wrapper">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
            Meet Our Team
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8]">
            A passionate group of educators, engineers, and ethicists dedicated to your success.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] text-center transition-all duration-300 hover:scale-105 hover:border-[#F97316]">
              <img 
                src={member.imageUrl} 
                alt={`Photo of ${member.name}`} 
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#1E293B]"
                loading="lazy"
                decoding="async"
              />
              <h3 className="mt-4 text-xl font-semibold text-[#E2E8F0]">{member.name}</h3>
              <p className="text-[#94A3B8] text-sm font-medium">{member.title}</p>
              <p className="mt-2 text-[#94A3B8] text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Team;