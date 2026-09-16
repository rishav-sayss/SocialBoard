import { useState, useEffect, useCallback } from 'react'
import { getPostLikesApi, likePostApi, unlikePostApi } from '../services/likeService'
import { useAuth } from '../../auth/hooks/useAuth'

export const useLikes = (postId: string) => {
  const { isAuthenticated } = useAuth()
  const [totalLikes, setTotalLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLikes = useCallback(async () => {
    if (!postId) return
    try {
      setLoading(true)
      setError(null)
      const data = await getPostLikesApi(postId)
      if (data.success) {
        setTotalLikes(data.totalLikes)
        setIsLiked(data.isLiked)
      }
    } catch {
      setError('Failed to load likes.')
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchLikes()
  }, [fetchLikes, isAuthenticated])

  const toggleLike = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to like posts.')
      return
    }

    // Optimistic update
    const previousIsLiked = isLiked
    const previousLikes = totalLikes
    setIsLiked(!isLiked)
    setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1)

    try {
      if (previousIsLiked) {
        const res = await unlikePostApi(postId)
        if (res.success) {
          setTotalLikes(res.totalLikes)
          setIsLiked(res.isLiked)
        }
      } else {
        const res = await likePostApi(postId)
        if (res.success) {
          setTotalLikes(res.totalLikes)
          setIsLiked(res.isLiked)
        }
      }
    } catch (err: any) {
      // Rollback on failure
      setIsLiked(previousIsLiked)
      setTotalLikes(previousLikes)
      setError(err.response?.data?.message || 'Action failed.')
    }
  }

  return {
    totalLikes,
    isLiked,
    loading,
    error,
    toggleLike,
    refetchLikes: fetchLikes,
  }
}
