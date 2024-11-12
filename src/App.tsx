import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import FlashCards from './pages/FlashCards';
import SpellingTest from './pages/SpellingTest';
import WordLibrary from './pages/WordLibrary';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/test" element={<SpellingTest />} />
          <Route path="/library" element={<WordLibrary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;