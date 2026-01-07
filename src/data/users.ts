import type { User } from '@/types'

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'alice_creative',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Creative content creator 🎨✨ | Sharing daily inspiration',
    followerCount: 125400,
    followingCount: 342
  },
  {
    id: 'user2',
    username: 'bob_traveler',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Travel enthusiast 🌍 | Exploring the world one video at a time',
    followerCount: 89200,
    followingCount: 567
  },
  {
    id: 'user3',
    username: 'charlie_chef',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Food lover 🍳 | Quick recipes and cooking tips',
    followerCount: 234500,
    followingCount: 123
  },
  {
    id: 'user4',
    username: 'diana_fitness',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Fitness coach 💪 | Daily workout motivation',
    followerCount: 456700,
    followingCount: 89
  },
  {
    id: 'user5',
    username: 'evan_gamer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Gaming content 🎮 | Tips, tricks & gameplay',
    followerCount: 678900,
    followingCount: 234
  }
]

export const getCurrentUser = (): User => mockUsers[0]
