import { motion } from 'framer-motion';

export const Loader = () => (
  <div className="flex flex-col items-center justify-center p-10">
    <motion.div 
      className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full mb-4"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <p className="text-accent tracking-tighter animate-pulse">AI IS THINKING...</p>
  </div>
);