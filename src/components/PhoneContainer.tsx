
import React from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

const PhoneContainer = ({ children }: PhoneContainerProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="phone-container relative w-full max-w-sm mx-auto bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden h-[812px] w-full">
          {/* iPhone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50"></div>
          {/* Content area */}
          <div className="relative z-10 h-full w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneContainer;
