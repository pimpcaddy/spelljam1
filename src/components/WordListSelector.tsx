import React from 'react';
import { useWordStore } from '../lib/wordStore';

export default function WordListSelector() {
  const { wordLists, selectedListId, setSelectedList } = useWordStore();

  return (
    <div className="mb-8">
      <select
        value={selectedListId || ''}
        onChange={(e) => setSelectedList(e.target.value ? Number(e.target.value) : null)}
        className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      >
        <option value="">All Words</option>
        {wordLists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title} ({list.words.length} words)
          </option>
        ))}
      </select>
    </div>
  );
}