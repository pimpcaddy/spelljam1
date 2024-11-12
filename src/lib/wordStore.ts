import { create } from 'zustand';

interface Word {
  word: string;
  sentence: string;
}

interface WordList {
  id: number;
  title: string;
  date: string;
  words: Word[];
}

interface WordStore {
  wordLists: WordList[];
  selectedListId: number | null;
  addWordList: (title: string, date: string) => number;
  addWord: (listId: number, word: string, sentence: string) => void;
  setSelectedList: (listId: number | null) => void;
  getAllWords: () => Word[];
}

export const useWordStore = create<WordStore>((set, get) => ({
  wordLists: [],
  selectedListId: null,

  addWordList: (title, date) => {
    const newId = Date.now();
    set((state) => ({
      wordLists: [
        {
          id: newId,
          title,
          date,
          words: [],
        },
        ...state.wordLists,
      ],
    }));
    return newId;
  },

  addWord: (listId, word, sentence) => {
    set((state) => ({
      wordLists: state.wordLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              words: [...list.words, { word, sentence }],
            }
          : list
      ),
    }));
  },

  setSelectedList: (listId) => {
    set({ selectedListId: listId });
  },

  getAllWords: () => {
    const { wordLists } = get();
    return wordLists.flatMap((list) => list.words);
  },
}));