import React from 'react'
import { User } from '../../../shared/types/user.types'

interface ProfileHeaderProps {
  user: User
  onEditClick?: () => void
  isOwnProfile?: boolean
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditClick,
  isOwnProfile = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-brand-500/20"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-brand-500 text-white tracking-wider border-2 border-white dark:border-slate-800">
          {user.role}
        </span>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">{user.email}</p>
          </div>

          {isOwnProfile && onEditClick && (
            <button
              onClick={onEditClick}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold text-xs transition-all self-center md:self-auto"
            >
              Edit Profile
            </button>
          )}
        </div>

        {user.bio && (
          <p className="text-sm text-gray-700 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>
    </div>
  )
}
