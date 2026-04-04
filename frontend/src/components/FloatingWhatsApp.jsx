import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    // You can replace this with a real WhatsApp link if the user provides a number
    // Format: https://wa.me/YOUR_NUMBER?text=YOUR_MESSAGE
    window.open('https://wa.me/?text=Hello! I am interested in a consultation with Vivam Software Services & IT Trainings.', '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-emerald-500 text-white shadow-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors group"
      aria-label="Contact on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Talk to our Experts
      </span>
    </motion.button>
  );
}
