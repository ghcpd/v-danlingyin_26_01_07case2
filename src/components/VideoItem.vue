<template>
  <div
    class="relative w-full h-screen bg-black snap-start"
    :data-video-id="video.id"
  >
    <video
      ref="videoRef"
      :src="video.videoUrl"
      class="w-full h-full object-cover"
      loop
      playsinline
      :muted="isMuted"
      @click="togglePlay"
      @loadeddata="onVideoLoaded"
    />

    <!-- Overlay content -->
    <div class="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
      <div class="flex items-end justify-between">
        <!-- Left side: User info and description -->
        <div class="flex-1 mb-16 pointer-events-auto">
          <div class="flex items-center gap-3 mb-2">
            <UserAvatar
              :avatar="creator.avatar"
              :username="creator.username"
              size="medium"
            />
            <span class="text-white font-semibold">@{{ creator.username }}</span>
          </div>
          <p class="text-white text-sm leading-relaxed">{{ video.description }}</p>
        </div>

        <!-- Right side: Action buttons -->
        <div class="flex flex-col items-center gap-6 mb-16 ml-4 pointer-events-auto">
          <button
            @click="handleLike"
            class="flex flex-col items-center transition-transform hover:scale-110"
            :aria-label="isLiked ? 'Unlike video' : 'Like video'"
          >
            <div class="bg-gray-800 bg-opacity-50 p-3 rounded-full">
              <svg
                class="w-7 h-7 transition-colors"
                :class="isLiked ? 'text-pink-500 fill-current' : 'text-white'"
                fill="none"
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
            <span class="text-white text-xs font-semibold mt-1">{{ formatCount(video.likeCount) }}</span>
          </button>

          <button
            @click="handleComment"
            class="flex flex-col items-center transition-transform hover:scale-110"
            aria-label="View comments"
          >
            <div class="bg-gray-800 bg-opacity-50 p-3 rounded-full">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span class="text-white text-xs font-semibold mt-1">{{ formatCount(video.commentCount) }}</span>
          </button>

          <button
            @click="handleShare"
            class="flex flex-col items-center transition-transform hover:scale-110"
            aria-label="Share video"
          >
            <div class="bg-gray-800 bg-opacity-50 p-3 rounded-full">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <span class="text-white text-xs font-semibold mt-1">Share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Play/Pause indicator -->
    <div
      v-if="showPlayIndicator"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="bg-black bg-opacity-50 rounded-full p-6">
        <svg v-if="!isPlaying" class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        <svg v-else class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
        </svg>
      </div>
    </div>

    <!-- Comment Panel -->
    <Teleport to="body">
      <CommentPanel
        v-if="showComments"
        :video-id="video.id"
        :comment-count="video.commentCount"
        @close="showComments = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Video, User } from '@/types'
import { useAppStore } from '@/store'
import UserAvatar from './UserAvatar.vue'
import CommentPanel from './CommentPanel.vue'

interface Props {
  video: Video
  isActive: boolean
}

const props = defineProps<Props>()

const store = useAppStore()
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const showPlayIndicator = ref(false)
const showComments = ref(false)

const creator = computed<User>(() => {
  return store.getUserById(props.video.userId) || {
    id: '',
    username: 'unknown',
    avatar: '',
    bio: '',
    followerCount: 0,
    followingCount: 0
  }
})

const isLiked = computed(() => {
  return store.isVideoLiked(props.video.id)
})

watch(() => props.isActive, (active) => {
  if (active && videoRef.value) {
    videoRef.value.play()
    isPlaying.value = true
  } else if (videoRef.value) {
    videoRef.value.pause()
    isPlaying.value = false
  }
})

function togglePlay(): void {
  if (!videoRef.value) return

  if (isPlaying.value) {
    videoRef.value.pause()
    isPlaying.value = false
  } else {
    videoRef.value.play()
    isPlaying.value = true
  }

  showPlayIndicator.value = true
  setTimeout(() => {
    showPlayIndicator.value = false
  }, 500)
}

function handleLike(): void {
  store.toggleLike(props.video.id)
}

function handleComment(): void {
  showComments.value = true
}

function handleShare(): void {
  // Mock share action
  alert('Share functionality - This would open a share dialog in a real app')
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

function onVideoLoaded(): void {
  if (props.isActive && videoRef.value) {
    videoRef.value.play()
    isPlaying.value = true
  }
}
</script>
