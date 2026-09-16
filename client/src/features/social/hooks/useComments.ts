import { useState, useEffect, useCallback } from 'react'
import { Comment } from '../types/socialTypes'
import {
  getPostCommentsApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from '../services/commentService'

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const fetchComments = useCallback(async () => {
    if (!postId) return
    try {
      setLoading(true)
      setError(null)
      const data = await getPostCommentsApi(postId)
      if (data.success) {
        setComments(data.comments)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load comments.')
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const createComment = async (text: string) => {
    if (!text.trim()) return
    try {
      setIsSubmitting(true)
      setError(null)
      const res = await addCommentApi(postId, text)
      if (res.success && res.comment) {
        setComments((prev) => [res.comment!, ...prev])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post comment.')
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const editComment = async (commentId: string, newText: string) => {
    if (!newText.trim()) return
    try {
      setError(null)
      const res = await updateCommentApi(commentId, newText)
      if (res.success && res.comment) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? res.comment! : c))
        )
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update comment.')
      throw err
    }
  }

  const removeComment = async (commentId: string) => {
    try {
      setError(null)
      const res = await deleteCommentApi(commentId)
      if (res.success) {
        setComments((prev) => prev.filter((c) => c._id !== commentId))
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete comment.')
      throw err
    }
  }

  return {
    comments,
    commentCount: comments.length,
    loading,
    error,
    isSubmitting,
    createComment,
    editComment,
    removeComment,
    refetchComments: fetchComments,
  }
}
