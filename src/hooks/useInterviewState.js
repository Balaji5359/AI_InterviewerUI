import { useState, useCallback } from 'react';

const SAMPLE_QUESTIONS = [
  "Hello! Welcome to your interview. Could you please tell me about yourself and your background?",
  "What interests you most about this role and our company?",
  "Can you describe a challenging project you've worked on recently?",
  "How do you handle working under pressure or tight deadlines?",
  "Where do you see yourself in the next 5 years?",
  "Do you have any questions for me about the role or company?"
];

export const useInterviewState = () => {
  const [interviewState, setInterviewState] = useState('greeting'); // greeting, questioning, feedback, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [transcript, setTranscript] = useState([
    { speaker: 'AI', text: SAMPLE_QUESTIONS[0] }
  ]);

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];

  const handleUserResponse = useCallback((userText) => {
    // Add user response to transcript
    setTranscript(prev => [...prev, { speaker: 'User', text: userText }]);

    // Simulate AI processing and response
    setIsAISpeaking(true);
    
    setTimeout(() => {
      let aiResponse = "Thank you for that response. ";
      
      if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        aiResponse += SAMPLE_QUESTIONS[currentQuestionIndex + 1];
      } else {
        aiResponse += "That concludes our interview. Thank you for your time!";
        setInterviewState('completed');
      }

      setTranscript(prev => [...prev, { speaker: 'AI', text: aiResponse }]);
      setIsAISpeaking(false);
    }, 2000); // Simulate AI thinking time

  }, [currentQuestionIndex]);

  // Simulate initial AI greeting
  useState(() => {
    setTimeout(() => {
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 3000);
    }, 1000);
  }, []);

  return {
    interviewState,
    currentQuestion,
    isAISpeaking,
    transcript,
    handleUserResponse
  };
};