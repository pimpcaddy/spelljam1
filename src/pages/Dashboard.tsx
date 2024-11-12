import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Alex!</h1>
        <p className="text-gray-600">Track your spelling progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Trophy, title: 'Weekly Score', value: '85%' },
          { icon: Target, title: 'Words Mastered', value: '24' },
          { icon: Calendar, title: 'Practice Streak', value: '5 days' },
          { icon: TrendingUp, title: 'Improvement', value: '+12%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <stat.icon className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { title: 'Completed Practice Test', score: '8/10', time: '2 hours ago' },
            { title: 'Learned New Words', count: '5 words', time: '1 day ago' },
            { title: 'Weekly Challenge', status: 'Completed', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
              <span className="text-purple-600 font-medium">
                {activity.score || activity.count || activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;