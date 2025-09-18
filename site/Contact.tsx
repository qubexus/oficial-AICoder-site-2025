import React from 'react';

const Contact: React.FC = () => {
  return (
    <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
      <div className="content-wrapper">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Have questions about our courses, partnerships, or anything else? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  className="w-full bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none transition duration-300 resize-none"
                />
              </div>
              <div className="text-center">
                 <button
                    type="submit"
                    className="relative inline-flex items-center justify-center px-8 py-3 bg-[#F97316] text-[#E2E8F0] font-bold rounded-lg group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#F97316]/40 transform hover:-translate-y-1 hover:brightness-110"
                 >
                    <span className="relative">Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;