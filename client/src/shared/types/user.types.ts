export type UserRole = 'user' | 'admin' | 'superadmin'

export interface SocialHandles {
  twitter?: string
  instagram?: string
  github?: string
  linkedin?: string
}

export interface User {
  id?: string
  _id?: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  bio?: string
  socialHandles?: SocialHandles
  createdAt?: string
}

export interface UpdateProfilePayload {
  name?: string
  bio?: string
  avatar?: string
  socialHandles?: SocialHandles
}

export interface LoginPayload {
  email: string
  password?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password?: string
  role?: UserRole
}

export interface AuthResponse {
  success: boolean
  user: User
  message?: string
  errors?: Array<{ msg: string; param: string }>
}
