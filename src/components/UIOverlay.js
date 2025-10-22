import React, { useState } from 'react';
import AudioWaveform from './AudioWaveform';

const UIOverlay = ({
  isRecording,
  isAISpeaking,
  audioLevel,
  currentQuestion,
  transcript,
  onStartRecording,
  onStopRecording,
  onBackToLanding,
  interviewState
}) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const getStatusText = () => {
    if (isAISpeaking) return 'Speaking...';
    if (isRecording) return 'Listening...';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isAISpeaking) return 'text-blue-400';
    if (isRecording) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Left - AI Status */}
      <div className="absolute top-6 left-6 pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAISpeaking ? 'bg-blue-400 animate-pulse' : isRecording ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              AI Interviewer - {getStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Top Right - Back Button */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <button
          onClick={onBackToLanding}
          className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-red-500/30 transition-colors"
        >
          End Interview
        </button>
      </div>

      {/* Center - Audio Waveform */}
      {(isRecording || isAISpeaking) && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <AudioWaveform 
            isActive={isRecording || isAISpeaking} 
            audioLevel={audioLevel}
            isListening={isRecording}
          />
        </div>
      )}

      {/* Bottom Center - Current Question */}
      {currentQuestion && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-2xl pointer-events-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20 text-center">
            <p className="text-white text-lg">{currentQuestion}</p>
          </div>
        </div>
      )}

      {/* Bottom Right - Microphone Button */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          disabled={isAISpeaking}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
              : isAISpeaking
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
          } shadow-lg`}
        >
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            {isRecording ? (
              <rect x="6" y="6" width="8" height="8" rx="1" />
            ) : (
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* Bottom Left - Transcript Toggle */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-600/30 transition-colors"
        >
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div className="absolute bottom-20 left-6 w-80 max-h-60 overflow-y-auto pointer-events-auto">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-white font-semibold mb-2">Interview Transcript</h3>
            <div className="space-y-2 text-sm">
              {transcript.map((entry, index) => (
                <div key={index} className={entry.speaker === 'AI' ? 'text-blue-300' : 'text-green-300'}>
                  <span className="font-medium">{entry.speaker}:</span> {entry.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UIOverlay;