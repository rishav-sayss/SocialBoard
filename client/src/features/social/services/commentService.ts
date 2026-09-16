import api from '../../../lib/axios'
import { CommentsResponse, SingleCommentResponse } from '../types/socialTypes'

export const getPostCommentsApi = async (postId: string): Promise<CommentsResponse> => {
  const response = await api.get<CommentsResponse>(`/posts/${postId}/comments`)
  return response.data
}

export const addCommentApi = async (
  postId: string,
  text: string
): Promise<SingleCommentResponse> => {
  const response = await api.post<SingleCommentResponse>(`/posts/${postId}/comments`, { text })
  return response.data
}

export const updateCommentApi = async (
  commentId: string,
  text: string
): Promise<SingleCommentResponse> => {
  const response = await api.put<SingleCommentResponse>(`/comments/${commentId}`, { text })
  return response.data
}

export const deleteCommentApi = async (
  commentId: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/comments/${commentId}`
  )
  return response.data
}
