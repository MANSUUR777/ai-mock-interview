import { motion } from 'framer-motion';

export const ResultView = ({ result, onNext, onRestart }) => (
  <motion.div 
    initial={{ scale: 0.95, opacity: 0 }} 
    animate={{ scale: 1, opacity: 1 }} 
    className="text-center max-w-md"
  >
    <div className="text-7xl font-bold text-accent mb-4">
      {result?.score}%   {/* ✅ SAFE */}
    </div>

    <div className="bg-white/5 p-6 rounded-2xl mb-8">
      <p className="text-gray-400 italic">
        "{result?.feedback}"   {/* ✅ SAFE */}
      </p>
    </div>

    <div className="flex gap-4">
      <button 
        onClick={onRestart} 
        className="flex-1 py-4 border border-white/10 rounded-xl"
      >
        Restart
      </button>

      <button 
        onClick={onNext} 
        className="flex-1 py-4 bg-cream text-charcoal font-bold rounded-xl"
      >
        Next
      </button>
    </div>
  </motion.div>
);