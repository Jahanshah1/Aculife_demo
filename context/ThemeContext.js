'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem('aculife-theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark') {
        setIsDark(true);
      } else if (savedTheme === 'light') {
        setIsDark(false);
      } else {
        setIsDark(systemPrefersDark);
      }
    } catch (error) {
      console.log('Theme initialization error:', error);
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('aculife-theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.log('Theme application error:', error);
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Always provide context so consumers never render outside the provider
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
