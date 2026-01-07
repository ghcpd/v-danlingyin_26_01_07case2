import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Video } from '@/types'
import { mockUsers, currentUser } from '@/data/users'
import { mockVideos } from '@/data/videos'

export const useAppStore = defineStore('app', () => {
  // State
  const users = ref<User[]>(mockUsers)
  const videos = ref<Video[]>(mockVideos)
  const currentUserData = ref<User>(currentUser)
  const likedVideoIds = ref<Set<string>>(new Set())
  const currentVideoIndex = ref<number>(0)

  // Getters
  const getUserById = computed(() => {
    return (userId: string): User | undefined => {
      return users.value.find(user => user.id === userId)
    }
  })

  const getVideoById = computed(() => {
    return (videoId: string): Video | undefined => {
      return videos.value.find(video => video.id === videoId)
    }
  })

  const getVideosByUserId = computed(() => {
    return (userId: string): Video[] => {
      return videos.value.filter(video => video.userId === userId)
    }
  })

  const isVideoLiked = computed(() => {
    return (videoId: string): boolean => {
      return likedVideoIds.value.has(videoId)
    }
  })

  const currentVideo = computed(() => {
    return videos.value[currentVideoIndex.value] || null
  })

  // Actions
  function toggleLike(videoId: string): void {
    const video = videos.value.find(v => v.id === videoId)
    if (!video) return

    if (likedVideoIds.value.has(videoId)) {
      likedVideoIds.value.delete(videoId)
      video.likeCount--
    } else {
      likedVideoIds.value.add(videoId)
      video.likeCount++
    }
  }

  function setCurrentVideoIndex(index: number): void {
    if (index >= 0 && index < videos.value.length) {
      currentVideoIndex.value = index
    }
  }

  function nextVideo(): void {
    if (currentVideoIndex.value < videos.value.length - 1) {
      currentVideoIndex.value++
    }
  }

  function previousVideo(): void {
    if (currentVideoIndex.value > 0) {
      currentVideoIndex.value--
    }
  }

  return {
    // State
    users,
    videos,
    currentUserData,
    likedVideoIds,
    currentVideoIndex,
    // Getters
    getUserById,
    getVideoById,
    getVideosByUserId,
    isVideoLiked,
    currentVideo,
    // Actions
    toggleLike,
    setCurrentVideoIndex,
    nextVideo,
    previousVideo
  }
})
