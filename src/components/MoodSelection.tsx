
import React from 'react';

interface MoodSelectionProps {
  onMoodSelect: (mood: string, value: number) => void;
}

const MoodSelection = ({ onMoodSelect }: MoodSelectionProps) => {
  const moods = [
    { emoji: '😄', label: 'Excellent', value: 90 },
    { emoji: '😊', label: 'Good', value: 70 },
    { emoji: '😐', label: 'Okay', value: 50 },
    { emoji: '😟', label: 'Not Great', value: 30 },
    { emoji: '😫', label: 'Stressed', value: 10 }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">How are you feeling today?</h1>
        <p className="text-gray-600">Your mood helps us personalize your experience</p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onMoodSelect(mood.emoji, mood.value)}
            className="w-full bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-lg font-medium text-gray-800">{mood.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
