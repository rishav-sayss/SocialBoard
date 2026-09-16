import api from '../../../lib/axios'
import { User, UpdateProfilePayload } from '../../../shared/types/user.types'
import { Post } from '../../../shared/types/post.types'

export interface UserProfileResponse {
  success: boolean
  user: User
  images?: Post[]
  message?: string
}

export const getMyProfile = async (): Promise<UserProfileResponse> => {
  const response = await api.get<UserProfileResponse>('/users/profile')
  return response.data
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfileResponse> => {
  const response = await api.put<UserProfileResponse>('/users/profile', payload)
  return response.data
}
