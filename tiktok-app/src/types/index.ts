/**
 * User type definition
 */
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  videoIds: string[];
}

/**
 * Video type definition
 */
export interface Video {
  id: string;
  userId: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
}

/**
 * Comment type definition (mock)
 */
export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  text: string;
  likeCount: number;
  createdAt: string;
}

/**
 * Like state for tracking user likes
 */
export interface LikeState {
  videoId: string;
  isLiked: boolean;
}

/**
 * Navigation item type
 */
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}
