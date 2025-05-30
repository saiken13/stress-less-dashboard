
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AIPlannerProps {
  onBack: () => void;
  mood?: string;
  stressLevel?: number;
}

const AIPlanner = ({ onBack, mood = '😊', stressLevel = 50 }: AIPlannerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const { toast } = useToast();

  const generateSchedule = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI schedule generation based on mood and stress level
      const isStressed = stressLevel <= 30;
      const scheduleItems = [];
      
      if (isStressed) {
        // Generate stress-relief focused schedule
        scheduleItems.push(
          { time: '9:00 AM', task: '🧘 Morning Meditation', duration: '15 min', priority: 'high' },
          { time: '9:30 AM', task: '☕ Gentle Morning Routine', duration: '30 min', priority: 'medium' },
          { time: '10:30 AM', task: '📝 Light Admin Work', duration: '45 min', priority: 'low' },
          { time: '11:30 AM', task: '🚶 Walk Break', duration: '15 min', priority: 'high' },
          { time: '12:00 PM', task: '🥗 Mindful Lunch', duration: '45 min', priority: 'medium' },
          { time: '1:30 PM', task: '💼 Focus Work Block', duration: '60 min', priority: 'medium' },
          { time: '3:00 PM', task: '🧘 Stress Relief Break', duration: '15 min', priority: 'high' },
          { time: '4:00 PM', task: '🎮 Relaxing Activity', duration: '30 min', priority: 'low' },
          { time: '6:00 PM', task: '📞 Connect with Loved Ones', duration: '30 min', priority: 'medium' }
        );
      } else {
        // Generate productive schedule
        scheduleItems.push(
          { time: '8:00 AM', task: '🌅 Morning Workout', duration: '45 min', priority: 'high' },
          { time: '9:00 AM', task: '📋 Plan Your Day', duration: '15 min', priority: 'high' },
          { time: '9:30 AM', task: '💼 Deep Work Session', duration: '90 min', priority: 'high' },
          { time: '11:00 AM', task: '☕ Energy Break', duration: '15 min', priority: 'medium' },
          { time: '11:30 AM', task: '📝 Complete Assignment', duration: '60 min', priority: 'high' },
          { time: '12:30 PM', task: '🍽️ Lunch & Recharge', duration: '30 min', priority: 'medium' },
          { time: '1:30 PM', task: '🧺 Productive Tasks', duration: '45 min', priority: 'medium' },
          { time: '3:00 PM', task: '📧 Clear Emails', duration: '30 min', priority: 'low' },
          { time: '4:00 PM', task: '🧹 Organize Space', duration: '30 min', priority: 'low' },
          { time: '6:00 PM', task: '📚 Learning Time', duration: '45 min', priority: 'medium' }
        );
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSchedule(scheduleItems);
      
      toast({
        title: "Schedule Generated!",
        description: `Your ${isStressed ? 'stress-relief' : 'productive'} schedule is ready based on your current mood.`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

      {!schedule.length ? (
        <>
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
            <button 
              onClick={generateSchedule}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isGenerating ? 'Generating Schedule...' : 'Generate My Schedule'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Generated Schedule */}
          <div className="px-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Your Personalized Schedule {mood}
              </h3>
              <p className="text-gray-600 mb-4">
                Based on your current mood and stress level ({stressLevel}%)
              </p>
            </div>

            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-bold text-gray-700 w-16">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.task}</h4>
                        <p className="text-sm text-gray-600">{item.duration}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 mb-20 space-y-3">
              <button 
                onClick={generateSchedule}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl py-3 font-bold transition-all duration-300 disabled:opacity-50"
              >
                Regenerate Schedule
              </button>
              <button 
                onClick={() => setSchedule([])}
                className="w-full bg-gray-200 text-gray-700 rounded-2xl py-3 font-bold transition-all duration-300"
              >
                Start Over
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIPlanner;
