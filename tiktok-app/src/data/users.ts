import type { User } from '@/types';

/**
 * Mock users data
 */
export const users: User[] = [
  {
    id: 'user-1',
    username: 'dancequeen',
    displayName: 'Dance Queen',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    bio: '💃 Professional dancer | Creating viral content daily | 10M+ views',
    followerCount: 1250000,
    followingCount: 342,
    videoIds: ['video-1', 'video-4', 'video-7']
  },
  {
    id: 'user-2',
    username: 'funnymax',
    displayName: 'Max Comedy',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    bio: '😂 Making you laugh since 2020 | Comedy Creator | Book me for events!',
    followerCount: 890000,
    followingCount: 156,
    videoIds: ['video-2', 'video-5', 'video-8']
  },
  {
    id: 'user-3',
    username: 'chef_mike',
    displayName: 'Chef Mike',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    bio: '👨‍🍳 Quick recipes | Food blogger | NYC based',
    followerCount: 567000,
    followingCount: 234,
    videoIds: ['video-3', 'video-6', 'video-9']
  },
  {
    id: 'user-4',
    username: 'travel_sarah',
    displayName: 'Sarah Travels',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    bio: '✈️ 50+ countries | Travel tips | Adventure seeker',
    followerCount: 2100000,
    followingCount: 89,
    videoIds: ['video-10', 'video-11', 'video-12']
  }
];

/**
 * Get user by ID
 */
export function getUserById(userId: string): User | undefined {
  return users.find(user => user.id === userId);
}

/**
 * Get user by username
 */
export function getUserByUsername(username: string): User | undefined {
  return users.find(user => user.username === username);
}
