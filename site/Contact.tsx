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

        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Column */}
          <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#E2E8F0] mb-6">Contact Information</h2>
            <p className="text-[#94A3B8] mb-8">
              Feel free to reach out to us through any of the following methods. We aim to respond to all inquiries within 24 business hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E293B]/50 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#E2E8F0]">Phone</h3>
                  <a href="tel:+15551234567" className="text-[#94A3B8] hover:text-[#F97316] transition-colors">+1 (555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E293B]/50 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#E2E8F0]">Email</h3>
                  <a href="mailto:contact@aicoder.com" className="text-[#94A3B8] hover:text-[#F97316] transition-colors">contact@aicoder.com</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Column */}
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