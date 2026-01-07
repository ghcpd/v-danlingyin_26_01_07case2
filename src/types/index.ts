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
  description: string
  likeCount: number
  commentCount: number
  createdAt: string
}

export interface Comment {
  id: string
  userId: string
  videoId: string
  text: string
  createdAt: string
}
