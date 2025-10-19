import React from 'react';

const LogoFull: React.FC = () => {
    // Logo has been updated to "ai-coder.uk", scaled up, and recolored as per user request.
    const logoHtml = `
      <div id="aicoder-logo-component">
        <style scoped>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');
            
            #aicoder-logo-component {
                --scale-factor: 1.6; /* Increased for better resolution/size */
                display: inline-block;
                isolation: isolate;
                z-index: 999999;
                background: transparent;
                padding: 0;
            }
            
            #aicoder-logo-component .logo-container {
                text-align: center;
                position: relative;
            }
            
            #aicoder-logo-component .main-logo {
                font-size: calc(3.5rem * var(--scale-factor));
                font-weight: 700;
                margin: 0;
                letter-spacing: -0.05em;
                position: relative;
                display: inline-block;
                font-family: 'Space Grotesk', sans-serif;
                white-space: nowrap;
            }
            
            #aicoder-logo-component .ai-part {
                color: #F97316;
                position: relative;
            }
            
            #aicoder-logo-component .i-letter {
                position: relative;
                display: inline-block;
                transform: scale(0.8);
                transform-origin: bottom;
            }
            
            #aicoder-logo-component .i-dot {
                position: absolute;
                top: calc(-4px * var(--scale-factor));
                left: 50%;
                transform: translateX(-50%);
                width: calc(10px * var(--scale-factor));
                height: calc(10px * var(--scale-factor));
                background: #ffffff;
                border-radius: 50%;
                box-shadow: 0 0 calc(4px * var(--scale-factor)) rgba(255, 255, 255, 0.5);
            }
            
            #aicoder-logo-component .c-letter {
                color: #F97316;
                position: relative;
                display: inline-block;
            }
            
            #aicoder-logo-component .circuit-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: calc(60px * var(--scale-factor));
                height: calc(60px * var(--scale-factor));
                z-index: 2;
                overflow: visible;
            }
            
            #aicoder-logo-component .circuit-line {
                position: absolute;
                background: #F97316;
                border-radius: calc(1px * var(--scale-factor));
                box-shadow: 0 0 calc(2px * var(--scale-factor)) rgba(249, 115, 22, 0.4);
                transform-origin: left center;
                animation-fill-mode: both;
                will-change: transform, opacity;
            }
            
            #aicoder-logo-component .circuit-dot {
                position: absolute;
                width: calc(5px * var(--scale-factor));
                height: calc(5px * var(--scale-factor));
                background: #F97316;
                border-radius: 50%;
                box-shadow: 0 0 calc(3px * var(--scale-factor)) rgba(249, 115, 22, 0.5);
                opacity: 0;
                transform: scale(0);
                animation-fill-mode: both;
                will-change: transform, opacity;
            }

            /* Animacja rozrastania się linii */
            @keyframes growLine {
                from {
                    transform: scaleX(0);
                    opacity: 0;
                }
                to {
                    transform: scaleX(1);
                    opacity: 1;
                }
            }

            /* Animacja pojawiania się kropek */
            @keyframes growDot {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.3);
                    opacity: 0.8;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            /* Linie podstawowe z animacjami - etap 1 */
            #aicoder-logo-component .line1 { width: calc(20px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(10px * var(--scale-factor)); left: calc(8px * var(--scale-factor)); animation: growLine 0.8s ease-out 0.2s;}
            #aicoder-logo-component .line2 { width: calc(2px * var(--scale-factor)); height: calc(15px * var(--scale-factor)); top: calc(10px * var(--scale-factor)); left: calc(26px * var(--scale-factor)); animation: growLine 0.8s ease-out 0.4s; transform-origin: center top;}
            #aicoder-logo-component .line3 { width: calc(18px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(23px * var(--scale-factor)); left: calc(26px * var(--scale-factor)); animation: growLine 0.8s ease-out 0.6s;}
            #aicoder-logo-component .line4 { width: calc(20px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(35px * var(--scale-factor)); left: calc(8px * var(--scale-factor)); animation: growLine 0.8s ease-out 0.8s;}
            #aicoder-logo-component .line5 { width: calc(2px * var(--scale-factor)); height: calc(15px * var(--scale-factor)); top: calc(35px * var(--scale-factor)); left: calc(8px * var(--scale-factor)); animation: growLine 0.8s ease-out 1.0s; transform-origin: center bottom;}
            
            /* Linie rozszerzające się - etap 2 */
            #aicoder-logo-component .line6 { width: calc(15px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(15px * var(--scale-factor)); left: calc(38px * var(--scale-factor)); animation: growLine 1.2s ease-out 1.2s;}
            #aicoder-logo-component .line7 { width: calc(2px * var(--scale-factor)); height: calc(13px * var(--scale-factor)); top: calc(38px * var(--scale-factor)); left: calc(30px * var(--scale-factor)); animation: growLine 1.0s ease-out 1.4s; transform-origin: center top;}
            #aicoder-logo-component .line8 { width: calc(13px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(48px * var(--scale-factor)); left: calc(30px * var(--scale-factor)); animation: growLine 1.0s ease-out 1.6s;}
            
            /* Linie daleko rozszerzające - etap 3 */
            #aicoder-logo-component .line9 { width: calc(14px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(28px * var(--scale-factor)); left: calc(43px * var(--scale-factor)); animation: growLine 1.5s ease-out 1.8s;}
            #aicoder-logo-component .line10 { width: calc(2px * var(--scale-factor)); height: calc(10px * var(--scale-factor)); top: calc(3px * var(--scale-factor)); left: calc(16px * var(--scale-factor)); animation: growLine 1.0s ease-out 2.0s; transform-origin: center top;}

            /* Kropki z opóźnieniami */
            #aicoder-logo-component .dot1 { top: calc(7px * var(--scale-factor)); left: calc(5px * var(--scale-factor)); animation: growDot 0.6s ease-out 1.0s;}
            #aicoder-logo-component .dot2 { top: calc(7px * var(--scale-factor)); left: calc(25px * var(--scale-factor)); animation: growDot 0.6s ease-out 1.2s;}
            #aicoder-logo-component .dot3 { top: calc(20px * var(--scale-factor)); left: calc(40px * var(--scale-factor)); animation: growDot 0.6s ease-out 1.4s;}
            #aicoder-logo-component .dot4 { top: calc(32px * var(--scale-factor)); left: calc(25px * var(--scale-factor)); animation: growDot 0.6s ease-out 1.6s;}
            #aicoder-logo-component .dot5 { top: calc(47px * var(--scale-factor)); left: calc(5px * var(--scale-factor)); animation: growDot 0.6s ease-out 1.8s;}
            #aicoder-logo-component .dot6 { top: calc(12px * var(--scale-factor)); left: calc(55px * var(--scale-factor)); animation: growDot 0.6s ease-out 2.0s;}
            #aicoder-logo-component .dot7 { top: calc(35px * var(--scale-factor)); left: calc(27px * var(--scale-factor)); animation: growDot 0.6s ease-out 2.2s;}
            #aicoder-logo-component .dot8 { top: calc(45px * var(--scale-factor)); left: calc(45px * var(--scale-factor)); animation: growDot 0.6s ease-out 2.4s;}
            #aicoder-logo-component .dot9 { top: calc(25px * var(--scale-factor)); left: calc(58px * var(--scale-factor)); animation: growDot 0.6s ease-out 2.6s;}
            #aicoder-logo-component .dot10 { top: calc(0px * var(--scale-factor)); left: calc(13px * var(--scale-factor)); animation: growDot 0.6s ease-out 2.8s;}
            
            /* New Dots */
            #aicoder-logo-component .dot11 { top: calc(15px * var(--scale-factor)); left: calc(120px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.0s;}
            #aicoder-logo-component .dot12 { top: calc(40px * var(--scale-factor)); left: calc(145px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.1s;}
            #aicoder-logo-component .dot13 { top: calc(25px * var(--scale-factor)); left: calc(170px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.2s;}
            #aicoder-logo-component .dot14 { top: calc(55px * var(--scale-factor)); left: calc(190px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.3s;}
            #aicoder-logo-component .dot15 { top: calc(5px * var(--scale-factor)); left: calc(-10px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.4s;}
            #aicoder-logo-component .dot16 { top: calc(50px * var(--scale-factor)); left: calc(-15px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.5s;}
            #aicoder-logo-component .dot17 { top: calc(-5px * var(--scale-factor)); left: calc(20px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.6s;}
            #aicoder-logo-component .dot18 { top: calc(60px * var(--scale-factor)); left: calc(80px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.7s;}
            #aicoder-logo-component .dot19 { top: calc(20px * var(--scale-factor)); left: calc(210px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.8s;}
            #aicoder-logo-component .dot20 { top: calc(45px * var(--scale-factor)); left: calc(115px * var(--scale-factor)); animation: growDot 0.6s ease-out 3.9s;}

            /* Animacja całego logo - delikatne pojawienie się */
            #aicoder-logo-component .main-logo {
                opacity: 0;
                animation: logoAppear 1s ease-out 0s forwards;
            }

            @keyframes logoAppear {
                to {
                    opacity: 1;
                }
            }

            /* Animacja kropki nad i */
            #aicoder-logo-component .i-dot {
                transform: scale(0);
                animation: growDot 0.8s ease-out 0.5s forwards;
            }

            /* Hover effect - restart animacji */
            #aicoder-logo-component:hover .circuit-line,
            #aicoder-logo-component:hover .circuit-dot {
                animation-duration: 0.3s;
            }
            
            #aicoder-logo-component .rest-part {
                color: #E2E8F0;
            }

            #aicoder-logo-component .e-part {
                color: #F97316;
            }

            /* TABLET RESPONSIVE */
            @media screen and (max-width: 1024px) {
                #aicoder-logo-component .main-logo {
                    font-size: calc(2.5rem * var(--scale-factor));
                    letter-spacing: -0.03em;
                }
                
                #aicoder-logo-component .circuit-overlay {
                    width: calc(45px * var(--scale-factor));
                    height: calc(45px * var(--scale-factor));
                }
                
                #aicoder-logo-component .circuit-dot {
                    width: calc(4px * var(--scale-factor));
                    height: calc(4px * var(--scale-factor));
                }
                
                #aicoder-logo-component .i-dot {
                    width: calc(8px * var(--scale-factor));
                    height: calc(8px * var(--scale-factor));
                    top: calc(-8px * var(--scale-factor));
                }
                
                #aicoder-logo-component .line1 { width: calc(15px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(8px * var(--scale-factor)); left: calc(6px * var(--scale-factor)); }
                #aicoder-logo-component .line2 { width: calc(2px * var(--scale-factor)); height: calc(11px * var(--scale-factor)); top: calc(8px * var(--scale-factor)); left: calc(20px * var(--scale-factor)); }
                #aicoder-logo-component .line3 { width: calc(13px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(17px * var(--scale-factor)); left: calc(20px * var(--scale-factor)); }
                #aicoder-logo-component .line4 { width: calc(15px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(26px * var(--scale-factor)); left: calc(6px * var(--scale-factor)); }
                #aicoder-logo-component .line5 { width: calc(2px * var(--scale-factor)); height: calc(11px * var(--scale-factor)); top: calc(26px * var(--scale-factor)); left: calc(6px * var(--scale-factor)); }
                #aicoder-logo-component .line6 { width: calc(11px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(11px * var(--scale-factor)); left: calc(28px * var(--scale-factor)); }
                #aicoder-logo-component .line7 { width: calc(2px * var(--scale-factor)); height: calc(9px * var(--scale-factor)); top: calc(28px * var(--scale-factor)); left: calc(23px * var(--scale-factor)); }
                #aicoder-logo-component .line8 { width: calc(9px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(36px * var(--scale-factor)); left: calc(23px * var(--scale-factor)); }
                #aicoder-logo-component .line9 { width: calc(10px * var(--scale-factor)); height: calc(2px * var(--scale-factor)); top: calc(21px * var(--scale-factor)); left: calc(32px * var(--scale-factor)); }
                #aicoder-logo-component .line10 { width: calc(2px * var(--scale-factor)); height: calc(8px * var(--scale-factor)); top: calc(2px * var(--scale-factor)); left: calc(12px * var(--scale-factor)); }
            }

            /* MOBILE RESPONSIVE */
            @media screen and (max-width: 768px) {
                #aicoder-logo-component .main-logo {
                    font-size: calc(1.75rem * var(--scale-factor));
                    letter-spacing: 0;
                }
                
                #aicoder-logo-component .circuit-overlay {
                    width: calc(30px * var(--scale-factor));
                    height: calc(30px * var(--scale-factor));
                }
                
                #aicoder-logo-component .circuit-line {
                    height: calc(1px * var(--scale-factor));
                    border-radius: calc(1px * var(--scale-factor));
                }
                
                #aicoder-logo-component .circuit-dot {
                    width: calc(3px * var(--scale-factor));
                    height: calc(3px * var(--scale-factor));
                }
                
                #aicoder-logo-component .i-dot {
                    width: calc(6px * var(--scale-factor));
                    height: calc(6px * var(--scale-factor));
                    top: calc(-6px * var(--scale-factor));
                }
                
                #aicoder-logo-component .line1 { width: calc(10px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(5px * var(--scale-factor)); left: calc(4px * var(--scale-factor)); }
                #aicoder-logo-component .line2 { width: calc(1px * var(--scale-factor)); height: calc(8px * var(--scale-factor)); top: calc(5px * var(--scale-factor)); left: calc(13px * var(--scale-factor)); }
                #aicoder-logo-component .line3 { width: calc(9px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(12px * var(--scale-factor)); left: calc(13px * var(--scale-factor)); }
                #aicoder-logo-component .line4 { width: calc(10px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(18px * var(--scale-factor)); left: calc(4px * var(--scale-factor)); }
                #aicoder-logo-component .line5 { width: calc(1px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(18px * var(--scale-factor)); left: calc(4px * var(--scale-factor)); }
                #aicoder-logo-component .line6 { width: calc(8px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(8px * var(--scale-factor)); left: calc(19px * var(--scale-factor)); }
                #aicoder-logo-component .line7 { width: calc(1px * var(--scale-factor)); height: calc(6px * var(--scale-factor)); top: calc(19px * var(--scale-factor)); left: calc(15px * var(--scale-factor)); }
                #aicoder-logo-component .line8 { width: calc(6px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(24px * var(--scale-factor)); left: calc(15px * var(--scale-factor)); }
                #aicoder-logo-component .line9 { width: calc(7px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(14px * var(--scale-factor)); left: calc(21px * var(--scale-factor)); }
                #aicoder-logo-component .line10 { width: calc(1px * var(--scale-factor)); height: calc(5px * var(--scale-factor)); top: calc(2px * var(--scale-factor)); left: calc(8px * var(--scale-factor)); }
            }

            /* SMALL MOBILE */
            @media screen and (max-width: 480px) {
                #aicoder-logo-component .main-logo {
                    font-size: calc(1.4rem * var(--scale-factor));
                }
                
                #aicoder-logo-component .circuit-overlay {
                    width: calc(22px * var(--scale-factor));
                    height: calc(22px * var(--scale-factor));
                }
                
                #aicoder-logo-component .i-dot {
                    width: calc(5px * var(--scale-factor));
                    height: calc(5px * var(--scale-factor));
                    top: calc(-5px * var(--scale-factor));
                }
                
                #aicoder-logo-component .line1 { width: calc(8px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(4px * var(--scale-factor)); left: calc(3px * var(--scale-factor)); }
                #aicoder-logo-component .line2 { width: calc(1px * var(--scale-factor)); height: calc(6px * var(--scale-factor)); top: calc(4px * var(--scale-factor)); left: calc(10px * var(--scale-factor)); }
                #aicoder-logo-component .line3 { width: calc(7px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(9px * var(--scale-factor)); left: calc(10px * var(--scale-factor)); }
                #aicoder-logo-component .line4 { width: calc(8px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(13px * var(--scale-factor)); left: calc(3px * var(--scale-factor)); }
                #aicoder-logo-component .line5 { width: calc(1px * var(--scale-factor)); height: calc(6px * var(--scale-factor)); top: calc(13px * var(--scale-factor)); left: calc(3px * var(--scale-factor)); }
                #aicoder-logo-component .line6, #aicoder-logo-component .line7, 
                #aicoder-logo-component .line8, #aicoder-logo-component .line9, 
                #aicoder-logo-component .line10 { display: none; }
                
                #aicoder-logo-component .circuit-dot {
                    width: calc(2px * var(--scale-factor));
                    height: calc(2px * var(--scale-factor));
                }
                
                #aicoder-logo-component .dot6, #aicoder-logo-component .dot7, 
                #aicoder-logo-component .dot8, #aicoder-logo-component .dot9, 
                #aicoder-logo-component .dot10 { display: none; }
            }

            /* TINY SCREENS */
            @media screen and (max-width: 320px) {
                #aicoder-logo-component .main-logo {
                    font-size: calc(1rem * var(--scale-factor));
                }
                
                #aicoder-logo-component .circuit-overlay {
                    width: calc(15px * var(--scale-factor));
                    height: calc(15px * var(--scale-factor));
                }
                
                #aicoder-logo-component .i-dot {
                    width: calc(4px * var(--scale-factor));
                    height: calc(4px * var(--scale-factor));
                    top: calc(-4px * var(--scale-factor));
                }
                
                #aicoder-logo-component .line1 { width: calc(5px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(3px * var(--scale-factor)); left: calc(2px * var(--scale-factor)); }
                #aicoder-logo-component .line2 { width: calc(1px * var(--scale-factor)); height: calc(4px * var(--scale-factor)); top: calc(3px * var(--scale-factor)); left: calc(6px * var(--scale-factor)); }
                #aicoder-logo-component .line3 { width: calc(4px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(6px * var(--scale-factor)); left: calc(6px * var(--scale-factor)); }
                #aicoder-logo-component .line4 { width: calc(5px * var(--scale-factor)); height: calc(1px * var(--scale-factor)); top: calc(9px * var(--scale-factor)); left: calc(2px * var(--scale-factor)); }
                #aicoder-logo-component .line5 { width: calc(1px * var(--scale-factor)); height: calc(4px * var(--scale-factor)); top: calc(9px * var(--scale-factor)); left: calc(2px * var(--scale-factor)); }
                
                #aicoder-logo-component .circuit-dot {
                    width: calc(2px * var(--scale-factor));
                    height: calc(2px * var(--scale-factor));
                }
            }
        </style>
        
        <div class="logo-container">
            <h1 class="main-logo">
                <span class="ai-part">a<span class="i-letter">i<div class="i-dot"></div></span></span><span class="rest-part">-</span><span class="c-letter">c<div class="circuit-overlay">
                    <div class="circuit-line line1"></div>
                    <div class="circuit-line line2"></div>
                    <div class="circuit-line line3"></div>
                    <div class="circuit-line line4"></div>
                    <div class="circuit-line line5"></div>
                    <div class="circuit-line line6"></div>
                    <div class="circuit-line line7"></div>
                    <div class="circuit-line line8"></div>
                    <div class="circuit-line line9"></div>
                    <div class="circuit-line line10"></div>
                    <div class="circuit-dot dot1"></div>
                    <div class="circuit-dot dot2"></div>
                    <div class="circuit-dot dot3"></div>
                    <div class="circuit-dot dot4"></div>
                    <div class="circuit-dot dot5"></div>
                    <div class="circuit-dot dot6"></div>
                    <div class="circuit-dot dot7"></div>
                    <div class="circuit-dot dot8"></div>
                    <div class="circuit-dot dot9"></div>
                    <div class="circuit-dot dot10"></div>
                    <div class="circuit-dot dot11"></div>
                    <div class="circuit-dot dot12"></div>
                    <div class="circuit-dot dot13"></div>
                    <div class="circuit-dot dot14"></div>
                    <div class="circuit-dot dot15"></div>
                    <div class="circuit-dot dot16"></div>
                    <div class="circuit-dot dot17"></div>
                    <div class="circuit-dot dot18"></div>
                    <div class="circuit-dot dot19"></div>
                    <div class="circuit-dot dot20"></div>
                </div></span><span class="rest-part">od</span><span class="e-part">e</span><span class="rest-part">r.uk</span>
            </h1>
        </div>
    </div>
    `;

    return (
        <div dangerouslySetInnerHTML={{ __html: logoHtml }} />
    );
};

export default LogoFull;