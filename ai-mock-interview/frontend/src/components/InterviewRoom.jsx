import { motion } from 'framer-motion';
import { useState } from 'react';

export const InterviewRoom = ({ question, qCount, onSubmit, role }) => {
  const [ans, setAns] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <p className="text-accent text-sm mb-2 uppercase tracking-widest">
        {role} Interview | Question {qCount}
      </p>
      {/* Make sure this line exists to show the question */}
      <h2 className="text-3xl font-light mb-8 italic">"{question}"</h2>
      
      <textarea 
        className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-accent transition-all text-lg text-cream"
        placeholder="Type your response..."
        value={ans}
        onChange={(e) => setAns(e.target.value)}
      />
      <button 
        onClick={() => onSubmit(ans)}
        className="mt-6 w-full py-4 bg-accent text-charcoal font-bold rounded-xl hover:brightness-110"
      >
        SUBMIT RESPONSE
      </button>
    </motion.div>
  );
};