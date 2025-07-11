import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Menyiapkan sayuran segar...",
  "Memetik hasil panen terbaik...",
  "Menghubungkan ke petani lokal...",
  "Hampir siap...",
];

const LoadingScreen: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <motion.div
        className="w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-700"
        >
          {loadingMessages[currentMessageIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
