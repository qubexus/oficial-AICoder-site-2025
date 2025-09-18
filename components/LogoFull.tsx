import React from 'react';

const LogoFull: React.FC = () => {
    // Logo has been scaled down by 20% to fit the new centered layout.
    const logoHtml = `
        <div id="aicoder-logo-component">
            <style scoped>
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');
                
                #aicoder-logo-component {
                    display: inline-block;
                    isolation: isolate;
                    z-index: 999999;
                }
                
                #aicoder-logo-component .logo-container {
                    text-align: center;
                    position: relative;
                }
                
                #aicoder-logo-component .main-logo {
                    font-size: 2.7rem;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: 0.05em;
                    position: relative;
                    display: inline-block;
                    font-family: 'Space Grotesk', sans-serif;
                    transform: scaleX(1.15);
                }
                
                #aicoder-logo-component .ai-part {
                    color: #F97316;
                    position: relative;
                }
                
                #aicoder-logo-component .i-letter {
                    position: relative;
                    display: inline-block;
                }
                
                #aicoder-logo-component .i-dot {
                    position: absolute;
                    top: -3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8px;
                    height: 8px;
                    background: #ffffff;
                    border-radius: 50%;
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
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
                    width: 46px;
                    height: 46px;
                    z-index: 2;
                }
                
                #aicoder-logo-component .circuit-line {
                    position: absolute;
                    background: #F97316;
                    border-radius: 1px;
                    box-shadow: 0 0 2px rgba(249, 115, 22, 0.4);
                }
                
                #aicoder-logo-component .circuit-dot {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #F97316;
                    border-radius: 50%;
                    box-shadow: 0 0 3px rgba(249, 115, 22, 0.5);
                }
                
                /* Linie obwodu */
                #aicoder-logo-component .line1 { width: 16px; height: 2px; top: 8px; left: 6px; }
                #aicoder-logo-component .line2 { width: 2px; height: 11px; top: 8px; left: 20px; }
                #aicoder-logo-component .line3 { width: 14px; height: 2px; top: 18px; left: 20px; }
                #aicoder-logo-component .line4 { width: 16px; height: 2px; top: 27px; left: 6px; }
                #aicoder-logo-component .line5 { width: 2px; height: 11px; top: 27px; left: 6px; }
                #aicoder-logo-component .line6 { width: 11px; height: 2px; top: 11px; left: 29px; }
                #aicoder-logo-component .line7 { width: 2px; height: 10px; top: 29px; left: 23px; }
                #aicoder-logo-component .line8 { width: 10px; height: 2px; top: 38px; left: 23px; }
                #aicoder-logo-component .line9 { width: 10px; height: 2px; top: 22px; left: 33px; }
                #aicoder-logo-component .line10 { width: 2px; height: 8px; top: 2px; left: 12px; }

                /* Kropki */
                #aicoder-logo-component .dot1 { top: 5px; left: 3px; }
                #aicoder-logo-component .dot2 { top: 5px; left: 18px; }
                #aicoder-logo-component .dot3 { top: 16px; left: 30px; }
                #aicoder-logo-component .dot4 { top: 25px; left: 18px; }
                #aicoder-logo-component .dot5 { top: 37px; left: 3px; }
                #aicoder-logo-component .dot6 { top: 10px; left: 42px; }
                #aicoder-logo-component .dot7 { top: 26px; left: 21px; }
                #aicoder-logo-component .dot8 { top: 35px; left: 34px; }
                #aicoder-logo-component .dot9 { top: 19px; left: 46px; }
                #aicoder-logo-component .dot10 { top: 0px; left: 10px; }

                #aicoder-logo-component .oder-part {
                    color: #ffffff;
                    background: linear-gradient(90deg, 
                        #F97316 0%,
                        rgba(249, 115, 22, 0.75) 25%,
                        rgba(249, 115, 22, 0.5) 50%,
                        rgba(249, 115, 22, 0.25) 75%,
                        rgba(249, 115, 22, 0) 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-stroke: 2px transparent;
                    background-clip: text;
                    text-stroke: 2px transparent;
                    -webkit-text-stroke-color: #F97316;
                    -webkit-text-stroke-width: 1px;
                }
            </style>
            
            <div class="logo-container">
                <h1 class="main-logo">
                    <span class="ai-part">A<span class="i-letter">I<div class="i-dot"></div></span></span><span class="c-letter">C<div class="circuit-overlay">
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
                    </div></span><span class="oder-part">oder</span>
                </h1>
            </div>
        </div>
    `;

    return (
        <div dangerouslySetInnerHTML={{ __html: logoHtml }} />
    );
};

export default LogoFull;