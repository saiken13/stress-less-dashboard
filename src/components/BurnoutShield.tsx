
import React from 'react';

interface BurnoutShieldProps {
  onBack: () => void;
}

const BurnoutShield = ({ onBack }: BurnoutShieldProps) => {
  const healthPrompts = [
    { icon: '🚶', title: 'Walk 10,000 Steps', progress: 7532, target: 10000, unit: 'steps' },
    { icon: '🏋️', title: 'Gym Workout', description: 'Schedule your next workout session' },
    { icon: '🥗', title: 'Nourishing Meal', description: 'Plan a healthy meal for today' },
    { icon: '💧', title: 'Hydration Goal', progress: 6, target: 8, unit: 'glasses' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 to-teal-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🛡️ Burnout Shield</h1>
            <p className="text-gray-600">Proactive health prompts</p>
          </div>
        </div>
      </div>

      {/* Health Prompts */}
      <div className="px-6 space-y-4 mb-20">
        {healthPrompts.map((prompt, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{prompt.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{prompt.title}</h3>
                {prompt.progress ? (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{prompt.progress} {prompt.unit}</span>
                      <span>{prompt.target} {prompt.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(prompt.progress / prompt.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{prompt.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BurnoutShield;
