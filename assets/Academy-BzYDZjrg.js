import{j as e}from"./index-JmityXJu.js";import{l as s}from"./content-Dlea2wMM.js";const n=({status:t})=>t==="completed"?e.jsx("div",{className:"flex-shrink-0 w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center","aria-label":"Module completed",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-[#E2E8F0]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}):t==="current"?e.jsxs("div",{className:"flex-shrink-0 w-8 h-8 rounded-full bg-[#F97316] relative","aria-label":"Current module",children:[e.jsx("div",{className:"absolute inset-0 rounded-full bg-[#F97316] animate-ping"}),e.jsx("div",{className:"relative w-full h-full rounded-full bg-[#F97316]"})]}):e.jsx("div",{className:"flex-shrink-0 w-8 h-8 rounded-full border-4 border-slate-700 bg-[#1E293B]","aria-label":"Upcoming module"}),i=()=>e.jsxs("div",{className:"relative flex justify-center items-center h-48 -my-8 sm:-my-4",children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');

                .animated-logo-container {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: clamp(3rem, 12vw, 6rem);
                    font-weight: 700;
                    letter-spacing: -0.05em;
                    color: #E2E8F0;
                    position: relative;
                    text-align: center;
                }

                .animated-logo-container .layer {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    white-space: nowrap;
                    mix-blend-mode: screen;
                    pointer-events: none;
                }

                .layer-1 {
                    color: #F97316;
                    animation: layer-anim-1 4s infinite alternate;
                }

                .layer-2 {
                    color: #2DD4BF;
                    animation: layer-anim-2 4s infinite alternate;
                }

                .layer-3 {
                    color: #A78BFA;
                    animation: layer-anim-3 4s infinite alternate;
                }
                
                .base-text {
                    position: relative;
                    z-index: 1;
                }

                @keyframes layer-anim-1 {
                    0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.8; }
                    100% { transform: translate(-48%, -52%) scale(1.02) rotate(0.5deg); opacity: 0.5; }
                }

                @keyframes layer-anim-2 {
                    0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.8; }
                    100% { transform: translate(-52%, -48%) scale(1.03) rotate(-0.5deg); opacity: 0.5; }
                }
                
                @keyframes layer-anim-3 {
                    0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.3; }
                    100% { transform: translate(-50%, -50%) scale(0.98) rotate(0deg); opacity: 0.1; }
                }
                `}),e.jsxs("div",{className:"animated-logo-container",children:[e.jsx("span",{className:"base-text",children:"Academy"}),e.jsx("span",{className:"layer layer-1","aria-hidden":"true",children:"Academy"}),e.jsx("span",{className:"layer layer-2","aria-hidden":"true",children:"Academy"}),e.jsx("span",{className:"layer layer-3","aria-hidden":"true",children:"Academy"})]})]}),d=()=>{const t=s.filter(a=>a.status==="completed").length,r=s.length>1?t/(s.length-1)*100:0;return e.jsx("main",{className:"pt-24 sm:pt-28 xl:pt-32 pb-12",children:e.jsxs("div",{className:"content-wrapper",children:[e.jsxs("div",{className:"text-center max-w-3xl mx-auto",children:[e.jsx(i,{}),e.jsx("p",{className:"mt-4 text-lg text-[#94A3B8]",children:"Our curriculum is meticulously designed to take you from a novice to an expert in the art and science of AI and prompt engineering."})]}),e.jsxs("section",{className:"mt-20 sm:mt-24",children:[e.jsxs("div",{className:"text-center max-w-3xl mx-auto mb-12 sm:mb-16",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-semibold text-[#E2E8F0]",children:"Your Learning Path"}),e.jsx("p",{className:"mt-4 text-lg text-[#94A3B8]",children:"A step-by-step journey through our comprehensive curriculum."})]}),e.jsxs("div",{className:"relative max-w-3xl mx-auto",children:[e.jsx("div",{className:"absolute left-4 top-0 h-full w-0.5 bg-slate-700","aria-hidden":"true",children:e.jsx("div",{className:"h-full w-full bg-[#F97316] transition-all duration-1000 ease-out",style:{clipPath:`inset(0 0 ${100-r}% 0)`}})}),e.jsx("div",{className:"space-y-12",children:s.map(a=>{const l=a.status==="upcoming";return e.jsxs("div",{className:"relative flex items-start gap-6 sm:gap-8",children:[e.jsx("div",{className:"relative z-10",children:e.jsx(n,{status:a.status})}),e.jsxs("div",{className:`pt-1 transition-opacity duration-500 ${l?"opacity-50":"opacity-100"}`,children:[e.jsx("h3",{className:`text-xl sm:text-2xl font-semibold ${l?"text-slate-500":"text-[#E2E8F0]"}`,children:a.title}),e.jsx("p",{className:`mt-2 text-base ${l?"text-slate-600":"text-[#94A3B8]"}`,children:a.description})]})]},a.id)})})]})]}),e.jsxs("div",{className:"mt-20 space-y-12",children:[e.jsxs("div",{className:"bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]",children:[e.jsx("h2",{className:"text-2xl font-semibold text-[#E2E8F0]",children:"Core Curriculum"}),e.jsx("p",{className:"mt-2 text-[#94A3B8]",children:"Our foundational courses cover everything you need to know to get started. We believe in a hands-on approach, combining theoretical knowledge with practical application."}),e.jsxs("ul",{className:"mt-4 list-disc list-inside text-[#E2E8F0] space-y-2",children:[e.jsx("li",{children:"Introduction to Large Language Models (LLMs)"}),e.jsx("li",{children:"Advanced Prompting Techniques for various models"}),e.jsx("li",{children:"Ethical Considerations in AI Development"}),e.jsx("li",{children:"Fine-tuning and Customizing Models"}),e.jsx("li",{children:"Building AI-powered Applications"})]})]}),e.jsxs("div",{className:"bg-slate-900/70 backdrop-blur-xl p-8 rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]",children:[e.jsx("h2",{className:"text-2xl font-semibold text-[#E2E8F0]",children:"Learning Philosophy"}),e.jsx("p",{className:"mt-2 text-[#94A3B8]",children:"We empower our students by fostering a collaborative and innovative learning environment. Our project-based learning ensures that you not only learn concepts but also know how to apply them to solve real-world problems, building a robust portfolio along the way."})]})]})]})})};export{d as default};
