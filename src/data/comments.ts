import type { Comment } from '@/types'

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    userId: 'user2',
    videoId: 'video1',
    text: 'This is absolutely stunning! 😍',
    createdAt: '2026-01-05T11:00:00Z'
  },
  {
    id: 'comment2',
    userId: 'user3',
    videoId: 'video1',
    text: 'Adding this to my travel bucket list!',
    createdAt: '2026-01-05T11:15:00Z'
  },
  {
    id: 'comment3',
    userId: 'user1',
    videoId: 'video2',
    text: 'Trying this tonight!',
    createdAt: '2026-01-05T14:45:00Z'
  },
  {
    id: 'comment4',
    userId: 'user4',
    videoId: 'video2',
    text: 'Looks delicious! 🍝',
    createdAt: '2026-01-05T15:00:00Z'
  },
  {
    id: 'comment5',
    userId: 'user5',
    videoId: 'video3',
    text: 'Great review! Very helpful',
    createdAt: '2026-01-05T17:00:00Z'
  }
]
