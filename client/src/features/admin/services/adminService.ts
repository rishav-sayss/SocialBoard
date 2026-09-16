import api from '../../../lib/axios'
import {
  AdminStatsResponse,
  AdminUsersResponse,
  AdminUserDetailsResponse,
  AdminUpdateRoleResponse,
} from '../../../shared/types/admin.types'
import { UserRole } from '../../../shared/types/user.types'

export const fetchAdminStats = async (): Promise<AdminStatsResponse> => {
  const response = await api.get<AdminStatsResponse>('/admin/stats')
  return response.data
}

export const fetchAdminUsers = async (): Promise<AdminUsersResponse> => {
  const response = await api.get<AdminUsersResponse>('/admin/users')
  return response.data
}

export const fetchAdminUserDetails = async (id: string): Promise<AdminUserDetailsResponse> => {
  const response = await api.get<AdminUserDetailsResponse>(`/admin/users/${id}`)
  return response.data
}

export const updateUserRoleApi = async (
  id: string,
  role: UserRole
): Promise<AdminUpdateRoleResponse> => {
  const response = await api.put<AdminUpdateRoleResponse>(`/admin/users/${id}/role`, { role })
  return response.data
}

export const deleteUserApi = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/admin/users/${id}`)
  return response.data
}
