import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Trophy, Star, GraduationCap, Heart } from 'lucide-react';

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Spell Jam
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Make learning spellings fun and effective with interactive games, voice guidance, and progress tracking
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
        {[
          {
            icon: <Brain className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />,
            title: "Smart Learning",
            description: "Personalized learning path adapts to your child's progress"
          },
          {
            icon: <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-500" />,
            title: "Fun Practice",
            description: "Interactive flashcards and games make learning enjoyable"
          },
          {
            icon: <Trophy className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />,
            title: "Track Progress",
            description: "Watch your child's confidence grow with detailed progress reports"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-24">
        <Link
          to="/demo"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
        >
          Try Demo <Sparkles className="ml-2 w-5 h-5 animate-bounce-slow" />
        </Link>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "Spell Jam has transformed our weekly spelling practice from a chore into something my daughter looks forward to!",
              author: "Sarah Thompson",
              role: "Parent",
              stars: 5
            },
            {
              quote: "As a teacher, I've seen remarkable improvement in my students' spelling confidence and scores.",
              author: "Michael Rodriguez",
              role: "3rd Grade Teacher",
              stars: 5
            },
            {
              quote: "The interactive approach and progress tracking make it the perfect tool for both home and classroom use.",
              author: "Dr. Emily Chen",
              role: "Education Specialist",
              stars: 5
            }
          ].map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-4">"{review.quote}"</blockquote>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <GraduationCap className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="mb-8 text-lg">Join thousands of happy students mastering spelling the fun way!</p>
        <Link
          to="/login"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-opacity shadow-lg hover:shadow-xl"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
}

export default Home;