
import React, { useState } from 'react';
import PhoneContainer from '../components/PhoneContainer';
import MoodSelection from '../components/MoodSelection';
import HomeDashboard from '../components/HomeDashboard';
import AIPlanner from '../components/AIPlanner';
import MoodJournal from '../components/MoodJournal';
import SmartFilter from '../components/SmartFilter';
import BurnoutShield from '../components/BurnoutShield';
import Insights from '../components/Insights';
import BottomNavigation from '../components/BottomNavigation';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTaskModal from '../components/AddTaskModal';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('mood-selection');
  const [activeTab, setActiveTab] = useState('home');
  const [userMood, setUserMood] = useState('😊');
  const [stressLevel, setStressLevel] = useState(70);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Task tracking state
  const [completedTasks, setCompletedTasks] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [customNotifications, setCustomNotifications] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, task: 'Team meeting at 10 AM', completed: false },
    { id: 2, task: 'Project review', completed: false },
    { id: 3, task: 'Client presentation', completed: false }
  ]);

  const handleMoodSelect = (mood: string, stressValue: number) => {
    setUserMood(mood);
    setStressLevel(stressValue);
    setCurrentPage('home');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentPage('home');
    } else if (tab === 'journal') {
      setCurrentPage('mood-journal');
    } else if (tab === 'insights') {
      setCurrentPage('insights');
    }
  };

  const handleTaskComplete = (taskId: string, taskTitle: string) => {
    const newTask = {
      id: taskId,
      title: taskTitle,
      completedAt: new Date().toISOString(),
      mood: userMood,
      date: new Date().toDateString()
    };
    setCompletedTasks(prev => [...prev, newTask]);
  };

  const handleJournalEntry = (entry: string) => {
    const newEntry = {
      id: Date.now().toString(),
      text: entry,
      mood: userMood,
      date: new Date().toDateString(),
      timestamp: new Date().toISOString()
    };
    setJournalEntries(prev => [...prev, newEntry]);
  };

  const handleAddNotification = (notification: string) => {
    const newNotification = {
      id: Date.now().toString(),
      label: notification,
      enabled: true
    };
    setCustomNotifications(prev => [...prev, newNotification]);
  };

  const handleAddTask = (task: string) => {
    const newTask = {
      id: Date.now(),
      task: task,
      completed: false
    };
    setTodaysTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (taskId: number) => {
    setTodaysTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'mood-selection':
        return <MoodSelection onMoodSelect={handleMoodSelect} />;
      case 'home':
        return (
          <HomeDashboard 
            mood={userMood} 
            stressLevel={stressLevel} 
            onNavigate={handleNavigation}
            todaysTasks={todaysTasks}
            onToggleTask={handleToggleTask}
          />
        );
      case 'ai-planner':
        return <AIPlanner onBack={() => setCurrentPage('home')} mood={userMood} stressLevel={stressLevel} />;
      case 'mood-journal':
        return (
          <MoodJournal 
            onBack={() => setCurrentPage('home')} 
            mood={userMood} 
            stressLevel={stressLevel}
            onTaskComplete={handleTaskComplete}
            onJournalEntry={handleJournalEntry}
            onAddNotification={handleAddNotification}
          />
        );
      case 'smart-filter':
        return (
          <SmartFilter 
            onBack={() => setCurrentPage('home')}
            customNotifications={customNotifications}
            onToggleCustomNotification={(id) => {
              setCustomNotifications(prev => 
                prev.map(notif => 
                  notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
                )
              );
            }}
          />
        );
      case 'burnout-shield':
        return <BurnoutShield onBack={() => setCurrentPage('home')} />;
      case 'insights':
        return (
          <Insights 
            onBack={() => setCurrentPage('home')}
            completedTasks={completedTasks}
            journalEntries={journalEntries}
            mood={userMood}
          />
        );
      default:
        return <MoodSelection onMoodSelect={handleMoodSelect} />;
    }
  };

  return (
    <PhoneContainer>
      <div className="relative h-full">
        {renderCurrentPage()}
        
        {currentPage !== 'mood-selection' && (
          <>
            <FloatingActionButton onClick={() => setShowAddModal(true)} />
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </>
        )}

        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAddTask={handleAddTask}
            onAddNotification={handleAddNotification}
            currentPage={currentPage}
          />
        )}
      </div>
    </PhoneContainer>
  );
};

export default Index;
