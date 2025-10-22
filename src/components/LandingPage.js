import React from 'react';

const LandingPage = ({ onStartInterview }) => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
          AI Interviewer
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Experience the future of job interviews with our intelligent 3D AI interviewer
        </p>
        
        <button
          onClick={onStartInterview}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default LandingPage;