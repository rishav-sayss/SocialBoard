import React, { useState } from 'react'
import { Comment } from '../types/socialTypes'

interface CommentItemProps {
  comment: Comment
  currentUserId?: string
  currentUserRole?: string
  onEdit: (commentId: string, newText: string) => Promise<void>
  onDelete: (commentId: string) => Promise<void>
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUserId,
  currentUserRole,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const commentUserId =
    typeof comment.user === 'object' && comment.user !== null
      ? comment.user._id
      : comment.user

  const commentUserName =
    typeof comment.user === 'object' && comment.user !== null
      ? comment.user.name
      : 'Anonymous'

  const commentUserAvatar =
    typeof comment.user === 'object' && comment.user !== null
      ? comment.user.avatar
      : undefined

  const isOwner = currentUserId === commentUserId
  const isAdmin = currentUserRole === 'admin' || currentUserRole === 'superadmin'
  const canDelete = isOwner || isAdmin

  const handleSaveEdit = async () => {
    if (!editText.trim()) return
    try {
      setIsSaving(true)
      await onEdit(comment._id, editText.trim())
      setIsEditing(false)
    } catch {
      // Error handled upstream
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this comment?')) {
      try {
        setIsDeleting(true)
        await onDelete(comment._id)
      } catch {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-gray-50/70 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800/60 transition-all">
      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
        {commentUserAvatar ? (
          <img
            src={commentUserAvatar}
            alt={commentUserName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          commentUserName.charAt(0).toUpperCase()
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
            {commentUserName}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-slate-500">
            {new Date(comment.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-2 mt-2">
            <textarea
              rows={2}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setEditText(comment.text)
                }}
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveEdit}
                className="px-3 py-1 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed break-words">
            {comment.text}
          </p>
        )}

        {!isEditing && (
          <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-gray-400 dark:text-slate-500">
            {isOwner && (
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-brand-600 dark:hover:text-brand-400"
                type="button"
              >
                Edit
              </button>
            )}
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="hover:text-red-600 dark:hover:text-red-400"
                type="button"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
