import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialSeconds, 
  onTimeUp,
  isRunning
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0 && isRunning) onTimeUp();
  }, [seconds, isRunning, onTimeUp]);

  // Format MM:SS
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const isDanger = seconds <= 10;

  return (
    <motion.div 
      animate={isDanger ? { scale: [1, 1.05, 1], color: ['#ef4444', '#b91c1c', '#ef4444'] } : {}}
      transition={isDanger ? { repeat: Infinity, duration: 1 } : {}}
      className={`flex items-center gap-2 font-display font-bold text-xl px-4 py-2 rounded-xl border ${
        isDanger ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200 text-slate-700'
      }`}
    >
      <Clock size={20} className={isDanger ? 'animate-pulse' : ''} />
      {timeString}
    </motion.div>
  );
};
