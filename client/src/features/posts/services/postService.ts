import api from '../../../lib/axios'
import { PostsResponse, SinglePostResponse } from '../../../shared/types/post.types'

export const fetchPosts = async (): Promise<PostsResponse> => {
  const response = await api.get<PostsResponse>('/images')
  return response.data
}

export const fetchPostById = async (id: string): Promise<SinglePostResponse> => {
  const response = await api.get<SinglePostResponse>(`/images/${id}`)
  return response.data
}

export const uploadPost = async (formData: FormData): Promise<SinglePostResponse> => {
  const response = await api.post<SinglePostResponse>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const updatePost = async (id: string, formData: FormData): Promise<SinglePostResponse> => {
  const response = await api.put<SinglePostResponse>(`/images/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deletePost = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/images/${id}`)
  return response.data
}
