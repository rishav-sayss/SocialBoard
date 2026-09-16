import api from '../../../lib/axios'
import { LikeStatusResponse } from '../types/socialTypes'

export const likePostApi = async (postId: string): Promise<LikeStatusResponse> => {
  const response = await api.post<LikeStatusResponse>(`/posts/${postId}/like`)
  return response.data
}

export const unlikePostApi = async (postId: string): Promise<LikeStatusResponse> => {
  const response = await api.delete<LikeStatusResponse>(`/posts/${postId}/like`)
  return response.data
}

export const getPostLikesApi = async (postId: string): Promise<LikeStatusResponse> => {
  const response = await api.get<LikeStatusResponse>(`/posts/${postId}/likes`)
  return response.data
}
