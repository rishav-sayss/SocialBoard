import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans transition-colors flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t border-gray-200 dark:border-slate-800 text-center text-xs text-gray-500 dark:text-slate-500">
        &copy; {new Date().getFullYear()} SocialBoard. Built with React & TypeScript.
      </footer>
    </div>
  )
}
