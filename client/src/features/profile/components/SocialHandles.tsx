import React from 'react'
import { SocialHandles as SocialHandlesType } from '../../../shared/types/user.types'

interface SocialHandlesProps {
  handles?: SocialHandlesType
}

export const SocialHandles: React.FC<SocialHandlesProps> = ({ handles }) => {
  if (!handles || (!handles.twitter && !handles.instagram && !handles.github && !handles.linkedin)) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md text-center">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Social Profiles</h3>
        <p className="text-xs text-gray-400 dark:text-slate-500">No social links added yet.</p>
      </div>
    )
  }

  const items = [
    { name: 'Twitter', value: handles.twitter, icon: '🐦', prefix: 'https://twitter.com/' },
    { name: 'Instagram', value: handles.instagram, icon: '📸', prefix: 'https://instagram.com/' },
    { name: 'GitHub', value: handles.github, icon: '💻', prefix: 'https://github.com/' },
    { name: 'LinkedIn', value: handles.linkedin, icon: '💼', prefix: 'https://linkedin.com/in/' },
  ].filter((item) => Boolean(item.value))

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Social Profiles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.value?.startsWith('http') ? item.value : `${item.prefix}${item.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-900 border border-gray-100 dark:border-slate-700/60 transition-all text-xs font-semibold text-gray-700 dark:text-slate-300"
          >
            <span>{item.icon}</span>
            <span className="truncate">{item.name}: @{item.value}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
