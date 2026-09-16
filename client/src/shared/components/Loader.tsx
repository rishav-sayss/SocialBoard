import React from 'react'

interface LoaderProps {
  fullScreen?: boolean
  text?: string
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false, text }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-10 h-10 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-3" />
      {text && <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}
