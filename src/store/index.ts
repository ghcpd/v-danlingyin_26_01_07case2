import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, Video } from '@/types'
import { getCurrentUser } from '@/data/users'
import { mockVideos } from '@/data/videos'

export const useAppStore = defineStore('app', () => {
  const currentUser = ref<User>(getCurrentUser())
  const likedVideoIds = ref<Set<string>>(new Set())
  const videos = ref<Video[]>(mockVideos)

  const toggleLike = (videoId: string): void => {
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

  const isVideoLiked = (videoId: string): boolean => {
    return likedVideoIds.value.has(videoId)
  }

  const getVideoById = (videoId: string): Video | undefined => {
    return videos.value.find(v => v.id === videoId)
  }

  return {
    currentUser,
    likedVideoIds,
    videos,
    toggleLike,
    isVideoLiked,
    getVideoById
  }
})
