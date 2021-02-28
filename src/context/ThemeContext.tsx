import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from "react"

interface ThemeContextData {
  currentTheme: 'light' | 'dark';
  isDarkMode: boolean;
  handleDarkModeChange: (isDarkMode: boolean) => void;
}

interface ThemeContextProps {
  children: ReactNode;
  currentTheme: 'light' | 'dark';
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children, ...rest }: ThemeContextProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(rest.currentTheme);
  const [isDarkMode, setIsDarkMode] = useState(rest.currentTheme === 'dark');

  function handleDarkModeChange(darkMode: boolean) {
    setCurrentTheme(darkMode ? 'dark' : 'light');
    setIsDarkMode(darkMode);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    Cookies.set('currentTheme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, isDarkMode, handleDarkModeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}