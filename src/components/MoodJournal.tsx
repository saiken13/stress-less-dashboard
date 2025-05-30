
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface MoodJournalProps {
  onBack: () => void;
  mood: string;
  stressLevel: number;
  onTaskComplete: (taskId: string, taskTitle: string) => void;
  onJournalEntry: (entry: string) => void;
  onAddNotification: (notification: string) => void;
}

const MoodJournal = ({ onBack, mood, stressLevel, onTaskComplete, onJournalEntry, onAddNotification }: MoodJournalProps) => {
  const isStressed = stressLevel <= 30;
  const [journalText, setJournalText] = useState('');
  const [newNotification, setNewNotification] = useState('');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  
  const stressedActivities = [
    { id: 'games', icon: '🎮', title: 'Play Games', description: 'Relax with your favorite games' },
    { id: 'gym', icon: '🏋️', title: 'Do Gym', description: 'Release stress through exercise' },
    { id: 'call', icon: '📞', title: 'Call Loved Ones', description: 'Connect with family and friends' },
    { id: 'meditate', icon: '🧘', title: 'Meditate', description: 'Find inner peace and calm' },
    { id: 'cook', icon: '🍳', title: 'Cook Something', description: 'Express creativity through cooking' },
    { id: 'walk', icon: '🚶', title: 'Take a Walk', description: 'Get some fresh air and movement' }
  ];

  const productiveActivities = [
    { id: 'laundry', icon: '🧺', title: 'Do Laundry', description: 'Get your clothes clean and organized' },
    { id: 'assignment', icon: '📝', title: 'Complete Assignment', description: 'Finish your pending homework' },
    { id: 'work', icon: '💼', title: 'Office Work', description: 'Tackle your work projects' },
    { id: 'clean', icon: '🧹', title: 'Clean House', description: 'Organize your living space' },
    { id: 'study', icon: '📚', title: 'Study/Read', description: 'Learn something new today' },
    { id: 'emails', icon: '📧', title: 'Answer Emails', description: 'Clear your inbox' }
  ];

  const activities = isStressed ? stressedActivities : productiveActivities;
  const headerTitle = isStressed ? '💭 Stress Relief' : '⚡ Productive Tasks';
  const headerDescription = isStressed ? 'Calming activities for you' : 'Get things done today';

  const handleTaskCheck = (taskId: string, taskTitle: string, checked: boolean) => {
    if (checked) {
      setCompletedTasks(prev => new Set(prev).add(taskId));
      onTaskComplete(taskId, taskTitle);
    } else {
      setCompletedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const handleSaveEntry = () => {
    if (journalText.trim()) {
      onJournalEntry(journalText);
      setJournalText('');
    }
  };

  const handleAddNotification = () => {
    if (newNotification.trim()) {
      onAddNotification(newNotification);
      setNewNotification('');
    }
  };

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
        {activities.map((activity) => (
          <div key={activity.id} className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <Checkbox
                id={activity.id}
                checked={completedTasks.has(activity.id)}
                onCheckedChange={(checked) => handleTaskCheck(activity.id, activity.title, checked as boolean)}
                className="w-5 h-5"
              />
              <div className="text-3xl">{activity.icon}</div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Notification */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Custom Notification</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
              placeholder="Enter notification type..."
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddNotification}
              className="bg-blue-500 text-white px-4 py-3 rounded-xl font-bold"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Journal Entry */}
      <div className="px-6 mt-8 mb-32">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">How was your day?</h3>
          <textarea 
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write about your feelings..."
            className="w-full h-24 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSaveEntry}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl py-3 font-bold"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodJournal;
