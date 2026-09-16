import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../../shared/types/post.types'
import { LikeButton } from '../../social/components/LikeButton'

interface PostCardProps {
  post: Post
  onEdit?: (post: Post) => void
  onDelete?: (id: string) => void
  isOwnerOrAdmin?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  isOwnerOrAdmin = false,
}) => {
  const uploaderName =
    typeof post.uploadedBy === 'object' && post.uploadedBy !== null
      ? post.uploadedBy.name
      : 'Anonymous'

  return (
    <article className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <Link to={`/image/${post._id}`} className="block relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-slate-900">
        <img
          src={post.imageUrl}
          alt={post.caption || 'Social board post'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </Link>

      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          {post.caption && (
            <p className="text-gray-800 dark:text-slate-200 text-sm font-medium line-clamp-2">
              {post.caption}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">
              {uploaderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-slate-300">
              {uploaderName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LikeButton postId={post._id} size="sm" />

            <Link
              to={`/image/${post._id}`}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View
            </Link>

            {isOwnerOrAdmin && (
              <>
                {onEdit && (
                  <button
                    onClick={() => onEdit(post)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
                    type="button"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(post._id)}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                    type="button"
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
