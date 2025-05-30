
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

interface HomeDashboardProps {
  mood: string;
  stressLevel: number;
  onNavigate: (page: string) => void;
  todaysTasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const HomeDashboard = ({ mood, stressLevel, onNavigate, todaysTasks, onToggleTask }: HomeDashboardProps) => {
  const tools = [
    { icon: '🧠', title: 'AI Planner', subtitle: 'Smart scheduling', page: 'ai-planner' },
    { icon: '💭', title: 'Mood Journal', subtitle: 'Track feelings', page: 'mood-journal' },
    { icon: '🔔', title: 'Smart Filter', subtitle: 'Manage notifications', page: 'smart-filter' },
    { icon: '🛡️', title: 'Burnout Shield', subtitle: 'Health prompts', page: 'burnout-shield' }
  ];

  const getStressColor = (level: number) => {
    if (level >= 70) return 'text-green-500';
    if (level >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStressLabel = (level: number) => {
    if (level >= 70) return 'Low Stress';
    if (level >= 40) return 'Moderate';
    return 'High Stress';
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Good Morning!</h1>
            <p className="text-gray-600">Let's make today stress-free</p>
          </div>
          <div className="text-3xl">{mood}</div>
        </div>

        {/* Stress Meter */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Stress Level</span>
            <span className={`text-sm font-bold ${getStressColor(stressLevel)}`}>
              {getStressLabel(stressLevel)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                stressLevel >= 70 ? 'bg-green-500' : 
                stressLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${stressLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => onNavigate(tool.page)}
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h3 className="text-sm font-bold text-gray-800">{tool.title}</h3>
              <p className="text-xs text-gray-600">{tool.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Focus */}
      <div className="px-6 mb-20">
        <h2 className="text-lg font-bold text-gray-800 mb-4">📅 Today's Focus</h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          {todaysTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 py-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="w-4 h-4"
              />
              <span className={`text-gray-800 text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
