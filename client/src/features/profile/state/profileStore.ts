import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { User, UpdateProfilePayload } from '../../../shared/types/user.types'
import { Post } from '../../../shared/types/post.types'
import { getMyProfile, updateProfile } from '../services/profileService'
import { useProfile as useProfileHook } from '../hooks/useProfile'

export { useProfileHook as useProfile }

export interface ProfileContextType {
  profileUser: User | null
  userPosts: Post[]
  loading: boolean
  error: string | null
  loadProfile: () => Promise<void>
  saveProfile: (payload: UpdateProfilePayload) => Promise<User>
  clearError: () => void
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMyProfile()
      if (data.success) {
        setProfileUser(data.user)
        setUserPosts(data.images || [])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch user profile.')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    try {
      setLoading(true)
      setError(null)
      const data = await updateProfile(payload)
      if (data.success && data.user) {
        setProfileUser(data.user)
        return data.user
      } else {
        throw new Error(data.message || 'Failed to update profile.')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update profile.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return React.createElement(
    ProfileContext.Provider,
    {
      value: {
        profileUser,
        userPosts,
        loading,
        error,
        loadProfile,
        saveProfile,
        clearError,
      },
    },
    children
  )
}
