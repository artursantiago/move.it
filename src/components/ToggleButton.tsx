import { useContext, useEffect, useState } from "react";

import DarkModeToggle from 'react-dark-mode-toggle';
import { ThemeContext } from "../context/ThemeContext";

import styles from '../styles/components/ToggleButton.module.css';

export function ToggleButton() {
  const { handleDarkModeChange, isDarkMode } = useContext(ThemeContext);

  return (
    <div className={styles.darkModeToggleContainer}>
      <DarkModeToggle
        onChange={handleDarkModeChange}
        checked={isDarkMode}
        size={60}
      />
    </div>
  )
}