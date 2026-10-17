import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from './utils/sound';

const PersonalityContext = createContext();

export const PersonalityProvider = ({ children }) => {
  // 'tokyonight' (default high-tech cyan/dark), 'cyberpunk' (neon violet/cyan), 'minimal' (clean monochrome)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('tr_portfolio_mode') || 'tokyonight';
  });
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tr_portfolio_theme') || 'dark';
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('tr_portfolio_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tr_portfolio_mode', mode);
  }, [mode]);

  const cycleMode = () => {
    sound.playPop();
    setMode((prev) => {
      if (prev === 'tokyonight') return 'cyberpunk';
      if (prev === 'cyberpunk') return 'minimal';
      return 'tokyonight';
    });
  };

  const toggleTheme = () => {
    sound.playPop();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const state = sound.toggle();
    setSoundEnabled(state);
    return state;
  };

  return (
    <PersonalityContext.Provider value={{
      mode,
      setMode,
      cycleMode,
      theme,
      toggleTheme,
      soundEnabled,
      toggleSound
    }}>
      {children}
    </PersonalityContext.Provider>
  );
};

export const usePersonality = () => useContext(PersonalityContext);
