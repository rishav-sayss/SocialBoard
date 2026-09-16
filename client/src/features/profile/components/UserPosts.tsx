import React from 'react'
import { Post } from '../../../shared/types/post.types'
import { PostCard } from '../../posts/components/PostCard'

interface UserPostsProps {
  posts: Post[]
  onEditPost?: (post: Post) => void
  onDeletePost?: (id: string) => void
}

export const UserPosts: React.FC<UserPostsProps> = ({ posts, onEditPost, onDeletePost }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-md text-center my-6">
        <span className="text-3xl block mb-2">📸</span>
        <h4 className="text-base font-bold text-gray-800 dark:text-slate-200">No posts created</h4>
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
          Upload an image to see your posts listed here.
        </p>
      </div>
    )
  }

  return (
    <div className="my-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Uploads ({posts.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onEdit={onEditPost}
            onDelete={onDeletePost}
            isOwnerOrAdmin={true}
          />
        ))}
      </div>
    </div>
  )
}
