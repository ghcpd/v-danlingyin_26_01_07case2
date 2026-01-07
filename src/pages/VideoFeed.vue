<template>
  <div class="video-feed-page h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
    <VideoItem
      v-for="(videoData, index) in videoFeedData"
      :key="videoData.video.id"
      :video="videoData.video"
      :creator="videoData.creator"
      :is-visible="index === currentVideoIndex"
      @comment="openCommentPanel"
    />

    <CommentPanel
      :is-visible="showCommentPanel"
      :comments="currentComments"
      :comment-count="currentCommentCount"
      @close="closeCommentPanel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import VideoItem from '@/components/VideoItem.vue'
import CommentPanel from '@/components/CommentPanel.vue'
import { useAppStore } from '@/store'
import { mockUsers } from '@/data/users'
import { getCommentsByVideoId } from '@/data/comments'
import type { Video, User } from '@/types'

interface VideoFeedData {
  video: Video
  creator: User
}

const store = useAppStore()
const currentVideoIndex = ref(0)
const showCommentPanel = ref(false)
const selectedVideoId = ref<string | null>(null)

const videoFeedData = computed<VideoFeedData[]>(() => {
  return store.videos.map(video => {
    const creator = mockUsers.find(u => u.id === video.userId)
    return {
      video,
      creator: creator || mockUsers[0]
    }
  })
})

const currentComments = computed(() => {
  return selectedVideoId.value ? getCommentsByVideoId(selectedVideoId.value) : []
})

const currentCommentCount = computed(() => {
  if (!selectedVideoId.value) return 0
  const video = store.getVideoById(selectedVideoId.value)
  return video?.commentCount || 0
})

const openCommentPanel = (videoId: string): void => {
  selectedVideoId.value = videoId
  showCommentPanel.value = true
}

const closeCommentPanel = (): void => {
  showCommentPanel.value = false
  selectedVideoId.value = null
}

const handleScroll = (event: Event): void => {
  const container = event.target as HTMLElement
  const scrollPosition = container.scrollTop
  const videoHeight = container.clientHeight
  const newIndex = Math.round(scrollPosition / videoHeight)
  
  if (newIndex !== currentVideoIndex.value && newIndex >= 0 && newIndex < videoFeedData.value.length) {
    currentVideoIndex.value = newIndex
  }
}

let scrollContainer: HTMLElement | null = null

onMounted(() => {
  scrollContainer = document.querySelector('.video-feed-page')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.video-feed-page {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.video-feed-page::-webkit-scrollbar {
  display: none;
}
</style>
