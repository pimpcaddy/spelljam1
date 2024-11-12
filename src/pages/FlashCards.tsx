import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FlashCard from '../components/FlashCard';
import WordListSelector from '../components/WordListSelector';
import { useWordStore } from '../lib/wordStore';

export default function FlashCards() {
  const { wordLists, selectedListId, getAllWords } = useWordStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = useMemo(() => {
    if (selectedListId) {
      const list = wordLists.find(l => l.id === selectedListId);
      return list?.words || [];
    }
    return getAllWords();
  }, [wordLists, selectedListId, getAllWords]);

  if (words.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Flash Cards</h1>
        <p className="text-xl text-gray-600 mb-8">No words available. Add some words in the Word Library!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Flash Cards</h1>
        <p className="text-xl text-gray-600 mb-8">Click the card to flip it!</p>
        <WordListSelector />
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <FlashCard
            word={words[currentIndex].word}
            sentence={words[currentIndex].sentence}
          />

          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-16">
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : words.length - 1))}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-16">
            <button
              onClick={() => setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0))}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Card {currentIndex + 1} of {words.length}
          </p>
        </div>
      </div>
    </div>
  );
}