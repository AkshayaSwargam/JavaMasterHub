import React from 'react';

// Home Component - Displays the welcome message and creator information.
// Props:
// - sectionClasses: Tailwind CSS classes for the main container styling.
function Home({ sectionClasses }) {
  return (
    <div className={`${sectionClasses} text-center relative overflow-hidden bg-white p-8 md:p-16 rounded-3xl shadow-3xl transform transition-all duration-700 hover:shadow-4xl scale-95 hover:scale-100 ease-in-out`}>
      {/* Dynamic Background gradient for a modern, attractive look with a subtle parallax-like effect. */}
      {/* This layer creates a fluid, energetic backdrop. */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-100 to-purple-100 opacity-80 rounded-3xl animate-gradient-pulse"></div>
      {/* Second gradient layer for more depth and subtle motion */}
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-50 via-pink-50 to-orange-50 opacity-40 rounded-3xl animate-gradient-pulse-reverse"></div>

      <div className="relative z-10 space-y-12"> {/* Ensures content renders above gradients and adds vertical spacing */}
        {/* Main welcome heading with an animated SVG icon. */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-900 mb-8 animate-fadeInUp flex flex-col items-center justify-center space-y-4 drop-shadow-2xl">
          {/* Animated SVG icon representing Java or coding (e.g., a coffee cup). */}
          <svg className="w-12 h-12 md:w-16 md:h-16 text-orange-600 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10V8c0-3.31-2.69-6-6-6S6 4.69 6 8v2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-3zm-6-4c1.1 0 2 .9 2 2v2H10V8c0-1.1.9-2 2-2zm9 14H3V12h18v8z"/>
          </svg>
          <span>Welcome JavaMasterHub</span>
        </h2>

        {/* Subtitle/description of the website's purpose with improved typography and emphasis. */}
        <p className="text-lg md:text-xl text-gray-800 mb-12 max-w-4xl mx-auto animate-fadeIn delay-300 font-light leading-relaxed tracking-wide">
          <span className="font-semibold text-blue-800 drop-shadow-sm">Unlock your full potential:</span> Dive deep into <span className="font-extrabold text-green-700">core Java concepts</span>, explore curated high-quality resources, and find your path to a <span className="font-extrabold text-purple-700">thriving career</span>.
        </p>

        {/* "About the Creator" section with significantly enhanced visual styling and intro animation. */}
        <div className="mt-20 pt-12 border-t-4 border-cyan-400 bg-gradient-to-br from-gray-100 to-white p-10 rounded-3xl shadow-inset-xl animate-slideInFromBottom transform hover:scale-102 transition-transform duration-300 ease-in-out">
          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-700 mb-8 border-b-2 border-purple-300 pb-4 inline-block drop-shadow-lg">
            A Message from the Creator
          </h3>
          <p className="text-base md:text-lg text-gray-800 max-w-5xl mx-auto leading-loose animate-fadeIn delay-500">
            Hi, I'm Akshaya Swargam, the creator of JavaMaster Hub. This is a completely free platform designed to help you learn Java from basics to advanced levels. You’ll find structured learning content, top free resources, and job/internship listings—all in one place. Whether you're a student or job seeker, this website will guide you step-by-step in mastering Java and building a successful career. All the best for your learning journey and future opportunities!
          </p>
        </div>
      </div>
      {/* Decorative element at the bottom for visual flair. */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-60 animate-glow"></div>

      {/* Tailwind CSS Custom Keyframe Animations (Add these to your tailwind.config.js or main CSS file) */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-pulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-pulse-reverse {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { opacity: 0.6; box-shadow: 0 0 10px rgba(0,255,255,0.7); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(0,255,255,1); }
          100% { opacity: 0.6; box-shadow: 0 0 10px rgba(0,255,255,0.7); }
        }

        /* Applying animations */
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
        .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
        .animate-fadeIn.delay-500 { animation-delay: 0.5s; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-gradient-pulse {
            animation: gradient-pulse 20s ease infinite;
            background-size: 200% 200%; /* For gradient animation */
        }
        .animate-gradient-pulse-reverse {
            animation: gradient-pulse-reverse 25s ease infinite;
            background-size: 200% 200%; /* For gradient animation */
        }
        .animate-slideInFromBottom { animation: slideInFromBottom 1s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite alternate; }
        `}
      </style>
    </div>
  );
}

export default Home;
