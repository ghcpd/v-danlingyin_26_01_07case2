import type { Comment } from '@/types';

/**
 * Mock comments data
 */
export const comments: Comment[] = [
  {
    id: 'comment-1',
    videoId: 'video-1',
    userId: 'user-2',
    text: 'This is so cool! 🔥',
    likeCount: 1250,
    createdAt: '2026-01-05T11:00:00Z'
  },
  {
    id: 'comment-2',
    videoId: 'video-1',
    userId: 'user-3',
    text: 'Teach me this dance please!',
    likeCount: 890,
    createdAt: '2026-01-05T11:30:00Z'
  },
  {
    id: 'comment-3',
    videoId: 'video-1',
    userId: 'user-4',
    text: 'Going viral for sure 📈',
    likeCount: 456,
    createdAt: '2026-01-05T12:00:00Z'
  },
  {
    id: 'comment-4',
    videoId: 'video-2',
    userId: 'user-1',
    text: 'LOL this is literally me 😂😂',
    likeCount: 2100,
    createdAt: '2026-01-04T16:00:00Z'
  },
  {
    id: 'comment-5',
    videoId: 'video-2',
    userId: 'user-3',
    text: 'My parents caught me last night doing this haha',
    likeCount: 1800,
    createdAt: '2026-01-04T16:30:00Z'
  },
  {
    id: 'comment-6',
    videoId: 'video-3',
    userId: 'user-1',
    text: 'Making this tonight! 🍝',
    likeCount: 3400,
    createdAt: '2026-01-03T21:00:00Z'
  },
  {
    id: 'comment-7',
    videoId: 'video-3',
    userId: 'user-2',
    text: 'Where do you buy these ingredients?',
    likeCount: 567,
    createdAt: '2026-01-03T21:30:00Z'
  },
  {
    id: 'comment-8',
    videoId: 'video-3',
    userId: 'user-4',
    text: 'This changed my life fr',
    likeCount: 2300,
    createdAt: '2026-01-03T22:00:00Z'
  },
  {
    id: 'comment-9',
    videoId: 'video-4',
    userId: 'user-2',
    text: 'Day 1 of learning this',
    likeCount: 890,
    createdAt: '2026-01-02T13:00:00Z'
  },
  {
    id: 'comment-10',
    videoId: 'video-5',
    userId: 'user-4',
    text: 'Took me a moment but I get it now 💀',
    likeCount: 1500,
    createdAt: '2026-01-01T09:00:00Z'
  }
];

/**
 * Get comments by video ID
 */
export function getCommentsByVideoId(videoId: string): Comment[] {
  return comments.filter(comment => comment.videoId === videoId);
}
