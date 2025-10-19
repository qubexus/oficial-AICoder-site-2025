import React from 'react';

const AnimatedAicoderLogo: React.FC = () => {
    // The component's HTML and CSS are combined into a single string to be rendered.
    // This avoids parsing CSS as TSX and mirrors the approach used in other components like LogoFull.tsx.
    const componentHTML = `
        <style>
            /* Wymagana czcionka - możesz ją zaimportować lub użyć innej */
            @import url('https://fonts.googleapis.com/css2?family=Arial&display=swap');

            .aicoder-container {
                position: relative;
                width: 100%;
                padding: 2rem 0;
                background: transparent;
                overflow: hidden;
                font-family: 'Arial', sans-serif;
                color: white; /* Ustawienie koloru tekstu dla lepszej widoczności na ciemnym tle */
                isolation: isolate; /* Prevents blending issues with background elements */
            }

            .background-grid {
                position: absolute;
                inset: 0;
                z-index: 0;
                background-color: #101827;
                background-image:
                    linear-gradient(rgba(167, 139, 250, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(167, 139, 250, 0.1) 1px, transparent 1px);
                background-size: 40px 40px;
            }

            .background-grid::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, transparent 0%, rgba(249, 115, 22, 0.1) 50%, transparent 100%);
                animation: scanline 5s linear infinite;
                will-change: transform;
            }

            .aicoder-logo {
                width: 100%;
                max-width: 1536px;
                margin-left: auto;
                margin-right: auto;
                padding-left: clamp(1rem, 5vw, 6rem);
                padding-right: clamp(1rem, 5vw, 6rem);
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                position: relative;
                z-index: 10;
            }

            .main-logo-group {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .circular-border {
                width: 120px;
                height: 120px;
                border: 3px solid transparent;
                border-radius: 50%;
                background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(249, 115, 22, 0.1)) padding-box,
                linear-gradient(45deg, #8B5CF6, #F97316, #06D6A0, #8B5CF6) border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                box-shadow:
                0 0 20px rgba(139, 92, 246, 0.3),
                0 0 40px rgba(249, 115, 22, 0.2),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
                perspective: 1200px;
            }

            .circular-border::before {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border-radius: 50%;
                background: linear-gradient(45deg, #8B5CF6, #F97316, #06D6A0, #8B5CF6);
                z-index: -1;
                animation: rotate 4s linear infinite;
                will-change: transform;
            }

            .circular-border::after {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                right: 3px;
                bottom: 3px;
                border-radius: 50%;
                background: transparent;
                z-index: -1;
            }
            
            .logo-carousel {
                width: 100%;
                height: 100%;
                position: relative;
                transform-style: preserve-3d;
                animation: rotate-carousel 20s linear infinite;
                transition: transform 0.5s ease;
                will-change: transform;
            }

            .circular-border:hover .logo-carousel {
                animation-play-state: paused;
                transform: scale(1.1);
            }
            
            .logo-item {
                position: absolute;
                top: 12.5%;
                left: 12.5%;
                width: 75%;
                height: 75%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(16, 24, 39, 0.4);
                border-radius: 50%;
                backdrop-filter: blur(3px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .logo-item svg {
                width: 60%;
                height: 60%;
                object-fit: contain;
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
            }
            
            .logo-item.logo-gemini { transform: rotateY(0deg) translateZ(80px); }
            .logo-item.logo-claude { transform: rotateY(90deg) translateZ(80px); }
            .logo-item.logo-llama { transform: rotateY(180deg) translateZ(80px); }
            .logo-item.logo-gpt { transform: rotateY(270deg) translateZ(80px); }

            .text-section {
                display: flex;
                flex-direction: column;
            }

            .main-text {
                font-size: 36px;
                font-weight: bold;
                color: #e2e8f0;
                line-height: 1.1;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                animation: fadeSlideIn 2s ease-out;
            }

            .subtitle {
                font-size: 24px;
                font-weight: 900;
                letter-spacing: 1px;
                white-space: nowrap;
                border-right: 3px solid #F97316;
                width: 0;
                overflow: hidden;
                animation: typing 3s steps(22, end) 1s forwards, blink-caret .75s step-end infinite;
                animation-delay: 1s;
            }
            
            .subtitle-wrapper {
                 height: 30px; /* Set a fixed height to prevent layout shift */
            }

            .subtitle .text-orange {
                color: #F97316;
            }

            .subtitle .text-white {
                color: #E2E8F0;
            }

            .graphic-design {
                position: relative;
                margin-right: 20px;
                width: 120px;
                height: 120px;
                flex-shrink: 0;
            }

            .code-symbol {
                position: absolute;
                font-size: 50px;
                font-weight: bold;
                color: #8B5CF6;
                text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
                will-change: transform;
            }

            .bracket-left {
                top: 15px;
                left: 15px;
                transform: rotate(-10deg);
                animation: codeFloat 3s ease-in-out infinite;
            }

            .bracket-right {
                top: 15px;
                right: 15px;
                transform: rotate(10deg);
                animation: codeFloatRight 3.5s ease-in-out infinite;
            }

            .slash {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(15deg);
                font-size: 60px;
                color: #F97316;
                text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
                animation: slashRotate 4s ease-in-out infinite;
                will-change: transform;
            }

            .binary-dots {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #8B5CF6;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
                animation: dotPulse 2s ease-in-out infinite;
                will-change: transform, opacity;
            }

            .dot-1 { top: 8px; left: 50px; animation-delay: 0s; }
            .dot-2 { top: 25px; right: 25px; animation-delay: 0.3s; }
            .dot-3 { bottom: 35px; left: 8px; animation-delay: 0.6s; }
            .dot-4 { bottom: 8px; right: 40px; animation-delay: 0.9s; }
            .dot-5 { top: 50px; left: 8px; animation-delay: 1.2s; }
            .dot-6 { bottom: 50px; right: 8px; animation-delay: 1.5s; }

            .circuit-pattern {
                position: absolute;
                width: 2px;
                background: linear-gradient(to bottom, #F97316, transparent);
                border-radius: 1px;
            }

            .circuit-1 {
                top: 12px;
                left: 35px;
                height: 25px;
                transform: rotate(45deg);
            }

            .circuit-2 {
                top: 60px;
                right: 35px;
                height: 20px;
                transform: rotate(-30deg);
            }

            .circuit-3 {
                bottom: 15px;
                left: 60px;
                height: 30px;
                transform: rotate(60deg);
            }

            .animated-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }

            .floating-text {
                position: absolute;
                font-size: 12px;
                font-weight: 600;
                color: rgba(139, 92, 246, 0.6);
                text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
                white-space: nowrap;
                animation: floatAround 8s linear infinite;
                will-change: transform, opacity;
            }

            .text-1 { top: 10%; left: 5%; animation-delay: 0s; }
            .text-2 { top: 20%; right: 8%; animation-delay: 1.3s; }
            .text-3 { bottom: 25%; left: 3%; animation-delay: 2.6s; }
            .text-4 { bottom: 15%; right: 5%; animation-delay: 4s; }
            .text-5 { top: 50%; left: 2%; animation-delay: 5.3s; }
            .text-6 { top: 35%; right: 3%; animation-delay: 6.6s; }
            .text-7 { top: 70%; left: 4%; animation-delay: 7.5s; }
            .text-8 { top: 85%; left: 10%; animation-delay: 8.2s; }
            .text-9 { top: 25%; left: 1%; animation-delay: 9.0s; }
            .text-10 { top: 60%; left: 6%; animation-delay: 9.8s; }
            .text-11 { bottom: 5%; left: 8%; animation-delay: 10.5s; }
            .text-12 { top: 40%; left: 1%; animation-delay: 11.2s; }

            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 2;
            }

            .particle {
                position: absolute;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, #F97316, transparent);
                border-radius: 50%;
                animation: particleFloat 6s linear infinite;
                will-change: transform, opacity;
            }

            .particle-1 { top: 10%; left: 10%; animation-delay: 0s; }
            .particle-2 { top: 20%; right: 15%; animation-delay: 0.8s; }
            .particle-3 { bottom: 30%; left: 20%; animation-delay: 1.6s; }
            .particle-4 { bottom: 20%; right: 10%; animation-delay: 2.4s; }
            .particle-5 { top: 60%; left: 15%; animation-delay: 3.2s; }
            .particle-6 { top: 40%; right: 20%; animation-delay: 4s; }
            .particle-7 { bottom: 50%; left: 8%; animation-delay: 4.8s; }
            .particle-8 { top: 30%; right: 5%; animation-delay: 5.6s; }
            .particle-9 { bottom: 10%; left: 5%; animation-delay: 6.2s; }
            .particle-10 { top: 80%; left: 12%; animation-delay: 7.0s; }

            @keyframes rotate-carousel {
                from { transform: rotateY(360deg); }
                to { transform: rotateY(0deg); }
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes textGlow {
                0% { filter: brightness(1) drop-shadow(0 0 5px rgba(139, 92, 246, 0.5)); }
                100% { filter: brightness(1.2) drop-shadow(0 0 15px rgba(249, 115, 22, 0.7)); }
            }

            @keyframes fadeSlideIn {
                0% { opacity: 0; transform: translateX(-30px); }
                100% { opacity: 1; transform: translateX(0); }
            }

            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }

            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #F97316; }
            }

            @keyframes codeFloat {
                0%, 100% { transform: translateY(0px) rotate(-10deg); }
                50% { transform: translateY(-5px) rotate(-10deg); }
            }

            @keyframes codeFloatRight {
                0%, 100% { transform: translateY(0px) rotate(10deg); }
                50% { transform: translateY(-8px) rotate(10deg); }
            }

            @keyframes slashRotate {
                0%, 100% { transform: translate(-50%, -50%) rotate(15deg); }
                50% { transform: translate(-50%, -50%) rotate(20deg) scale(1.1); }
            }

            @keyframes dotPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.3); }
            }

            @keyframes floatAround {
                0% { opacity: 0; transform: translateY(20px) scale(0.8); }
                10% { opacity: 1; transform: translateY(0) scale(1); }
                90% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-20px) scale(0.8); }
            }
            
            @keyframes scanline {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }

            @keyframes particleFloat {
                0% { opacity: 0; transform: translateY(0px) scale(0.5); }
                20% { opacity: 1; transform: translateY(-10px) scale(1); }
                80% { opacity: 1; transform: translateY(-30px) scale(1); }
                100% { opacity: 0; transform: translateY(-50px) scale(0.5); }
            }
            
            /* --- RESPONSIVE STYLES --- */
            
            /* Tablets & Phones (<= 900px) */
            @media (max-width: 900px) {
                .graphic-design,
                .floating-text,
                .particles {
                    display: none;
                }
                .aicoder-logo {
                    justify-content: center;
                }
            }

            /* Phones (<= 640px) */
            @media (max-width: 640px) {
                 .aicoder-logo {
                    flex-direction: column;
                    gap: 1.5rem;
                    text-align: center;
                }
                .main-logo-group {
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .text-section {
                    align-items: center;
                }
                .circular-border {
                    width: 100px;
                    height: 100px;
                    perspective: 800px;
                }
                .main-text {
                    font-size: 28px;
                }
                .subtitle {
                    font-size: 20px;
                    max-width: 100%;
                    letter-spacing: 0.5px;
                }
                .subtitle-wrapper {
                    height: 26px; /* Adjust height for smaller font */
                }
                .logo-item.logo-gemini { transform: rotateY(0deg) translateZ(60px); }
                .logo-item.logo-claude { transform: rotateY(90deg) translateZ(60px); }
                .logo-item.logo-llama { transform: rotateY(180deg) translateZ(60px); }
                .logo-item.logo-gpt { transform: rotateY(270deg) translateZ(60px); }
            }

            /* Small Phones (<= 420px) */
            @media (max-width: 420px) {
                .main-text {
                    font-size: 24px;
                }
                .subtitle {
                    font-size: 16px;
                }
                .subtitle-wrapper {
                    height: 22px;
                }
                .circular-border {
                    width: 80px;
                    height: 80px;
                }
                .logo-item.logo-gemini { transform: rotateY(0deg) translateZ(50px); }
                .logo-item.logo-claude { transform: rotateY(90deg) translateZ(50px); }
                .logo-item.logo-llama { transform: rotateY(180deg) translateZ(50px); }
                .logo-item.logo-gpt { transform: rotateY(270deg) translateZ(50px); }
            }
        </style>
        <div class="aicoder-container">
            <div class="background-grid"></div>
            <div class="aicoder-logo">
                <div class="graphic-design">
                    <span class="code-symbol bracket-left">&lt;</span>
                    <span class="code-symbol slash">/</span>
                    <span class="code-symbol bracket-right">&gt;</span>
                    <div class="binary-dots dot-1"></div>
                    <div class="binary-dots dot-2"></div>
                    <div class="binary-dots dot-3"></div>
                    <div class="binary-dots dot-4"></div>
                    <div class="binary-dots dot-5"></div>
                    <div class="binary-dots dot-6"></div>
                    <div class="circuit-pattern circuit-1"></div>
                    <div class="circuit-pattern circuit-2"></div>
                    <div class="circuit-pattern circuit-3"></div>
                </div>
                <div class="main-logo-group">
                    <div class="circular-border">
                        <div class="logo-carousel">
                            <div class="logo-item logo-gemini">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="logo-gemini-main" x1="5.636" y1="5.636" x2="18.364" y2="18.364" gradientUnits="userSpaceOnUse"><stop stop-color="#A855F7"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>
                                        <linearGradient id="logo-gemini-accent" x1="18.364" y1="5.636" x2="5.636" y2="18.364" gradientUnits="userSpaceOnUse"><stop stop-color="#F97316"/><stop offset="1" stop-color="#FBBF24"/></linearGradient>
                                    </defs>
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="url(#logo-gemini-main)"/>
                                    <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" fill="url(#logo-gemini-accent)"/>
                                </svg>
                            </div>
                            <div class="logo-item logo-claude">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.667 2H7.333C4.388 2 2 4.388 2 7.333v9.334C2 19.612 4.388 22 7.333 22h9.334C19.612 22 22 19.612 22 16.667V7.333C22 4.388 19.612 2 16.667 2z" fill="#D97706"/>
                                    <path d="M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c1.657 0 3.156-.672 4.243-1.757" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="logo-item logo-llama">
                               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12C2 9.09 3.46 6.49 5.88 5.09L12 12L5.88 18.91C3.46 17.51 2 14.91 2 12z" fill="#4ADE80"/>
                                    <path d="M18.12 5.09C20.54 6.49 22 9.09 22 12C22 14.91 20.54 17.51 18.12 18.91L12 12L18.12 5.09z" fill="#34D399"/>
                                    <path d="M12 2L5.88 5.09L12 12V2z" fill="#A78BFA"/>
                                    <path d="M12 2V12L18.12 5.09L12 2z" fill="#818CF8"/>
                                    <path d="M5.88 18.91L12 22V12L5.88 18.91z" fill="#F472B6"/>
                                    <path d="M18.12 18.91L12 12V22L18.12 18.91z" fill="#F87171"/>
                                </svg>
                            </div>
                            <div class="logo-item logo-gpt">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.4L19.6 9V15L12 19.6L4.4 15V9L12 4.4Z" fill="#2DD4BF"/>
                                    <path d="M12 13.6L19.6 9.2L12 4.8L4.4 9.2L12 13.6Z" stroke="#2DD4BF" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="text-section">
                        <div class="main-text">Welcome to</div>
                        <div class="subtitle-wrapper">
                            <div class="subtitle"><span class="text-white">www.</span><span class="text-orange">a</span><span class="text-orange">i</span><span class="text-white">-</span><span class="text-orange">c</span><span class="text-white">od</span><span class="text-orange">e</span><span class="text-white">r.uk</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="animated-content">
                <div class="floating-text text-1">Prompt Engineering</div>
                <div class="floating-text text-2">Model Fine-Tuning</div>
                <div class="floating-text text-3">AI Ethics</div>
                <div class="floating-text text-4">LLM APIs</div>
                <div class="floating-text text-5">Generative AI</div>
                <div class="floating-text text-6">Multimodality</div>
                <div class="floating-text text-7">AI Agents</div>
                <div class="floating-text text-8">RAG Systems</div>
                <div class="floating-text text-9">Data Analysis</div>
                <div class="floating-text text-10">Vector DBs</div>
                <div class="floating-text text-11">AI Chatbots</div>
                <div class="floating-text text-12">Code Completion</div>
            </div>
            <div class="particles">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
                <div class="particle particle-4"></div>
                <div class="particle particle-5"></div>
                <div class="particle particle-6"></div>
                <div class="particle particle-7"></div>
                <div class="particle particle-8"></div>
                <div class="particle particle-9"></div>
                <div class="particle particle-10"></div>
            </div>
        </div>
    `;

    return (
       <div dangerouslySetInnerHTML={{ __html: componentHTML }} />
    );
};

export default React.memo(AnimatedAicoderLogo);