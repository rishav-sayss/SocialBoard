import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AdminSidebar: React.FC = () => {
  const location = useLocation()

  const links = [
    { name: 'Dashboard Overview', path: '/admin', icon: '📊' },
    { name: 'User Management', path: '/admin/users', icon: '👥' },
  ]

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-6 shadow-xl shrink-0">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
        <span className="text-xl">🛡️</span>
        <h2 className="font-extrabold text-gray-900 dark:text-white text-base tracking-tight">Admin Console</h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
