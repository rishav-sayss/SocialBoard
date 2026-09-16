import React from 'react'
import { User } from '../../../shared/types/user.types'

interface ProfileInfoProps {
  user: User
  postsCount?: number
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, postsCount = 0 }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Account Details</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/60">
          <span className="block text-2xl font-extrabold text-brand-600 dark:text-brand-400">
            {postsCount}
          </span>
          <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Total Posts</span>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/60">
          <span className="block text-sm font-bold uppercase text-brand-600 dark:text-brand-400 mt-1">
            {user.role}
          </span>
          <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Role</span>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/60 col-span-2 sm:col-span-1">
          <span className="block text-xs font-bold text-gray-700 dark:text-slate-300 mt-1 truncate">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Member'}
          </span>
          <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Joined</span>
        </div>
      </div>
    </div>
  )
}
