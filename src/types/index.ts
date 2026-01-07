export interface User {
  id: string
  username: string
  avatar: string
  bio: string
  followerCount: number
  followingCount: number
}

export interface Video {
  id: string
  userId: string
  videoUrl: string
  thumbnailUrl: string
  description: string
  likeCount: number
  commentCount: number
  createdAt: string
}

export interface Comment {
  id: string
  videoId: string
  userId: string
  username: string
  avatar: string
  text: string
  createdAt: string
}
