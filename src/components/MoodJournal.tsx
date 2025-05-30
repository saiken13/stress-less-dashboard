
import React from 'react';

interface MoodJournalProps {
  onBack: () => void;
  mood: string;
  stressLevel: number;
}

const MoodJournal = ({ onBack, mood, stressLevel }: MoodJournalProps) => {
  const isStressed = stressLevel <= 30; // High stress when value is low
  
  const stressedActivities = [
    { icon: '🎮', title: 'Play Games', description: 'Relax with your favorite games' },
    { icon: '🏋️', title: 'Do Gym', description: 'Release stress through exercise' },
    { icon: '📞', title: 'Call Loved Ones', description: 'Connect with family and friends' },
    { icon: '🧘', title: 'Meditate', description: 'Find inner peace and calm' },
    { icon: '🍳', title: 'Cook Something', description: 'Express creativity through cooking' },
    { icon: '🚶', title: 'Take a Walk', description: 'Get some fresh air and movement' }
  ];

  const productiveActivities = [
    { icon: '🧺', title: 'Do Laundry', description: 'Get your clothes clean and organized' },
    { icon: '📝', title: 'Complete Assignment', description: 'Finish your pending homework' },
    { icon: '💼', title: 'Office Work', description: 'Tackle your work projects' },
    { icon: '🧹', title: 'Clean House', description: 'Organize your living space' },
    { icon: '📚', title: 'Study/Read', description: 'Learn something new today' },
    { icon: '📧', title: 'Answer Emails', description: 'Clear your inbox' }
  ];

  const activities = isStressed ? stressedActivities : productiveActivities;
  const headerTitle = isStressed ? '💭 Stress Relief' : '⚡ Productive Tasks';
  const headerDescription = isStressed ? 'Calming activities for you' : 'Get things done today';

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{headerTitle}</h1>
            <p className="text-gray-600">{headerDescription}</p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="px-6 space-y-4">
        {activities.map((activity, index) => (
          <button key={index} className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{activity.icon}</div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Journal Entry */}
      <div className="px-6 mt-8 mb-20">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">How was your day?</h3>
          <textarea 
            placeholder="Write about your feelings..."
            className="w-full h-24 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl py-3 font-bold">
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodJournal;
