import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, BookOpen, PenTool, Trophy, ArrowRight, Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlashCard from '../components/FlashCard';

interface DemoWord {
  word: string;
  sentence: string;
}

function Demo() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('addwords');
  const [newWord, setNewWord] = useState('');
  const [testDate, setTestDate] = useState('');
  const [demoWords, setDemoWords] = useState<DemoWord[]>([
    { word: 'beautiful', sentence: 'The garden is beautiful in spring.' },
    { word: 'because', sentence: 'I love reading because it takes me on adventures.' },
    { word: 'different', sentence: 'Every snowflake is different.' }
  ]);
  
  const addWord = () => {
    if (newWord.trim()) {
      setDemoWords([
        ...demoWords,
        {
          word: newWord.trim(),
          sentence: `Example sentence with the word "${newWord.trim()}".`
        }
      ]);
      setNewWord('');
    }
  };

  const removeWord = (index: number) => {
    setDemoWords(demoWords.filter((_, i) => i !== index));
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">Try Spell Jam</h1>
        <p className="text-lg md:text-xl text-gray-600">Learn your weekly spelling words the fun way!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { id: 'addwords', icon: Plus, title: 'Add Weekly Words', description: 'Add new words from your teacher' },
          { id: 'flashcards', icon: BookOpen, title: 'Flash Cards', description: 'Practice with interactive cards' },
          { id: 'test', icon: PenTool, title: 'Practice Test', description: 'Test yourself before school' },
          { id: 'progress', icon: Trophy, title: 'Track Progress', description: 'See how well you are doing' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`p-6 rounded-xl flex flex-col items-center gap-3 text-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <tab.icon className="w-8 h-8" />
            <div>
              <div className="font-semibold">{tab.title}</div>
              <div className="text-sm opacity-80">{tab.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'addwords' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold">This Week's Words</h2>
                <p className="text-gray-600">Add the words your teacher gave you</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Test Date</span>
                  <input
                    type="date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-medium">New Word</span>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addWord();
                        }
                      }}
                      placeholder="Type a word..."
                      className="block flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                    />
                    <button
                      onClick={addWord}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </label>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-medium text-purple-800 mb-3">Word List</h3>
                <div className="space-y-2">
                  {demoWords.map((word, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 group">
                      <span>{word.word}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const utterance = new SpeechSynthesisUtterance(word.word);
                            window.speechSynthesis.speak(utterance);
                          }}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeWord(index)}
                          className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Once you add your words, they'll appear in Flash Cards and Practice Tests!
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Save Word List
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'flashcards' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <FlashCard
              word={demoWords[currentWordIndex].word}
              sentence={demoWords[currentWordIndex].sentence}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentWordIndex((prev) => (prev > 0 ? prev - 1 : demoWords.length - 1))}
                className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentWordIndex((prev) => (prev < demoWords.length - 1 ? prev + 1 : 0))}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'test' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Practice Test</h2>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(demoWords[currentWordIndex].word);
                  window.speechSynthesis.speak(utterance);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-lg"
              >
                <Volume2 className="w-6 h-6" />
                Listen to Word
              </button>
            </div>
            <input
              type="text"
              placeholder="Type what you hear..."
              className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
            />
            <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Check Answer
            </button>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Track Your Progress</h2>
              <p className="text-gray-600">Sign up to unlock full progress tracking!</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{demoWords.length}</div>
                <div className="text-sm text-gray-600">Words Added</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Your Spelling Words?</h3>
        <p className="text-white text-lg mb-6">Join now and ace your next spelling test!</p>
        <Link
          to="/login"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-opacity group"
        >
          Start Learning Now 
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

export default Demo;