import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InterviewScreen from './components/InterviewScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  return (
    <div className="w-full h-screen">
      {currentScreen === 'landing' ? (
        <LandingPage onStartInterview={() => setCurrentScreen('interview')} />
      ) : (
        <InterviewScreen onBackToLanding={() => setCurrentScreen('landing')} />
      )}
    </div>
  );
}

export default App;