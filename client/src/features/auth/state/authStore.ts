import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { User, LoginPayload, RegisterPayload, UpdateProfilePayload } from '../../../shared/types/user.types'
import { loginUser, registerUser, getMeUser, logoutUser } from '../services/authService'
import { getCookie, setCookie, removeCookie } from '../../../shared/utils/cookie'
import api from '../../../lib/axios'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  updateUserProfile: (payload: UpdateProfilePayload) => Promise<User>
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadUser = useCallback(async () => {
    const isLoggedIn = getCookie('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const data = await getMeUser()
      if (data.success && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
        removeCookie('isLoggedIn')
      }
    } catch {
      setUser(null)
      removeCookie('isLoggedIn')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await loginUser(payload)
      if (data.success && data.user) {
        setCookie('isLoggedIn', 'true')
        setUser(data.user)
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Login failed. Please check your credentials.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (payload: RegisterPayload) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await registerUser(payload)
      if (data.success && data.user) {
        setCookie('isLoggedIn', 'true')
        setUser(data.user)
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error('Logout API error:', err)
    } finally {
      removeCookie('isLoggedIn')
      setUser(null)
    }
  }

  const updateUserProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.put('/users/profile', payload)
      if (response.data?.success && response.data?.user) {
        setUser(response.data.user)
        return response.data.user
      } else {
        throw new Error(response.data?.message || 'Failed to update profile')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update profile.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        updateUserProfile,
        refreshUser: loadUser,
      },
    },
    children
  )
}
