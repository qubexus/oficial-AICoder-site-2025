import React from 'react';

const AnimatedAicoderLogo: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center h-48">
            <style>
                {`
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
                `}
            </style>
            <div className="animated-logo-container">
                <span className="base-text">Academy</span>
                <span className="layer layer-1" aria-hidden="true">Academy</span>
                <span className="layer layer-2" aria-hidden="true">Academy</span>
                <span className="layer layer-3" aria-hidden="true">Academy</span>
            </div>
        </div>
    );
};

export default React.memo(AnimatedAicoderLogo);