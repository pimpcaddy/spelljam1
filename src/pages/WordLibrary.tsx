import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Volume2, X } from 'lucide-react';

function WordLibrary() {
  const [wordLists, setWordLists] = useState([
    {
      id: 1,
      title: 'Week 1 - Long Vowels',
      date: '2024-03-10',
      words: ['beach', 'dream', 'light', 'road', 'blue'],
    },
    {
      id: 2,
      title: 'Week 2 - Silent Letters',
      date: '2024-03-17',
      words: ['knife', 'write', 'thumb', 'ghost', 'climb'],
    },
  ]);

  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [newListDate, setNewListDate] = useState('');
  const [newWord, setNewWord] = useState('');
  const [editingListId, setEditingListId] = useState<number | null>(null);

  const addNewList = () => {
    if (newListTitle && newListDate) {
      setWordLists([
        {
          id: Date.now(),
          title: newListTitle,
          date: newListDate,
          words: [],
        },
        ...wordLists,
      ]);
      setNewListTitle('');
      setNewListDate('');
      setShowNewListModal(false);
    }
  };

  const addWordToList = (listId: number) => {
    if (newWord.trim()) {
      setWordLists(wordLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            words: [...list.words, newWord.trim()]
          };
        }
        return list;
      }));
      setNewWord('');
      setEditingListId(null);
    }
  };

  const deleteList = (listId: number) => {
    setWordLists(wordLists.filter(list => list.id !== listId));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Word Library</h1>
        <button 
          onClick={() => setShowNewListModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New List
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {wordLists.map((list) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{list.title}</h2>
                  <p className="text-sm text-gray-600">Test Date: {list.date}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingListId(list.id)}
                    className="p-2 text-gray-600 hover:text-purple-600"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => deleteList(list.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {list.words.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <span className="font-medium">{word}</span>
                    <button
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(word);
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="text-gray-600 hover:text-purple-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editingListId === list.id && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="Add word..."
                      className="flex-1 rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => addWordToList(list.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showNewListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Word List</h2>
              <button
                onClick={() => setShowNewListModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  List Title
                </label>
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Week 3 - Compound Words"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Date
                </label>
                <input
                  type="date"
                  value={newListDate}
                  onChange={(e) => setNewListDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewListModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewList}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create List
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default WordLibrary;