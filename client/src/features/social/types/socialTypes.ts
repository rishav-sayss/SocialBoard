export interface LikeStatusResponse {
  success: boolean
  totalLikes: number
  isLiked: boolean
  message?: string
}

export interface CommentUser {
  _id: string
  name: string
  email: string
  avatar?: string
}

export interface Comment {
  _id: string
  post: string
  user: CommentUser | string
  text: string
  createdAt: string
  updatedAt?: string
}

export interface CommentsResponse {
  success: boolean
  count: number
  comments: Comment[]
  message?: string
}

export interface SingleCommentResponse {
  success: boolean
  message?: string
  comment?: Comment
}
