import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface FlashCardProps {
  word: string;
  sentence: string;
}

export default function FlashCard({ word, sentence }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      className="perspective-1000 relative h-96 w-full cursor-pointer" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col items-center justify-center">
            <h2 className="text-6xl font-bold text-purple-600 mb-8">{word}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(word);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-lg"
            >
              <Volume2 className="w-6 h-6" />
              Listen
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-purple-600 text-white rounded-2xl shadow-xl p-8 h-full flex flex-col items-center justify-center">
            <p className="text-2xl text-center mb-8">{sentence}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(sentence);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-50 transition-colors text-lg"
            >
              <Volume2 className="w-6 h-6" />
              Listen
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}