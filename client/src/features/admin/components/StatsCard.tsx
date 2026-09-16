import React from 'react'

interface StatsCardProps {
  title: string
  value: number
  icon: string
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-lg flex items-center gap-5">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-2xl font-bold">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-400 tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5">
          {value}
        </p>
      </div>
    </div>
  )
}
