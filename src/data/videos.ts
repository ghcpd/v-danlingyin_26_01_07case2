import type { Video } from '@/types'

export const mockVideos: Video[] = [
  {
    id: 'video1',
    userId: 'user1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=1',
    description: 'Beautiful sunset timelapse 🌅 #nature #sunset #peaceful',
    likeCount: 12300,
    commentCount: 456,
    createdAt: '2024-01-05T10:30:00Z'
  },
  {
    id: 'video2',
    userId: 'user2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=2',
    description: 'Amazing travel destination! 🏔️ Would you visit? #travel #adventure',
    likeCount: 8900,
    commentCount: 234,
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: 'video3',
    userId: 'user3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=3',
    description: 'Quick 5-minute recipe 🍝 Try it yourself! #cooking #foodie #recipe',
    likeCount: 23400,
    commentCount: 789,
    createdAt: '2024-01-05T08:00:00Z'
  },
  {
    id: 'video4',
    userId: 'user4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=4',
    description: '10-minute morning workout routine 💪 #fitness #workout #health',
    likeCount: 45600,
    commentCount: 1234,
    createdAt: '2024-01-04T18:30:00Z'
  },
  {
    id: 'video5',
    userId: 'user5',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=5',
    description: 'Epic gaming moment! 🎮 Did you see that? #gaming #epic #win',
    likeCount: 67800,
    commentCount: 2345,
    createdAt: '2024-01-04T16:45:00Z'
  },
  {
    id: 'video6',
    userId: 'user1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=6',
    description: 'Creative art process 🎨 What do you think? #art #creative #process',
    likeCount: 34500,
    commentCount: 567,
    createdAt: '2024-01-04T14:20:00Z'
  },
  {
    id: 'video7',
    userId: 'user2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=7',
    description: 'Hidden gem discovered! 🗺️ #travel #explore #hidden',
    likeCount: 19800,
    commentCount: 345,
    createdAt: '2024-01-04T12:10:00Z'
  },
  {
    id: 'video8',
    userId: 'user3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://picsum.photos/400/700?random=8',
    description: 'Dessert time! 🍰 Perfect for any occasion #dessert #baking #sweet',
    likeCount: 28900,
    commentCount: 456,
    createdAt: '2024-01-03T20:30:00Z'
  }
]

export const getVideosByUserId = (userId: string): Video[] => {
  return mockVideos.filter(video => video.userId === userId)
}
