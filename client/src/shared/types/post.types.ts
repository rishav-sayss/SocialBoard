export interface PostUser {
  _id: string
  name: string
  email: string
}

export interface Post {
  _id: string
  imageUrl: string
  publicId?: string
  caption?: string
  uploadedBy: PostUser | string
  createdAt: string
  updatedAt?: string
}

export interface PostsResponse {
  success: boolean
  count: number
  Posts: Post[]
  message?: string
}

export interface SinglePostResponse {
  success: boolean
  message?: string
  post?: Post
  image?: Post
}
