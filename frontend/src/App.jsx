import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useInterview } from './hooks/useInterview';
import { Loader } from './components/Loader';
import { InterviewRoom } from './components/InterviewRoom';
import { ResultView } from './components/ResultView';

const ROLES = ["Python", "Web Development", "AI", "Java"];

export default function App() {
  const [view, setView] = useState('land'); 
  const { 
    role, 
    question, 
    loading, 
    result, 
    qCount, 
    setQCount, 
    fetchQuestion, 
    evaluateAnswer, 
    setResult 
  } = useInterview();

  // START INTERVIEW
  const handleStart = async (selectedRole) => {
    try {
      await fetchQuestion(selectedRole);
      // Wait for data to exist before switching view
      if (!loading) {
        setView('room');
      }
    } catch (err) {
      console.error("Start Error:", err);
      alert("Check your backend connection!");
    }
  };

  // SUBMIT ANSWER
  const handleSubmitAnswer = async (answerText) => {
    try {
      await evaluateAnswer(answerText);
      setView('result');
    } catch (err) {
      console.error("Evaluation Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center p-6 font-sans selection:bg-accent selection:text-charcoal">
      <AnimatePresence mode="wait">
        
        {/* LOADER STATE */}
        {loading ? (
          <Loader key="loader" />
        ) : (
          
          /* LANDING VIEW */
          view === 'land' ? (
            <div key="land" className="text-center max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic border-b-4 border-white pb-4">
                AI MOCK <span className="text-gray-500 not-italic">SYS</span>
              </h1>
              <p className="mb-10 text-gray-400 tracking-widest uppercase text-xs">Select your discipline to begin</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ROLES.map(r => (
                  <button 
                    key={r} 
                    onClick={() => handleStart(r)} 
                    className="p-8 border border-white/10 rounded-3xl hover:border-white transition-all bg-white/5 text-xl font-bold uppercase tracking-tight hover:bg-white hover:text-black"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ) : 

          /* INTERVIEW ROOM VIEW */
          view === 'room' && question ? (
            <InterviewRoom 
              key="room" 
              question={question} 
              qCount={qCount} 
              role={role}
              onSubmit={handleSubmitAnswer} 
            />
          ) : 

          /* RESULT VIEW */
          view === 'result' && result ? (
            <ResultView 
              key="result" 
              result={result} 
              onRestart={() => { 
                setView('land'); 
                setQCount(1); 
                setResult(null); 
              }} 
              onNext={async () => { 
                setResult(null); // Clear old result first
                setQCount(c => c + 1); 
                await fetchQuestion(role); 
                setView('room'); 
              }} 
            />
          ) : (
            /* FALLBACK - In case data is missing, go home */
            <div className="text-center">
               <p className="text-gray-500 mb-4">Awaiting data stream...</p>
               <button onClick={() => setView('land')} className="underline">Return Home</button>
            </div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
