
import React from 'react';

interface AIPlannerProps {
  onBack: () => void;
}

const AIPlanner = ({ onBack }: AIPlannerProps) => {
  const features = [
    {
      icon: '⚡',
      title: 'Energy-Based Prioritization',
      description: 'Tasks are scheduled when your energy levels are optimal'
    },
    {
      icon: '📆',
      title: 'Smart Scheduling',
      description: 'Urgent tasks are automatically slotted into your calendar'
    },
    {
      icon: '🧘',
      title: 'Break Recommendations',
      description: 'AI suggests breaks to prevent burnout and maintain focus'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🧠 AI Planner</h1>
            <p className="text-gray-600">Let AI optimize your day</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="px-6 mt-8 mb-20">
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
          Generate My Schedule
        </button>
      </div>
    </div>
  );
};

export default AIPlanner;
