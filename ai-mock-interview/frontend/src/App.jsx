import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useInterview } from './hooks/useInterview';
import { Loader } from './components/Loader';
import { InterviewRoom } from './components/InterviewRoom';
import { ResultView } from './components/ResultView';

const ROLES = ["Python", "Web Development", "AI", "Java"];

export default function App() {
  const [view, setView] = useState('land'); 
  const { role, question, loading, result, qCount, setQCount, fetchQuestion, evaluateAnswer, setResult } = useInterview();

  const handleStart = async (r) => {
    await fetchQuestion(r);
    setView('room');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {loading ? <Loader key="loader" /> : (
          view === 'land' ? (
            <div key="land" className="text-center">
              <h1 className="text-6xl font-black mb-10 tracking-tighter">AI MOCK INTERVIEW</h1>
              <div className="grid grid-cols-2 gap-4">
                {ROLES.map(r => (
                  <button 
                    key={r} 
                    onClick={() => handleStart(r)} 
                    className="p-6 border border-white/10 rounded-2xl hover:border-accent transition-all uppercase text-sm font-bold"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ) : view === 'room' ? (
            <InterviewRoom 
              key="room" 
              question={question} 
              qCount={qCount} 
              onSubmit={async (a) => {
                await evaluateAnswer(a);   // ✅ FIX
                setView('result');         // ✅ move AFTER await
              }} 
            />
          ) : (
            result ? (   // ✅ SAFETY CHECK
              <ResultView 
                key="result" 
                result={result} 
                onRestart={() => { setView('land'); setQCount(1); setResult(null); }} 
                onNext={async () => { 
                  setQCount(c => c + 1); 
                  await fetchQuestion(role); 
                  setView('room'); 
                }} 
              />
            ) : <Loader />   // ✅ fallback
          )
        )}
      </AnimatePresence>
    </div>
  );
}