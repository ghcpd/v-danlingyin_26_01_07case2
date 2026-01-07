<template>
  <div class="min-h-screen bg-black pb-16">
    <div class="max-w-feed mx-auto">
      <!-- Profile Header -->
      <div class="flex flex-col items-center pt-8 pb-6 px-4">
        <UserAvatar
          :avatar="user.avatar"
          :username="user.username"
          size="large"
        />
        <h1 class="text-white text-xl font-bold mt-4">@{{ user.username }}</h1>
        <p class="text-gray-400 text-sm mt-2 text-center">{{ user.bio }}</p>

        <div class="flex gap-8 mt-6">
          <div class="text-center">
            <div class="text-white font-bold text-lg">{{ formatCount(user.followingCount) }}</div>
            <div class="text-gray-400 text-xs">Following</div>
          </div>
          <div class="text-center">
            <div class="text-white font-bold text-lg">{{ formatCount(user.followerCount) }}</div>
            <div class="text-gray-400 text-xs">Followers</div>
          </div>
          <div class="text-center">
            <div class="text-white font-bold text-lg">{{ formatCount(userVideos.length) }}</div>
            <div class="text-gray-400 text-xs">Videos</div>
          </div>
        </div>
      </div>

      <!-- Videos Grid -->
      <div class="px-1">
        <div class="border-t border-gray-800 pt-1">
          <div class="grid grid-cols-3 gap-1">
            <button
              v-for="video in userVideos"
              :key="video.id"
              @click="openVideo(video.id)"
              class="relative aspect-[9/16] bg-gray-900 overflow-hidden group"
              :aria-label="`Watch video: ${video.description}`"
            >
              <video
                :src="video.videoUrl"
                class="w-full h-full object-cover"
                preload="metadata"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <div class="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ formatCount(video.likeCount) }}</span>
              </div>
            </button>
          </div>

          <div v-if="userVideos.length === 0" class="text-center py-16 text-gray-400">
            No videos yet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import UserAvatar from '@/components/UserAvatar.vue'

const store = useAppStore()
const router = useRouter()

const user = computed(() => store.currentUserData)
const userVideos = computed(() => store.getVideosByUserId(user.value.id))

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

function openVideo(videoId: string): void {
  // Find the index of the video in the main feed
  const videoIndex = store.videos.findIndex(v => v.id === videoId)
  if (videoIndex !== -1) {
    store.setCurrentVideoIndex(videoIndex)
    router.push('/')
  }
}
</script>
