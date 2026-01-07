<template>
  <div class="video-item relative w-full h-screen snap-start">
    <VideoPlayer 
      :video-url="video.videoUrl"
      :is-visible="isVisible"
    />

    <div class="absolute bottom-20 left-0 right-0 p-4 text-white">
      <div class="flex items-center mb-2">
        <img 
          :src="creator.avatar" 
          :alt="creator.username"
          class="w-10 h-10 rounded-full mr-3 cursor-pointer"
          @click="goToProfile"
        />
        <span 
          class="font-semibold cursor-pointer hover:underline"
          @click="goToProfile"
        >
          @{{ creator.username }}
        </span>
      </div>
      <p class="text-sm mb-2">{{ video.description }}</p>
    </div>

    <div class="absolute right-4 bottom-32 flex flex-col items-center gap-6">
      <button
        class="flex flex-col items-center gap-1"
        @click="handleLike"
        aria-label="Like video"
      >
        <div 
          class="w-12 h-12 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center"
          :class="{ 'text-red-500': isLiked }"
        >
          <svg 
            class="w-7 h-7" 
            :fill="isLiked ? 'currentColor' : 'none'"
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <span class="text-xs font-semibold">{{ formatCount(localLikeCount) }}</span>
      </button>

      <button
        class="flex flex-col items-center gap-1"
        @click="handleComment"
        aria-label="Comment on video"
      >
        <div class="w-12 h-12 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <span class="text-xs font-semibold">{{ formatCount(video.commentCount) }}</span>
      </button>

      <button
        class="flex flex-col items-center gap-1"
        @click="handleShare"
        aria-label="Share video"
      >
        <div class="w-12 h-12 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
        <span class="text-xs font-semibold">Share</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import VideoPlayer from './VideoPlayer.vue'
import { useAppStore } from '@/store'
import type { Video, User } from '@/types'

interface Props {
  video: Video
  creator: User
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  comment: [videoId: string]
}>()

const router = useRouter()
const store = useAppStore()

const localLikeCount = ref(props.video.likeCount)
const isLiked = computed(() => store.isVideoLiked(props.video.id))

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

const handleLike = (): void => {
  const wasLiked = isLiked.value
  store.toggleLike(props.video.id)
  localLikeCount.value = wasLiked ? localLikeCount.value - 1 : localLikeCount.value + 1
}

const handleComment = (): void => {
  emit('comment', props.video.id)
}

const handleShare = (): void => {
  alert('Share functionality - mock action')
}

const goToProfile = (): void => {
  router.push(`/profile/${props.creator.id}`)
}
</script>
