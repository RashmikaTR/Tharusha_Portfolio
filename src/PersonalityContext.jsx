import React, { createContext, useContext, useState, useEffect } from 'react';

const PersonalityContext = createContext();

export const PersonalityProvider = ({ children }) => {
  const [mode, setMode] = useState('professional'); // 'professional' or 'creative'
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'professional' ? 'creative' : 'professional'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <PersonalityContext.Provider value={{ mode, toggleMode, theme, toggleTheme }}>
      {children}
    </PersonalityContext.Provider>
  );
};

export const usePersonality = () => useContext(PersonalityContext);
