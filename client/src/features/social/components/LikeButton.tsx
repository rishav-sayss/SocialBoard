import React from 'react'
import { useLikes } from '../hooks/useLikes'

interface LikeButtonProps {
  postId: string
  size?: 'sm' | 'md'
  showCount?: boolean
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  size = 'md',
  showCount = true,
}) => {
  const { totalLikes, isLiked, toggleLike } = useLikes(postId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLike()
  }

  const iconSizes = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const paddingClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs gap-1.5'
      : 'px-3.5 py-2 text-xs font-bold gap-2'

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center rounded-full font-semibold transition-all duration-200 ${paddingClasses} ${
        isLiked
          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 shadow-sm'
          : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-500 border border-transparent'
      }`}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <svg
        className={`${iconSizes} transition-transform active:scale-125 ${
          isLiked ? 'fill-rose-500 stroke-rose-500 scale-110' : 'fill-none stroke-current'
        }`}
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showCount && <span>{totalLikes}</span>}
    </button>
  )
}
