
import React from 'react';

const FloatingActionButton = () => {
  return (
    <button className="absolute bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50">
      <span className="text-2xl">+</span>
    </button>
  );
};

export default FloatingActionButton;
