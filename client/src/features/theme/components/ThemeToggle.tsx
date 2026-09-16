import React from 'react'
import { useTheme } from '../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all text-sm flex items-center justify-center font-medium"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="flex items-center gap-1.5">
          <span>🌙</span>
          <span className="hidden sm:inline text-xs">Dark</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <span>☀️</span>
          <span className="hidden sm:inline text-xs">Light</span>
        </span>
      )}
    </button>
  )
}
