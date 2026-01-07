import type { Comment } from '@/types'

export const mockComments: Record<string, Comment[]> = {
  video1: [
    {
      id: 'comment1',
      videoId: 'video1',
      userId: 'user2',
      username: 'bob_traveler',
      avatar: 'https://i.pravatar.cc/150?img=2',
      text: 'Absolutely stunning! 😍',
      createdAt: '2024-01-05T10:35:00Z'
    },
    {
      id: 'comment2',
      videoId: 'video1',
      userId: 'user3',
      username: 'charlie_chef',
      avatar: 'https://i.pravatar.cc/150?img=3',
      text: 'This is beautiful, where was this taken?',
      createdAt: '2024-01-05T10:40:00Z'
    }
  ],
  video2: [
    {
      id: 'comment3',
      videoId: 'video2',
      userId: 'user1',
      username: 'alice_creative',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'Added to my bucket list! 🙌',
      createdAt: '2024-01-05T09:20:00Z'
    }
  ],
  video3: [
    {
      id: 'comment4',
      videoId: 'video3',
      userId: 'user4',
      username: 'diana_fitness',
      avatar: 'https://i.pravatar.cc/150?img=4',
      text: 'Looks delicious! Going to try this tonight',
      createdAt: '2024-01-05T08:15:00Z'
    }
  ]
}

export const getCommentsByVideoId = (videoId: string): Comment[] => {
  return mockComments[videoId] || []
}
