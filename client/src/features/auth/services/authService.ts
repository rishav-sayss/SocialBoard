import api from '../../../lib/axios'
import { LoginPayload, RegisterPayload, AuthResponse } from '../../../shared/types/user.types'

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', payload)
  return response.data
}

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', payload)
  return response.data
}

export const getMeUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>('/auth/me')
  return response.data
}

export const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>('/auth/logout')
  return response.data
}
