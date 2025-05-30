
import React, { useState } from 'react';

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: string) => void;
  onAddNotification: (notification: string) => void;
  currentPage: string;
}

const AddTaskModal = ({ onClose, onAddTask, onAddNotification, currentPage }: AddTaskModalProps) => {
  const [activeTab, setActiveTab] = useState('task');
  const [taskText, setTaskText] = useState('');
  const [notificationText, setNotificationText] = useState('');

  const handleSubmit = () => {
    if (activeTab === 'task' && taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    } else if (activeTab === 'notification' && notificationText.trim()) {
      onAddNotification(notificationText);
      setNotificationText('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Add New</h3>
          <button onClick={onClose} className="text-gray-500 text-xl">×</button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('task')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              activeTab === 'task' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Task
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              activeTab === 'notification' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Notification
          </button>
        </div>

        {/* Content */}
        {activeTab === 'task' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a new task to Today's Focus
            </label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="e.g., Team standup meeting"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a custom notification type
            </label>
            <input
              type="text"
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              placeholder="e.g., Workout reminders"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
