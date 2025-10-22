import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Avatar from './Avatar';
import UIOverlay from './UIOverlay';
import OfficeEnvironment from './OfficeEnvironment';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useInterviewState } from '../hooks/useInterviewState';

const InterviewScreen = ({ onBackToLanding }) => {
  const canvasRef = useRef();
  const { isRecording, startRecording, stopRecording, audioLevel } = useAudioRecorder();
  const { 
    interviewState, 
    currentQuestion, 
    isAISpeaking, 
    transcript,
    handleUserResponse 
  } = useInterviewState();

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* 3D Canvas */}
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-3, 2, 3]} intensity={0.4} color="#ffeaa7" />
        <spotLight position={[0, 5, 2]} intensity={0.8} angle={0.3} penumbra={0.5} />
        
        <OfficeEnvironment />
        
        <Avatar 
          isSpeaking={isAISpeaking}
          emotion="neutral"
          position={[0, -1.5, 0]}
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* UI Overlay */}
      <UIOverlay
        isRecording={isRecording}
        isAISpeaking={isAISpeaking}
        audioLevel={audioLevel}
        currentQuestion={currentQuestion}
        transcript={transcript}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onBackToLanding={onBackToLanding}
        interviewState={interviewState}
      />
    </div>
  );
};

export default InterviewScreen;