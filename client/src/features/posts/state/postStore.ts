import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Post, SinglePostResponse } from '../../../shared/types/post.types'
import { fetchPosts, fetchPostById, uploadPost, updatePost, deletePost } from '../services/postService'
import { useAuth } from '../../auth/hooks/useAuth'

export interface PostContextType {
  posts: Post[]
  loading: boolean
  error: string | null
  fetchPostsList: () => Promise<void>
  fetchSinglePost: (id: string) => Promise<Post | null>
  createPost: (formData: FormData) => Promise<void>
  editPost: (id: string, formData: FormData) => Promise<SinglePostResponse>
  removePost: (id: string) => Promise<void>
  clearError: () => void
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPostsList = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      setLoading(true)
      setError(null)
      const data = await fetchPosts()
      if (data.success && Array.isArray(data.Posts)) {
        setPosts(data.Posts)
      } else {
        setPosts([])
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to fetch posts from backend.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthLoading) return

    if (isAuthenticated) {
      fetchPostsList()
    } else {
      setPosts([])
      setLoading(false)
    }
  }, [isAuthenticated, isAuthLoading, fetchPostsList])

  const fetchSinglePost = async (id: string): Promise<Post | null> => {
    try {
      const data = await fetchPostById(id)
      if (data.success && data.post) {
        return data.post
      }
      return null
    } catch {
      return null
    }
  }

  const createPost = async (formData: FormData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await uploadPost(formData)
      if (data.success) {
        await fetchPostsList()
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to upload post.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }

  const editPost = async (id: string, formData: FormData): Promise<SinglePostResponse> => {
    try {
      setLoading(true)
      setError(null)
      const data = await updatePost(id, formData)
      if (data.success) {
        const updatedPost = data.post || data.image
        if (updatedPost) {
          setPosts((prev) =>
            prev.map((p) => (p._id === id ? { ...p, ...updatedPost } : p))
          )
        } else {
          await fetchPostsList()
        }
      }
      return data
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update post.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }

  const removePost = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await deletePost(id)
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p._id !== id))
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to delete post.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return React.createElement(
    PostContext.Provider,
    {
      value: {
        posts,
        loading,
        error,
        fetchPostsList,
        fetchSinglePost,
        createPost,
        editPost,
        removePost,
        clearError,
      },
    },
    children
  )
}
