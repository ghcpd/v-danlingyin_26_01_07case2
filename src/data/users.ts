import type { User } from '@/types'

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'travelexplorer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travelexplorer',
    bio: '🌍 Travel vlogger | Exploring the world one video at a time',
    followerCount: 152300,
    followingCount: 234
  },
  {
    id: 'user2',
    username: 'foodie_daily',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodie',
    bio: '🍕 Food lover | Sharing delicious recipes daily',
    followerCount: 89600,
    followingCount: 189
  },
  {
    id: 'user3',
    username: 'tech_guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    bio: '💻 Tech reviews & tutorials | Latest gadgets',
    followerCount: 234500,
    followingCount: 412
  },
  {
    id: 'user4',
    username: 'fitness_journey',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fitness',
    bio: '💪 Fitness coach | Transform your life',
    followerCount: 178900,
    followingCount: 321
  },
  {
    id: 'user5',
    username: 'art_studio',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=art',
    bio: '🎨 Digital artist | Creating magic everyday',
    followerCount: 94200,
    followingCount: 156
  },
  {
    id: 'user6',
    username: 'music_beats',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music',
    bio: '🎵 Music producer | Beats & vibes',
    followerCount: 312400,
    followingCount: 567
  }
]

export const currentUser: User = {
  id: 'current_user',
  username: 'you_username',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
  bio: '✨ Just enjoying great content',
  followerCount: 1234,
  followingCount: 567
}
