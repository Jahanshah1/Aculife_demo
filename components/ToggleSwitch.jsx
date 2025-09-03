import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ToggleSwitch = ({ isOn, onToggle, size = 'md' }) => {
  const sizeClasses = {
    sm: {
      container: 'w-12 h-6',
      circle: 'w-5 h-5',
      icon: 'w-3 h-3',
      translate: 'translate-x-6'
    },
    md: {
      container: 'w-14 h-7',
      circle: 'w-6 h-6',
      icon: 'w-3.5 h-3.5',
      translate: 'translate-x-7'
    },
    lg: {
      container: 'w-16 h-8',
      circle: 'w-7 h-7',
      icon: 'w-4 h-4',
      translate: 'translate-x-8'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <button
      onClick={onToggle}
      className={`${currentSize.container} relative rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isOn 
          ? 'bg-blue-600 dark:bg-blue-500' 
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <div
        className={`${currentSize.circle} bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isOn ? currentSize.translate : 'translate-x-0'
        }`}
      >
        {isOn ? (
          <Moon className={`${currentSize.icon} text-blue-600`} />
        ) : (
          <Sun className={`${currentSize.icon} text-yellow-500`} />
        )}
      </div>
    </button>
  );
};

export const ThemeToggle = ({ isDark, toggleTheme, size = 'md', showLabel = false }) => {
  return (
    <div className="flex items-center space-x-3">
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
      <ToggleSwitch 
        isOn={isDark} 
        onToggle={toggleTheme} 
        size={size}
      />
    </div>
  );
};