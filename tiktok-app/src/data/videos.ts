import type { Video } from '@/types';

/**
 * Mock video URLs (using public sample videos)
 */
const sampleVideoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
];

/**
 * Mock videos data
 */
export const videos: Video[] = [
  {
    id: 'video-1',
    userId: 'user-1',
    videoUrl: sampleVideoUrls[0],
    thumbnailUrl: 'https://picsum.photos/seed/v1/400/700',
    description: 'Check out this amazing dance routine! 💃🔥 #dance #viral #trending',
    likeCount: 125000,
    commentCount: 3420,
    shareCount: 8900,
    createdAt: '2026-01-05T10:30:00Z'
  },
  {
    id: 'video-2',
    userId: 'user-2',
    videoUrl: sampleVideoUrls[1],
    thumbnailUrl: 'https://picsum.photos/seed/v2/400/700',
    description: 'When your mom catches you sneaking snacks at 3am 😂 #comedy #relatable',
    likeCount: 89000,
    commentCount: 2100,
    shareCount: 5600,
    createdAt: '2026-01-04T15:45:00Z'
  },
  {
    id: 'video-3',
    userId: 'user-3',
    videoUrl: sampleVideoUrls[2],
    thumbnailUrl: 'https://picsum.photos/seed/v3/400/700',
    description: '60 second pasta recipe that will blow your mind 🍝 #food #recipe #cooking',
    likeCount: 234000,
    commentCount: 8900,
    shareCount: 15000,
    createdAt: '2026-01-03T20:00:00Z'
  },
  {
    id: 'video-4',
    userId: 'user-1',
    videoUrl: sampleVideoUrls[3],
    thumbnailUrl: 'https://picsum.photos/seed/v4/400/700',
    description: 'New choreography drop! Learn this with me 🎵 #dance #tutorial',
    likeCount: 178000,
    commentCount: 4500,
    shareCount: 12000,
    createdAt: '2026-01-02T12:00:00Z'
  },
  {
    id: 'video-5',
    userId: 'user-2',
    videoUrl: sampleVideoUrls[4],
    thumbnailUrl: 'https://picsum.photos/seed/v5/400/700',
    description: 'POV: You finally understand the joke 3 hours later 🤯 #funny #pov',
    likeCount: 67000,
    commentCount: 1800,
    shareCount: 4200,
    createdAt: '2026-01-01T08:30:00Z'
  },
  {
    id: 'video-6',
    userId: 'user-3',
    videoUrl: sampleVideoUrls[5],
    thumbnailUrl: 'https://picsum.photos/seed/v6/400/700',
    description: 'The secret ingredient is... 🤫 #foodtok #chef #secret',
    likeCount: 145000,
    commentCount: 5600,
    shareCount: 9800,
    createdAt: '2025-12-31T18:15:00Z'
  },
  {
    id: 'video-7',
    userId: 'user-1',
    videoUrl: sampleVideoUrls[0],
    thumbnailUrl: 'https://picsum.photos/seed/v7/400/700',
    description: 'Throwback to my first viral video! 🌟 #memories #dance',
    likeCount: 456000,
    commentCount: 12000,
    shareCount: 25000,
    createdAt: '2025-12-30T14:00:00Z'
  },
  {
    id: 'video-8',
    userId: 'user-2',
    videoUrl: sampleVideoUrls[1],
    thumbnailUrl: 'https://picsum.photos/seed/v8/400/700',
    description: 'Reply to @user: Here is part 2! 😆 #comedy #part2',
    likeCount: 98000,
    commentCount: 3200,
    shareCount: 7100,
    createdAt: '2025-12-29T09:45:00Z'
  },
  {
    id: 'video-9',
    userId: 'user-3',
    videoUrl: sampleVideoUrls[2],
    thumbnailUrl: 'https://picsum.photos/seed/v9/400/700',
    description: 'Quick breakfast idea for busy mornings 🥐☕ #breakfast #quickmeals',
    likeCount: 112000,
    commentCount: 4100,
    shareCount: 8500,
    createdAt: '2025-12-28T07:00:00Z'
  },
  {
    id: 'video-10',
    userId: 'user-4',
    videoUrl: sampleVideoUrls[3],
    thumbnailUrl: 'https://picsum.photos/seed/v10/400/700',
    description: 'Hidden gem in Bali you NEED to visit 🌴 #travel #bali #paradise',
    likeCount: 289000,
    commentCount: 7800,
    shareCount: 18000,
    createdAt: '2025-12-27T16:30:00Z'
  },
  {
    id: 'video-11',
    userId: 'user-4',
    videoUrl: sampleVideoUrls[4],
    thumbnailUrl: 'https://picsum.photos/seed/v11/400/700',
    description: 'Packing tips for long trips ✈️🧳 #traveltips #packing',
    likeCount: 167000,
    commentCount: 5200,
    shareCount: 11000,
    createdAt: '2025-12-26T11:00:00Z'
  },
  {
    id: 'video-12',
    userId: 'user-4',
    videoUrl: sampleVideoUrls[5],
    thumbnailUrl: 'https://picsum.photos/seed/v12/400/700',
    description: 'Sunset in Santorini hits different 🌅 #greece #santorini #sunset',
    likeCount: 345000,
    commentCount: 9500,
    shareCount: 22000,
    createdAt: '2025-12-25T19:00:00Z'
  }
];

/**
 * Get video by ID
 */
export function getVideoById(videoId: string): Video | undefined {
  return videos.find(video => video.id === videoId);
}

/**
 * Get videos by user ID
 */
export function getVideosByUserId(userId: string): Video[] {
  return videos.filter(video => video.userId === userId);
}
