
import React, { useState } from 'react';

interface SmartFilterProps {
  onBack: () => void;
}

const SmartFilter = ({ onBack }: SmartFilterProps) => {
  const [filters, setFilters] = useState({
    jobRejections: false,
    promotions: true,
    socialMedia: false,
    news: false,
    emails: true,
    reminders: true
  });

  const toggleFilter = (key: string) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filterOptions = [
    { key: 'jobRejections', label: 'Job Rejections', icon: '💼' },
    { key: 'promotions', label: 'Promotions', icon: '🎉' },
    { key: 'socialMedia', label: 'Social Media', icon: '📱' },
    { key: 'news', label: 'Breaking News', icon: '📰' },
    { key: 'emails', label: 'Work Emails', icon: '📧' },
    { key: 'reminders', label: 'Health Reminders', icon: '⏰' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-orange-50 to-yellow-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🔔 Smart Filter</h1>
            <p className="text-gray-600">Control your notifications</p>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="px-6 space-y-4 mb-20">
        {filterOptions.map((option) => (
          <div key={option.key} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg font-medium text-gray-800">{option.label}</span>
              </div>
              <button
                onClick={() => toggleFilter(option.key)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  filters[option.key] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  filters[option.key] ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartFilter;
