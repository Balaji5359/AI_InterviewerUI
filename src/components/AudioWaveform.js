import React from 'react';

const AudioWaveform = ({ isActive, audioLevel = 0.5, isListening = false }) => {
  const bars = Array.from({ length: 5 }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-center space-x-1">
      {bars.map((bar) => (
        <div
          key={bar}
          className={`w-1 rounded-full transition-all duration-150 ${
            isListening ? 'bg-green-400' : 'bg-blue-400'
          } ${
            isActive ? 'animate-wave' : ''
          }`}
          style={{
            height: isActive 
              ? `${20 + (audioLevel * 30) + (Math.random() * 20)}px`
              : '20px',
            animationDelay: `${bar * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;