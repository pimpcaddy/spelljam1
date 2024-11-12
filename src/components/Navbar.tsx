import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/demo', label: 'Demo' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/flashcards', label: 'Flash Cards' },
    { path: '/test', label: 'Practice Test' },
    { path: '/library', label: 'Word Library' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-8 h-8 text-purple-600" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Spell Jam
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-purple-100 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md hover:shadow-lg group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Login</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-purple-600" />
              ) : (
                <Menu className="w-6 h-6 text-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white"
            >
              <div className="py-4 space-y-2 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2 px-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:opacity-90 transition-opacity shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>Login / Sign Up</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;