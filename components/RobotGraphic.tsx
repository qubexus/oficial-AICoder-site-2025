import React from 'react';

const RobotGraphic: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="robot-title"
      role="img"
      style={{ overflow: 'visible' }}
    >
      <title id="robot-title">Stylized graphic of a robot head processing data with a spinning globe, neuron, and sparks.</title>
      <defs>
        <linearGradient id="robot-head-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A3B57" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="robot-eye-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <radialGradient id="spark-gradient">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#F97316" />
        </radialGradient>
        <linearGradient id="neuron-gradient">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neuron-glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>

      <style>
        {`
          .robot-group {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .orbit-path {
            stroke-dasharray: 8 4;
            animation: dash 20s linear infinite;
          }
          @keyframes dash {
            to { stroke-dashoffset: 1000; }
          }
          
          .orbiting-shape {
            animation: orbit 10s linear infinite;
            transform-origin: 250px 200px;
          }
          .orbiting-shape-2 {
            animation: orbit 15s linear infinite reverse;
            transform-origin: 250px 200px;
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(150px) rotate(360deg); }
          }
          
          .pulsing-element {
            animation: pulse-shape 3s ease-in-out infinite;
            transform-origin: center;
          }
          .pulsing-element-2 {
            animation: pulse-shape 3s ease-in-out infinite alternate 0.5s;
            transform-origin: center;
          }
          @keyframes pulse-shape {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.3); }
          }
          
          .spin-slow {
            animation: spin 30s linear infinite;
            transform-origin: 75px 280px;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .data-particle {
              offset-path: path("M 115 280 C 150 250, 180 230, 210 210");
              animation: data-flow 3s linear infinite;
              opacity: 0;
          }
          @keyframes data-flow {
              0% { offset-distance: 0%; opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
          }
          
          .neuron-path {
              stroke-dasharray: 200 653;
              stroke-dashoffset: 653;
              animation: move-neuron 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }
          @keyframes move-neuron {
              from {
                  stroke-dashoffset: 653;
              }
              to {
                  stroke-dashoffset: -200;
              }
          }
          
          .spark {
              animation: spark-animation 1.5s ease-out infinite;
              transform-origin: center;
              opacity: 0;
          }
          @keyframes spark-animation {
              0%, 100% { opacity: 0; transform: scale(0); }
              50% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

        {/* --- DYNAMIC ELEMENTS --- */}

        {/* Earth Globe */}
        <g className="spin-slow">
            <circle cx="75" cy="280" r="40" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 75 240 A 40 40 0 0 1 75 320" fill="none" stroke="#475569" strokeWidth="1" />
            <path d="M 35 280 A 40 40 0 0 1 115 280" fill="none" stroke="#475569" strokeWidth="1" />
            <ellipse cx="75" cy="280" rx="20" ry="40" fill="none" stroke="#475569" strokeWidth="1" />
        </g>

        {/* Data Stream Path */}
        <path id="data-stream-path" d="M 115 280 C 150 250, 180 230, 210 210" fill="none" />
        <g>
            <circle r="2" fill="#2DD4BF" className="data-particle" style={{ animationDelay: '0s' }} />
            <circle r="2" fill="#A78BFA" className="data-particle" style={{ animationDelay: '0.5s' }} />
            <circle r="2" fill="#F97316" className="data-particle" style={{ animationDelay: '1s' }} />
            <circle r="2" fill="#E2E8F0" className="data-particle" style={{ animationDelay: '1.5s' }} />
        </g>
        
        {/* Orbiting Shapes */}
        <circle cx="250" cy="200" r="150" fill="none" stroke="#64748B" strokeWidth="2" className="orbit-path" />
        <g className="orbiting-shape">
            <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#A78BFA" className="pulsing-element" />
        </g>
        <g className="orbiting-shape-2">
            <polygon points="-6 -5, 6 -5, 0 5" fill="#2DD4BF" className="pulsing-element-2" />
        </g>
        
        {/* Flying Neuron */}
        <path d="M 550 50 C 400 80, 250 300, 50 350" fill="none" stroke="url(#neuron-gradient)" strokeWidth="2.5" className="neuron-path" filter="url(#neuron-glow)" />
        
        {/* Sparks */}
        <g>
            <circle cx="280" cy="140" r="3" fill="url(#spark-gradient)" className="spark" style={{ animationDelay: '0.2s' }} />
            <circle cx="220" cy="260" r="2" fill="url(#spark-gradient)" className="spark" style={{ animationDelay: '0.7s' }} />
            <circle cx="320" cy="220" r="3" fill="url(#spark-gradient)" className="spark" style={{ animationDelay: '1.2s' }} />
        </g>

      {/* --- ROBOT (STATIC BASE) --- */}
      <g className="robot-group">
        {/* Main Head */}
        <rect x="150" y="125" width="200" height="150" rx="20" fill="url(#robot-head-gradient)" stroke="#475569" strokeWidth="4" />

        {/* Eye */}
        <circle cx="250" cy="200" r="40" fill="url(#robot-eye-gradient)" filter="url(#glow)" />
        <circle cx="250" cy="200" r="20" fill="black" opacity="0.3" />
        <circle cx="240" cy="190" r="8" fill="white" opacity="0.8">
           <animate attributeName="cx" values="240;260;240" dur="8s" repeatCount="indefinite" />
           <animate attributeName="cy" values="190;210;190" dur="8s" repeatCount="indefinite" />
        </circle>
        
        {/* Antenna */}
        <line x1="250" y1="125" x2="250" y2="85" stroke="#475569" strokeWidth="4" />
        <circle cx="250" cy="80" r="8" fill="#F97316" filter="url(#glow)">
            <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Neck */}
        <rect x="220" y="275" width="60" height="30" fill="#2A3B57" stroke="#475569" strokeWidth="4" />
      </g>
    </svg>
  );
};

export default RobotGraphic;