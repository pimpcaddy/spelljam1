import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check, X, ArrowRight, Trophy, BookOpen, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import WordListSelector from '../components/WordListSelector';
import { useWordStore } from '../lib/wordStore';

export default function SpellingTest() {
  const { wordLists, selectedListId, getAllWords } = useWordStore();
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const testWords = useMemo(() => {
    if (selectedListId) {
      const list = wordLists.find((l) => l.id === selectedListId);
      return list?.words || [];
    }
    return getAllWords();
  }, [wordLists, selectedListId, getAllWords]);

  const checkAnswer = () => {
    const isWordCorrect = currentWord.toLowerCase() === testWords[currentWordIndex].word.toLowerCase();
    setIsCorrect(isWordCorrect);
    if (isWordCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setShowNextButton(true);
  };

  const nextWord = () => {
    if (currentWordIndex < testWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentWord('');
      setIsCorrect(null);
      setShowNextButton(false);
    } else {
      setShowCelebration(true);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (testWords.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Spelling Test</h1>
        <p className="text-xl text-gray-600 mb-8">No words available. Add some words in the Word Library!</p>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Confetti numberOfPieces={200} recycle={false} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
        >
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You completed the test with a score of {correctCount} out of {testWords.length}!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/flashcards"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Practice More
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Spelling Test</h1>
          <p className="text-xl text-gray-600 mb-8">Listen carefully and type what you hear!</p>
          <WordListSelector />
          <p className="text-gray-600">
            Word {currentWordIndex + 1} of {testWords.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => speak(testWords[currentWordIndex].word)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-lg"
            >
              <Volume2 className="w-6 h-6" />
              Play Word
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                value={currentWord}
                onChange={(e) => setCurrentWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !showNextButton) {
                    checkAnswer();
                  } else if (e.key === 'Enter' && showNextButton) {
                    nextWord();
                  }
                }}
                className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Type the word here..."
                autoFocus
              />
            </div>

            {showNextButton ? (
              <button
                onClick={nextWord}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg flex items-center justify-center gap-2"
              >
                Next Word
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={checkAnswer}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg"
              >
                Check Answer
              </button>
            )}

            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5" />
                    <span>The correct spelling is: {testWords[currentWordIndex].word}</span>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}