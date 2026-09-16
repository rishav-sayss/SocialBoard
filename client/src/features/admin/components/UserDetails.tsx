import React from 'react'
import { User } from '../../../shared/types/user.types'
import { Post } from '../../../shared/types/post.types'
import { Loader } from '../../../shared/components/Loader'

interface UserDetailsProps {
  user: User | null
  posts: Post[]
  loading: boolean
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, posts, loading }) => {
  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-slate-700">
        <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">{user.email}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
            Role: {user.role}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">User's Uploads ({posts.length})</h4>
        {loading ? (
          <Loader text="Loading user posts..." />
        ) : posts.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-slate-500 py-4 text-center">No posts uploaded by this user.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
            {posts.map((post) => (
              <div key={post._id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-900 border">
                <img src={post.imageUrl} alt={post.caption || 'User post'} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
