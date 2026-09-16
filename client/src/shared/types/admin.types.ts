import { User } from './user.types'
import { Post } from './post.types'

export interface AdminStats {
  totalUsers: number
  totalImages: number
  totalAdmins: number
}

export interface AdminStatsResponse {
  success: boolean
  stats: AdminStats
  message?: string
}

export interface AdminUsersResponse {
  success: boolean
  count: number
  users: User[]
  message?: string
}

export interface AdminUserDetailsResponse {
  success: boolean
  user: User
  images: Post[]
  message?: string
}

export interface AdminUpdateRoleResponse {
  success: boolean
  message: string
  user: User
}
