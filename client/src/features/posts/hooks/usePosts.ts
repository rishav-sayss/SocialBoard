import { useContext } from 'react'
import { PostContext, PostContextType } from '../state/postStore'

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}
