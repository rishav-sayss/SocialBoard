import React from 'react'
import { Post } from '../../../shared/types/post.types'
import { PostCard } from './PostCard'
import { Loader } from '../../../shared/components/Loader'

interface PostListProps {
  posts: Post[]
  loading?: boolean
  error?: string | null
  currentUserId?: string
  currentUserRole?: string
  onEditPost?: (post: Post) => void
  onDeletePost?: (id: string) => void
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  loading = false,
  error = null,
  currentUserId,
  currentUserRole,
  onEditPost,
  onDeletePost,
}) => {
  if (loading && posts.length === 0) {
    return <Loader fullScreen text="Loading posts..." />
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-center my-8">
        <p className="font-semibold text-base mb-1">Failed to load posts</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-gray-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700 my-8">
        <div className="text-4xl mb-3">📷</div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200">No posts yet</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Be the first to upload and share a photo!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {posts.map((post) => {
        const uploaderId =
          typeof post.uploadedBy === 'object' && post.uploadedBy !== null
            ? post.uploadedBy._id
            : post.uploadedBy

        const isOwnerOrAdmin =
          currentUserId === uploaderId ||
          currentUserRole === 'admin' ||
          currentUserRole === 'superadmin'

        return (
          <PostCard
            key={post._id}
            post={post}
            onEdit={onEditPost}
            onDelete={onDeletePost}
            isOwnerOrAdmin={isOwnerOrAdmin}
          />
        )
      })}
    </div>
  )
}
