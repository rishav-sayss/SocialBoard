import React, { useState, FormEvent } from 'react'
import { useComments } from '../hooks/useComments'
import { useAuth } from '../../auth/hooks/useAuth'
import { CommentItem } from './CommentItem'
import { Loader } from '../../../shared/components/Loader'

interface CommentSectionProps {
  postId: string
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user, isAuthenticated } = useAuth()
  const {
    comments,
    commentCount,
    loading,
    error,
    isSubmitting,
    createComment,
    editComment,
    removeComment,
  } = useComments(postId)

  const [text, setText] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      await createComment(text)
      setText('')
    } catch {
      // Handled in hook state
    }
  }

  return (
    <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700/60 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700/60 pb-4">
        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            Comments ({commentCount})
        </h3>
      </div>

      {/* Add comment form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                user?.name.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="flex-1">
              <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-xs text-gray-500 dark:text-slate-400 text-center py-3 bg-gray-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
          Sign in to leave a comment.
        </p>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <Loader text="Loading comments..." />
      ) : comments.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center py-6">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <CommentItem
              key={c._id}
              comment={c}
              currentUserId={user?._id || user?.id}
              currentUserRole={user?.role}
              onEdit={editComment}
              onDelete={removeComment}
            />
          ))}
        </div>
      )}
    </section>
  )
}
