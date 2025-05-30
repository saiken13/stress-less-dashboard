
import React, { useState } from 'react';
import PhoneContainer from '../components/PhoneContainer';
import MoodSelection from '../components/MoodSelection';
import HomeDashboard from '../components/HomeDashboard';
import AIPlanner from '../components/AIPlanner';
import MoodJournal from '../components/MoodJournal';
import SmartFilter from '../components/SmartFilter';
import BurnoutShield from '../components/BurnoutShield';
import BottomNavigation from '../components/BottomNavigation';
import FloatingActionButton from '../components/FloatingActionButton';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('mood-selection');
  const [activeTab, setActiveTab] = useState('home');
  const [userMood, setUserMood] = useState('😊');
  const [stressLevel, setStressLevel] = useState(70);

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
    }
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
          />
        );
      case 'ai-planner':
        return <AIPlanner onBack={() => setCurrentPage('home')} />;
      case 'mood-journal':
        return <MoodJournal onBack={() => setCurrentPage('home')} />;
      case 'smart-filter':
        return <SmartFilter onBack={() => setCurrentPage('home')} />;
      case 'burnout-shield':
        return <BurnoutShield onBack={() => setCurrentPage('home')} />;
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
            <FloatingActionButton />
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </>
        )}
      </div>
    </PhoneContainer>
  );
};

export default Index;
